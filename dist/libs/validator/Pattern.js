'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pattern = void 0;
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
        throw new febs.exception('verify @Pattern regexp error', febs.exception.ERROR, __filename, __line, __column);
    }
    return validatorUtils_1.getPropertyDecorator(verify_list, cfg);
}
/**
 * 验证是否是数组.
 */
Pattern.List = DecoratorList;
/**
 * @desc 指定参数必须是email或指定的正则表达式.
 * @returns {PropertyDecorator}
 */
function Pattern(cfg) {
    if (!cfg.regexp || typeof cfg.regexp.test !== 'function') {
        throw new febs.exception('verify @Pattern regexp error', febs.exception.ERROR, __filename, __line, __column);
    }
    return validatorUtils_1.getPropertyDecorator(verify, cfg);
}
exports.Pattern = Pattern;
//# sourceMappingURL=Pattern.js.map