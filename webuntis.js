/* ------------------------------------------------------------------------------
 *
 *
 *
 *  by Christopher Stelzmüller (tuesd4y)
 *  12.02.2017 (tuesd4y) :: created
 *  15.02.2017 (tuesd4y) :: edited syntax and export statements
 *
 * ---------------------------------------------------------------------------- */
"use strict";
const isDate = require("util").isDate,
    isUndefined = require("util").isUndefined,
    moment = require("moment"),
    isObject = require("util").isObject,
    isString = require("util").isString,
    isNumber = require("util").isNumber,
    rpc = require("./rpcWrapper");

const DATE_FORMAT = "YYYYMMDD";
const TIME_FORMAT = "hhmm";

let connectPromise = null;

function connect(creds, password, schoolname) {
    if(isObject(creds)) {
        return connectPromise = rpc.setupWithObject(creds)
    }

    else return connectPromise = rpc.setup(creds, password, schoolname)
}

function getTeachers() {
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
}

function getClasses() {
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
}

function getSubjects() {
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
}

function getRooms() {
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
}

function getDepartments() {
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
}

function getHolidays() {
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
}

function getTimegridUnits () {
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
}

function getStatusData() {
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
}

function getCurrentSchoolYear() {
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
}

function getSchoolYears() {
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
}

function getTimetable(timeTableEntity, dateInWeek) {
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
}

function getCustomTimetable(timeTableEntity, paramsObject,dateInWeek) {
    return new Promise((resolve, reject) => {
        if (isUndefined(timeTableEntity)) {
            throw Error("please pass a timeTableEntity");
        }

        if (isUndefined(dateInWeek) || !isDate(dateInWeek)) {
            dateInWeek = moment();
        }

        let startDate = dateInWeek.subtract(dateInWeek.day(), 'days').add(1, 'days');

        let endDate = startDate.clone().add(5, 'days');

        let optionsObject = {
          element: {
            id: timeTableEntity.id,
            type: timeTableEntity.type
          },
          startDate: parseInt(startDate.format(DATE_FORMAT)),
          endDate: parseInt(endDate.format(DATE_FORMAT)),
        };

        let validOptions = [
          "startDate",
          "endDate",
          "showBooking",
          "showInfo",
          "showSubstText",
          "showLsText",
          "showLsNumber",
          "showStudentgroup",
          "klasseFields",
          "roomFields",
          "subjectFields",
          "teacherFields",
        ];

        for (var property in paramsObject) {
            if (paramsObject.hasOwnProperty(property)) {

              if (validOptions.indexOf(property) > -1)){
                optionsObject[property] =
              }
              else {
                throw Error("Option: " + property + " is not a valid option for this method");
              }

            }
        }

        connectPromise.then(rpc.rpc("getTimetable", {
            options: optionsObject,

        }, data => {
            if (data.error) {
                throw Error(data.error);
            } else {
                resolve(data.result);
            }
        }))
    });
}

function getClassRegisterForPeriod(timeTableId) {
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
}

function getLastImportTime() {
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
}

function searchPerson(type, firstName, lastName, dateOfBirth) {
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
}

//TODO: methods still missing: requestSubsitutions, classRegEvents

function isLoggedIn() {
    return rpc.loggedIn;
}

function logout() {
    return rpc.logOut;
}

exports.getKlassen = exports.getClasses;
exports.info = rpc.info;
exports.connectPromise = connectPromise;

exports.entities = require("./entities");

module.exports = {
    connect: connect,
    logout: logout,
    connectPromise: connectPromise,
    isLoggedIn: isLoggedIn,
    info: rpc.info,

    getKlassen: getClasses,
    getClasses,
    getTeachers,
    getSubjects,
    getRooms,
    getDepartments,
    getHolidays,
    getStatusData,
    getTimegridUnits,
    getCurrentSchoolYear,
    getSchoolYears,
    getTimetable,
    getClassRegisterForPeriod,
    getLastImportTime,
    searchPerson,

    Entities: require("./entities")
};
