'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pattern = void 0;
const febs = require("febs-browser");
const validatorUtils_1 = require("./validatorUtils");
function verify(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    if (febs.string.isEmpty(propertyValue)) {
        return { isValid: false };
    }
    if (!decoratorData.regexp.test(propertyValue)) {
        return { isValid: false };
    }
    return { propertyValue: propertyValue };
}
function verify_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, verify);
}
function DecoratorList(cfg) {
    if (!cfg.regexp || typeof cfg.regexp.test !== 'function') {
        throw new febs.exception('verify @Pattern regexp error', febs.exception.PARAM, __filename, __line, __column);
    }
    return validatorUtils_1.getPropertyDecorator(verify_list, cfg);
}
Pattern.List = DecoratorList;
function Pattern(cfg) {
    if (!cfg.regexp || typeof cfg.regexp.test !== 'function') {
        throw new febs.exception('verify @Pattern regexp error', febs.exception.PARAM, __filename, __line, __column);
    }
    return validatorUtils_1.getPropertyDecorator(verify, cfg);
}
exports.Pattern = Pattern;
//# sourceMappingURL=Pattern.js.map