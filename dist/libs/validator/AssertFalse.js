'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertFalse = void 0;
const febs = require("febs-browser");
const validatorUtils_1 = require("./validatorUtils");
function verify(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    if (propertyValue !== false && propertyValue !== 'false' && propertyValue !== 0) {
        return { isValid: false };
    }
    return { propertyValue: false };
}
function verify_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, verify);
}
AssertFalse.List = DecoratorList;
function DecoratorList(...args) {
    if (args.length == 1 || args.length == 0) {
        return validatorUtils_1.getPropertyDecorator(verify_list, args);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], verify_list, {});
    }
}
function AssertFalse(...args) {
    if (args.length == 1 || args.length == 0) {
        return validatorUtils_1.getPropertyDecorator(verify, args[0]);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], verify, {});
    }
}
exports.AssertFalse = AssertFalse;
//# sourceMappingURL=AssertFalse.js.map