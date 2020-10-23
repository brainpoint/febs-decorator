'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertTrue = void 0;
/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */
const febs = require("febs-browser");
const validatorUtils_1 = require("./validatorUtils");
function verify(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    if (propertyValue !== true && propertyValue !== 'true' && propertyValue !== 1) {
        return { isValid: false };
    }
    return { propertyValue: true };
}
function verify_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, verify);
}
function DecoratorList(...args) {
    if (args.length == 1 || args.length == 0) {
        return validatorUtils_1.getPropertyDecorator(verify_list, args[0]);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], verify_list, {});
    }
}
/**
 * 验证是否是数组.
 */
AssertTrue.List = DecoratorList;
function AssertTrue(...args) {
    if (args.length == 1 || args.length == 0) {
        return validatorUtils_1.getPropertyDecorator(verify, args[0]);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], verify, {});
    }
}
exports.AssertTrue = AssertTrue;
//# sourceMappingURL=AssertTrue.js.map