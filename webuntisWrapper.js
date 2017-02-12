/* ------------------------------------------------------------------------------
 *
 *
 *
 *  by Christopher Stelzmüller (tuesd4y)
 *  12.02.2017 (tuesd4y) :: created
 *  12.02.2017
 *
 * ---------------------------------------------------------------------------- */

const isDate = require("util").isDate,
    isUndefined = require("util").isUndefined,
    moment = require("moment"),
    webuntis = require("./webuntisRaw");

const DATE_FORMAT = "YYYYMMDD";
const TIME_FORMAT = "hhmm";

// webuntis.setup("username", "password", "schoolName");
webuntis.setupWithObject(require('./credentials.json'));

let connectPromise = webuntis.connect();

exports.getTimetable = function(timeTableEntity, dateInWeek) {
    return new Promise((resolve, reject) => {
        if (isUndefined(timeTableEntity)) {
            reject("please pass a timeTableEntity");
        }

        if (isUndefined(dateInWeek) || !isDate(dateInWeek)) {
            dateInWeek = moment();
        }

        let startDate = dateInWeek.subtract(dateInWeek.day(), 'days').add(1, 'days');

        let endDate = startDate.clone().add(5, 'days');

        connectPromise.then(webuntis.rpc("getTimetable", {
            type: timeTableEntity.type,
            id: timeTableEntity.id,
            startDate: parseInt(startDate.format(DATE_FORMAT)),
            endDate: parseInt(endDate.format(DATE_FORMAT)),
        }, data => {
            if (data.error) {
                reject(data.error);
            } else if (data.result) {
                resolve(data.result);
            }
        }))
    });
};

exports.getClasses = function() {

    return new Promise((resolve,reject) => {
        connectPromise.then(webuntis.rpc("getKlassen", {}, data => {
            if (data.error) {
                reject(data.error);
            } else if (data.result) {
                resolve(data.result);
            }
        }));
    });
};

exports.getKlassen = exports.getClasses;
exports.info = webuntis.info;
exports.connectPromise = connectPromise;
