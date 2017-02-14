/* ------------------------------------------------------------------------------
 *
 *  WebUntis API Testing Client
 *
 *  by Christopher Stelzmüller (tuesd4y)
 *  12.02.2017 (tuesd4y) :: created
 *
 * ---------------------------------------------------------------------------- */

const w = require("./webuntis");
const e = w.entities;

w.connect(require('./credentials.json')).then(() => {
    w.getTimetable(new e.TimeTableEntity(w.info.personId, w.info.personType))
        .then(d => console.log(d));

    w.logOut();
});


