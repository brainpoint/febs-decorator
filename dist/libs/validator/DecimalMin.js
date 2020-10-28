'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecimalMin = void 0;
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
DecimalMin.List = DecoratorList;
function DecimalMin(cfg) {
    cfg.value = cfg.value || 0;
    return validatorUtils_1.getPropertyDecorator(verify, cfg);
}
exports.DecimalMin = DecimalMin;
//# sourceMappingURL=DecimalMin.js.map