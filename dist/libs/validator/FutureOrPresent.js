'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FutureOrPresent = void 0;
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
    if (propertyValue.getTime() + propertyValue.getTimezoneOffset() * 60 * 1000 + 10 <=
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
/**
 * 验证是否是数组.
 */
FutureOrPresent.List = DecoratorList;
function FutureOrPresent(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(verify, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], verify, {});
    }
}
exports.FutureOrPresent = FutureOrPresent;
//# sourceMappingURL=FutureOrPresent.js.map