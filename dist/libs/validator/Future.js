'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Future = void 0;
const febs = require("febs-browser");
const validatorUtils_1 = require("./validatorUtils");
function verify(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    let ty = typeof propertyValue;
    if (ty === 'string') {
        propertyValue = new Date(propertyValue);
    }
    else if (ty === 'number') {
        propertyValue = new Date(ty);
    }
    if (!febs.date.isValidate(propertyValue)) {
        return { isValid: false };
    }
    let now = decoratorData.now ? decoratorData.now : new Date();
    if (propertyValue.getTime() + propertyValue.getTimezoneOffset() * 60 * 1000 <
        now.getTime() + now.getTimezoneOffset() * 60 * 1000) {
        return { isValid: false };
    }
    return { propertyValue: propertyValue };
}
function verify_list(propertyValue, decoratorData) {
    decoratorData.now = new Date();
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
Future.List = DecoratorList;
function Future(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(verify, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], verify, {});
    }
}
exports.Future = Future;
//# sourceMappingURL=Future.js.map