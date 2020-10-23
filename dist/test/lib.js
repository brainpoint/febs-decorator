'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.except_success = exports.except_fail = void 0;
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-16 11:12
* Desc:
*/
const tap_1 = require("tap");
/**
* @desc: 期望执行失败.
*/
function except_fail(...foo) {
    for (let i = 0; i < foo.length; i++) {
        let success = true;
        try {
            foo[i]();
        }
        catch (e) {
            success = false;
        }
        finally {
            tap_1.default.equal(success, false);
        }
    }
}
exports.except_fail = except_fail;
/**
* @desc: 期望执行成功.
*/
function except_success(...foo) {
    for (let i = 0; i < foo.length; i++) {
        let success = true;
        try {
            foo[i]();
        }
        catch (e) {
            success = false;
        }
        finally {
            tap_1.default.equal(success, true);
        }
    }
}
exports.except_success = except_success;
//# sourceMappingURL=lib.js.map