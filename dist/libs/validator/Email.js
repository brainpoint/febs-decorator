'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const febs = require("febs-browser");
const validatorUtils_1 = require("./validatorUtils");
const defaultReg = /^(([A-Za-z0-9\u4e00-\u9fa5_-]|\.)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)$/;
function verify(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    if (!decoratorData.regexp.test(propertyValue)) {
        return { isValid: false };
    }
    return { propertyValue: propertyValue };
}
function verify_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, verify);
}
function DecoratorList(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        cfg = cfg || {};
        cfg.regexp = cfg.regexp || defaultReg;
        if (typeof cfg.regexp.test !== 'function') {
            throw new febs.exception('verify @Email regexp error', febs.exception.PARAM, __filename, __line, __column);
        }
        return validatorUtils_1.getPropertyDecorator(verify_list, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], verify_list, {
            regexp: defaultReg,
        });
    }
}
Email.List = DecoratorList;
function Email(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        cfg = cfg || {};
        cfg.regexp = cfg.regexp || defaultReg;
        if (typeof cfg.regexp.test !== 'function') {
            throw new febs.exception('verify @Email regexp error', febs.exception.PARAM, __filename, __line, __column);
        }
        return validatorUtils_1.getPropertyDecorator(verify, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], verify, {
            regexp: defaultReg,
        });
    }
}
exports.Email = Email;
//# sourceMappingURL=Email.js.map