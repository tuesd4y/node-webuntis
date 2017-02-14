/* ------------------------------------------------------------------------------
*
*   WebUntis API helper
*
*  by Christopher Stelzmüller (tuesd4y)
*  09.02.2017 (tuesd4y) :: created
*  12.02.2017 (tuesd4y) :: updated
*
* ---------------------------------------------------------------------------- */

const _ = require("lodash"),
    https = require("https"),
    extend = require("util")._extend;

let _loggedIn = false;

function httpRequest(params, postData) {
    return new Promise(function(resolve, reject) {
        let req = https.request(params, function(res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // res.setEncoding("utf8");
            // accumulate data
            let body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function(err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        // IMPORTANT
        req.end();
    });
}

let config = {
    url: null,
    userName: null,
    password: null,
};

let info = {};

function generateParams(method, params) {
    return {
        "id":"ID",
        "method":`${method}`,
        "jsonrpc":"2.0",
        params:params
    };
}
const baseUrl = "/WebUntis/jsonrpc.do";
const authMethod = "authenticate";

// let schoolname = $('#school').val(), username = $('#username').val(), password = $('#password').val();
function url(schoolname) {
    return `${baseUrl}?school=${_.replace(schoolname, / /g, "+")}`;
}


function setupWithObject(options) {
    if(options.schoolName) config.url = url(options.schoolName);
    if(options.username) config.userName = options.username;
    if(options.password) config.password = options.password;

    return connect();
}

function setup(username, password, schoolName) {
    config.userName = username;
    config.password = password;
    config.url = url(schoolName);

    return connect();
}


function rpc(method, params, cb) {
    return new Promise((resolve, reject) => {
        if(_loggedIn || method === authMethod) {

            let body = JSON.stringify(generateParams(method, params));

            let headers = {
                "Content-Type": "application/json",
                "Content-Length": `${body.length}`
            };

            let u = config.url;

            if (info.sessionId && info.sessionId !== null) {
                headers["Cookie"] = `JSESSIONID=${info.sessionId}`;
                u = baseUrl;
            }


            let options = {
                method: "POST",
                hostname: "mese.webuntis.com",
                path: u,
                headers: headers,
            };

            return httpRequest(options, body)
                .then(cb)
        } else {
            return reject("not authenticated");
        }
    });
}

function connect() {
    return new Promise((resolve, reject) => {
        rpc(authMethod, {
                user: config.userName,
                client: "MY CLIENT",
                password: config.password
            },
            (data) => {
                try {
                    let result = data.result;

                    info = extend(info, result);
                    if (info.sessionId) {
                        _loggedIn = true;
                        console.log("connected!");
                        resolve(info)
                    }
                    else reject("no sessionId returned")
                }
                catch(error) {
                    reject(error);
                }
            });
    });
}

function disconnect() {
    return new Promise((resolve, reject) => {rpc("logout", {}, data => {
            _loggedIn = false;
            console.log("disconnected!");
            resolve(data)
        });
    })
}

module.exports = {
    info: info,
    rpc: rpc,
    connect: connect,
    setup: setup,
    setupWithObject: setupWithObject,
    loggedIn: _loggedIn,
    logOut: disconnect,
};

