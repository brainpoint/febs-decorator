'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Range = void 0;
const febs = require("febs-browser");
const validatorUtils_1 = require("./validatorUtils");
function verify(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    propertyValue = Number(propertyValue);
    if (!Number.isNaN(propertyValue)) {
        if (propertyValue > decoratorData.max || propertyValue < decoratorData.min) {
            return { isValid: false };
        }
        return { propertyValue: propertyValue };
    }
    return { isValid: false };
}
function verify_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, verify);
}
function DecoratorList(cfg) {
    cfg.min = Number(cfg.min) || 0;
    cfg.max = Number(cfg.max) || 0;
    return validatorUtils_1.getPropertyDecorator(verify_list, cfg);
}
Range.List = DecoratorList;
function Range(cfg) {
    cfg.min = Number(cfg.min) || 0;
    cfg.max = Number(cfg.max) || 0;
    return validatorUtils_1.getPropertyDecorator(verify, cfg);
}
exports.Range = Range;
//# sourceMappingURL=Range.js.map