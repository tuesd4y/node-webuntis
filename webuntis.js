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
var isObject = require("util").isObject;
var isString = require("util").isString;
var isNumber = require("util").isNumber;

const DATE_FORMAT = "YYYYMMDD";
const TIME_FORMAT = "hhmm";

let connectPromise = null;

exports.connect = function(creds, password, schoolname) {
    if(isObject(creds)) {
        return connectPromise = rpc.setupWithObject(creds)
    }

    else return connectPromise = rpc.setup(creds, password, schoolname)
};

exports.getTeachers = function() {
    return new Promise((resolve,reject) => {
        connectPromise.then(rpc.rpc("getTeachers", {}, data => {
            if (data.error) {
                console.error(data.error);
                throw Error(data.error);
            } else {
                resolve(data.result);
            }
        }));
    });
};

exports.getClasses = function() {
    return new Promise((resolve,reject) => {
        connectPromise.then(rpc.rpc("getKlassen", {}, data => {
            if (data.error) {
                console.error(data.error);
                throw Error(data.error);
            } else {
                resolve(data.result);
            }
        }));
    });
};

exports.getSubjects = function() {
    return new Promise((resolve, reject) => {
        connectPromise.then(rpc.rpc("getSubjects", {}, data => {
            if(data.error) {
                console.error(data.error);
                throw Error(data.error);
            }
            else
                resolve(data.result)
        }))
    });
};

exports.getRooms = function() {
    return new Promise((resolve, reject) => {
        connectPromise.then(rpc.rpc("getRooms", {}, data => {
            if(data.error) {
                console.error(data.error);
                throw Error(data.error);
            }
            else
                resolve(data.result)
        }))
    });
};

exports.getDepartments = function() {
    return new Promise((resolve, reject) => {
        connectPromise.then(rpc.rpc("getDepartments", {}, data => {
            if(data.error) {
                console.error(data.error);
                throw Error(data.error);
            }
            else
                resolve(data.result)
        }))
    });
};

exports.getHolidays = function() {
    return new Promise((resolve, reject) => {
        connectPromise.then(rpc.rpc("getHolidays", {}, data => {
            if(data.error) {
                console.error(data.error);
                throw Error(data.error);
            }
            else
                resolve(data.result)
        }))
    });
};

exports.getTimegridUnits = function() {
    return new Promise((resolve, reject) => {
        connectPromise.then(rpc.rpc("getTimegridUnits", {}, data => {
            if(data.error) {
                console.error(data.error);
                throw Error(data.error);
            }
            else
                resolve(data.result)
        }))
    });
};

exports.getStatusData = function() {
    return new Promise((resolve, reject) => {
        connectPromise.then(rpc.rpc("getStatusData", {}, data => {
            if(data.error) {
                console.error(data.error);
                throw Error(data.error);
            }
            else
                resolve(data.result)
        }))
    });
};

exports.getCurrentSchoolYear = function() {
    return new Promise((resolve, reject) => {
        connectPromise.then(rpc.rpc("getCurrentSchoolyear", {}, data => {
            if(data.error) {
                console.error(data.error);
                throw Error(data.error);
            }
            else
                resolve(data.result)
        }))
    });
};

exports.getSchoolYears = function() {
    return new Promise((resolve, reject) => {
        connectPromise.then(rpc.rpc("getSchoolyears", {}, data => {
            if(data.error) {
                console.error(data.error);
                throw Error(data.error);
            }
            else
                resolve(data.result)
        }))
    });
};

exports.getTimetable = function(timeTableEntity, dateInWeek) {
    return new Promise((resolve, reject) => {
        if (isUndefined(timeTableEntity)) {
            throw Error("please pass a timeTableEntity");
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
                throw Error(data.error);
            } else {
                resolve(data.result);
            }
        }))
    });
};

exports.getClassRegisterForPeriod = function(timeTableId) {
    return new Promise((resolve, reject) => {
        if(!isNumber(timeTableId)){
            throw Error("timeTableId has to be a number")
        }
        connectPromise.then(rpc.rpc("getStudentsForPeriod", {
            ttid: timeTableId
        }, data => {
            if(data.error) {
                console.error(data.error);
                throw Error(data.error);
            }
            else
                resolve(data.result)
        }));
    });
};

exports.lastImportTime = function() {
    return new Promise((resolve, reject) => {
        connectPromise.then(rpc.rpc("getLastImportTime", {}, data => {
            if(data.error) {
                console.error(data.error);
                throw Error(data.error);
            }
            else
                resolve(data.result);
        }))
    });
};

exports.searchPerson = function(type, firstName, lastName, dateOfBirth) {
    return new Promise((resolve, reject) => {
        if(!isString(firstName) || !isString(lastName)) {
            throw Error("firstName and lastName must be strings");
        }

        if(type !== 2 && type !== 5) {
            throw Error("the type of the person has to be either 2 (teacher) or 5 (string)");
        }

        connectPromise.then(rpc.rpc("getPersonId", {
            type: type,
            dob: dateOfBirth,
            sn: lastName,
            fn: firstName,
        }, data => {
            if(data.error) {
	console.error(data.error);
	throw Error(data.error);
}
            else
                resolve(data.result)
        }))
    });
};

//TODO: methods still missing: requestSubsitutions, classRegEvents

exports.isLoggedIn = function () {
    return rpc.loggedIn;
};

exports.logOut = function () {
    return rpc.logOut;
};

exports.getKlassen = exports.getClasses;
exports.info = rpc.info;
exports.connectPromise = connectPromise;

exports.entities = require("./entities");
