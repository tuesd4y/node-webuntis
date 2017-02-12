/* ------------------------------------------------------------------------------
 *
 *  WebUntis API Testing Client
 *
 *  by Christopher Stelzmüller (tuesd4y)
 *  12.02.2017 (tuesd4y) :: created
 *
 * ---------------------------------------------------------------------------- */

const webuntis = require('./webuntis');

// webuntis.setup("username", "password", "schoolName");
webuntis.setupWithObject(require('./credentials.json'));

webuntis.connect().then(() => {

    webuntis.rpc("getTeachers", {}, data => {
        console.log(data);
    });

    console.log("done");

});

