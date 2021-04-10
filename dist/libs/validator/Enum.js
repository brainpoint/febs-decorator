'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = void 0;
const febs = require("febs-browser");
const validatorUtils_1 = require("./validatorUtils");
function verify(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    for (let i = 0; i < decoratorData.allows.length; i++) {
        if (propertyValue === decoratorData.allows[i]) {
            return { propertyValue: propertyValue };
        }
    }
    return { isValid: false };
}
function verify_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, verify);
}
function DecoratorList(cfg) {
    if (!Array.isArray(cfg.allows)) {
        throw new febs.exception('verify @Enum allows error', febs.exception.PARAM, __filename, __line, __column);
    }
    return validatorUtils_1.getPropertyDecorator(verify_list, cfg);
}
Enum.List = DecoratorList;
function Enum(cfg) {
    if (!Array.isArray(cfg.allows)) {
        throw new febs.exception('verify @Enum allows error', febs.exception.PARAM, __filename, __line, __column);
    }
    return validatorUtils_1.getPropertyDecorator(verify, cfg);
}
exports.Enum = Enum;
//# sourceMappingURL=Enum.js.map