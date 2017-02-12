/* ------------------------------------------------------------------------------
 *
 *  WebUntis API Testing Client
 *
 *  by Christopher Stelzmüller (tuesd4y)
 *  12.02.2017 (tuesd4y) :: created
 *
 * ---------------------------------------------------------------------------- */

const w = require("./webuntisWrapper");
const e = require("./entities.js");

w.connectPromise.then(() => {
    w.getTimetable(new e.TimeTableEntity(w.info.personId, w.info.personType), undefined, res => {
        console.log(res);
    });
});



