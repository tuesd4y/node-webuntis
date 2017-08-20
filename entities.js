/* ------------------------------------------------------------------------------
 *
 *
 *
 *  by Christopher Stelzmüller (tuesd4y)
 *  12.02.2017 (tuesd4y) :: created
 *  12.02.2017
 *
 * ---------------------------------------------------------------------------- */
"use strict";
const isNumber =  require("util").isNumber;

class TimeTableEntity {
    constructor(id, type) {
        if(isNumber(id) && id > 0) {
            if(isNumber(type) && type > 0 && type <= 5) {
                this.type = type;
                this.id = id;
            } else {
                throw Error("type has to be a number between 0 and 6")
            }
        } else {
            throw Error("id has to be a number greater than 0")
        }
    }
}

module.exports = {
    TimeTableEntity: TimeTableEntity
};
