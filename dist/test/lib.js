'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.except_success = exports.except_fail = void 0;
const tap_1 = require("tap");
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