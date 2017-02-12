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

const dateFormat = "YYYYMMDD";

// webuntis.setup("username", "password", "schoolName");
webuntis.setupWithObject(require('./credentials.json'));

let connectPromise = webuntis.connect();

function getTimeTable(timeTableEntity, dateInWeek, cb) {
    if(isUndefined(timeTableEntity)) {
        throw Error("please pass a timeTableEntity");
    }

    if(isUndefined(dateInWeek) || !isDate(dateInWeek)){
        dateInWeek = moment();
    }

    let startDate = dateInWeek.subtract(dateInWeek.day(), 'days').add(1, 'days');

    let endDate = startDate.clone().add(5, 'days');

    return connectPromise.then(webuntis.rpc("getTimetable", {
        type: timeTableEntity.type,
        id: timeTableEntity.id,
        startDate: parseInt(startDate.format(dateFormat)),
        endDate: parseInt(endDate.format(dateFormat)),
    }, data => {
        if(data.error) {
            throw Error(data.error);
        } else if(data.result) {
            cb(data.result);
        }
    }))
}

exports.getTimetable = getTimeTable;
exports.info = webuntis.info;
exports.connectPromise = connectPromise;
