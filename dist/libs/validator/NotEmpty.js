'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotEmpty = void 0;
/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */
const validatorUtils_1 = require("./validatorUtils");
function verify(propertyValue, decoratorData) {
    if (propertyValue === null || propertyValue === undefined) {
        return { isValid: false };
    }
    if (typeof propertyValue.size === 'function') {
        return propertyValue.size() > 0 ? { propertyValue: propertyValue } : { isValid: false };
    }
    else {
        return propertyValue.length > 0 ? { propertyValue: propertyValue } : { isValid: false };
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
/**
 * 验证是否是数组.
 */
NotEmpty.List = DecoratorList;
function NotEmpty(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(verify, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], verify, {});
    }
}
exports.NotEmpty = NotEmpty;
//# sourceMappingURL=NotEmpty.js.map