'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Positive = void 0;
const febs = require("febs-browser");
const validatorUtils_1 = require("./validatorUtils");
function verify(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    if (!febs.utils.bigint_check(propertyValue)) {
        return { isValid: false };
    }
    if (febs.utils.bigint_less_than_e(propertyValue, 0)) {
        return { isValid: false };
    }
    if (typeof propertyValue === 'string') {
        if (propertyValue.length > 15) {
            return { propertyValue: febs.utils.bigint(propertyValue) };
        }
        else {
            return { propertyValue: Number(propertyValue) };
        }
    }
    else {
        return { propertyValue: propertyValue };
    }
}
function verify_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, verify);
}
function DecoratorList(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(verify_list, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], verify_list, {});
    }
}
Positive.List = DecoratorList;
function Positive(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(verify, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], verify, {});
    }
}
exports.Positive = Positive;
//# sourceMappingURL=Positive.js.map