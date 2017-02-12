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
    rpc = require("./rpcWrapper");

const DATE_FORMAT = "YYYYMMDD";
const TIME_FORMAT = "hhmm";

// rpc.setup("username", "password", "schoolName");
rpc.setupWithObject(require('./credentials.json'));

let connectPromise = rpc.connect();

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

        connectPromise.then(rpc.rpc("getTimetable", {
            type: timeTableEntity.type,
            id: timeTableEntity.id,
            startDate: parseInt(startDate.format(DATE_FORMAT)),
            endDate: parseInt(endDate.format(DATE_FORMAT)),
        }, data => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.result);
            }
        }))
    });
};

exports.getClasses = function() {
    return new Promise((resolve,reject) => {
        connectPromise.then(rpc.rpc("getKlassen", {}, data => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.result);
            }
        }));
    });
};

exports.getRooms = function() {
    return new Promise((resolve, reject) => {
        connectPromise.then(rpc.rpc("getRooms", {}, data => {
            if(data.error)
                reject(data.error);
            else
                resolve(data.result)
        }))
    });
};

exports.getSubjects = function() {
    return new Promise((resolve, reject) => {
        connectPromise.then(rpc.rpc("getSubjects", {}, data => {
            if(data.error)
                reject(data.error);
            else
                resolve(data.result)
        }))
    });
};

exports.getStatusData = function() {
    return new Promise((resolve, reject) => {
        connectPromise.then(rpc.rpc("getStatusData", {}, data => {
            if(data.error)
                reject(data.error);
            else
                resolve(data.result)
        }))
    });
};

exports.getHolidays = function() {
    return new Promise((resolve, reject) => {
        connectPromise.then(rpc.rpc("getHolidays", {}, data => {
            if(data.error)
                reject(data.error);
            else
                resolve(data.result)
        }))
    });
};

exports.isLoggedIn = function () {
    return rpc.loggedIn;
};

exports.logOut = function () {
    return rpc.logOut;
};

exports.getKlassen = exports.getClasses;
exports.info = rpc.info;
exports.connectPromise = connectPromise;
