'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Min = void 0;
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
    if (!febs.utils.bigint_check(propertyValue)) {
        return { isValid: false };
    }
    if (febs.utils.bigint_less_than(propertyValue, decoratorData.value)) {
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
function DecoratorList(cfg) {
    cfg.value = cfg.value || 0;
    return validatorUtils_1.getPropertyDecorator(verify_list, cfg);
}
/**
 * 验证是否是数组.
 */
Min.List = DecoratorList;
/**
 * @desc 指定参数值必须大于等于指定的值.
 *
 * 验证后属性值如果使用number可以表示将转换为number, 否则将保留原样
 *
 * @returns {PropertyDecorator}
 */
function Min(cfg) {
    cfg.value = cfg.value || 0;
    return validatorUtils_1.getPropertyDecorator(verify, cfg);
}
exports.Min = Min;
//# sourceMappingURL=Min.js.map