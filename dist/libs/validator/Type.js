'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const febs = require("febs-browser");
const validatorUtils_1 = require("./validatorUtils");
exports.Type = {
    Boolean: Boolean,
    Number: Numbera,
    Integer: Integer,
    BigInt: BigInt,
    String: Stringa,
    Date: Datea,
    Object: Objecta,
    Array: Arraya,
    Enum: Enuma,
    Validator: Validator,
};
function validateBoolean(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    if (propertyValue === 'false' || propertyValue === 'true') {
        return { propertyValue: propertyValue === 'false' ? false : true };
    }
    if (propertyValue !== false && propertyValue !== true && propertyValue !== 1 && propertyValue !== 0) {
        return { isValid: false };
    }
    return { propertyValue: !!propertyValue };
}
function validateBoolean_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, validateBoolean);
}
function BooleanList(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(validateBoolean_list, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateBoolean_list, {});
    }
}
function Boolean(...args) {
    if (args.length == 1 || args.length == 0) {
        return validatorUtils_1.getPropertyDecorator(validateBoolean, args[0]);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateBoolean, {});
    }
}
Boolean.List = BooleanList;
function validateNumber(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    if (typeof propertyValue === 'number') {
        return { propertyValue: propertyValue };
    }
    if (Array.isArray(propertyValue)) {
        return { isValid: false };
    }
    propertyValue = Number(propertyValue);
    if (Number.isNaN(propertyValue)) {
        return { isValid: false };
    }
    return { propertyValue: propertyValue };
}
function validateNumber_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, validateNumber);
}
function NumberList(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(validateNumber_list, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateNumber_list, {});
    }
}
function Numbera(...args) {
    if (args.length == 1 || args.length == 0) {
        return validatorUtils_1.getPropertyDecorator(validateNumber, args[0]);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateNumber, {});
    }
}
Numbera.List = NumberList;
function validateInteger(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    if (Array.isArray(propertyValue)) {
        return { isValid: false };
    }
    propertyValue = Number(propertyValue);
    if (Number.isInteger(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    return { isValid: false };
}
function validateInteger_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, validateInteger);
}
function IntegerList(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(validateInteger_list, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateInteger_list, {});
    }
}
function Integer(...args) {
    if (args.length == 1 || args.length == 0) {
        return validatorUtils_1.getPropertyDecorator(validateInteger, args[0]);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateInteger, {});
    }
}
Integer.List = IntegerList;
function validateBigInt(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    if (!febs.utils.bigint_check(propertyValue)) {
        return { isValid: false };
    }
    return { propertyValue: propertyValue };
}
function validateBigInt_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, validateBigInt);
}
function BigIntList(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(validateBigInt_list, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateBigInt_list, {});
    }
}
function BigInt(...args) {
    if (args.length == 1 || args.length == 0) {
        return validatorUtils_1.getPropertyDecorator(validateBigInt, args[0]);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateBigInt, {});
    }
}
BigInt.List = BigIntList;
function validateString(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    if (typeof propertyValue !== 'string') {
        return { isValid: false };
    }
    return { propertyValue: propertyValue };
}
function validateString_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, validateString);
}
function StringList(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(validateString_list, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateString_list, {});
    }
}
function Stringa(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(validateString, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateString, {});
    }
}
Stringa.List = StringList;
function validateDate(propertyValue, decoratorData) {
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
    return { propertyValue: propertyValue };
}
function validateDate_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, validateDate);
}
function DateList(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(validateDate_list, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateDate_list, {});
    }
}
function Datea(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(validateDate, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateDate, {});
    }
}
Datea.List = DateList;
function validateObject(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    if (Array.isArray(propertyValue)) {
        return { isValid: false };
    }
    if (typeof propertyValue === 'object') {
        return { propertyValue: propertyValue };
    }
    return { isValid: false };
}
function validateObject_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, validateObject);
}
function ObjectList(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(validateObject_list, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateObject_list, {});
    }
}
function Objecta(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(validateObject, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateObject, {});
    }
}
Objecta.List = ObjectList;
function validateArray(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    if (Array.isArray(propertyValue)) {
        if (typeof decoratorData.checkCB === 'function') {
            for (let i = 0; i < propertyValue.length; i++) {
                if (false === decoratorData.checkCB(propertyValue[i], i, propertyValue)) {
                    return { isValid: false };
                }
            }
        }
        return { propertyValue: propertyValue };
    }
    return { isValid: false };
}
function validateArray_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, validateArray);
}
function ArrayList(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(validateArray_list, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateArray_list, {});
    }
}
function Arraya(...args) {
    if (args.length == 1 || args.length == 0) {
        let cfg = args[0] || {};
        return validatorUtils_1.getPropertyDecorator(validateArray, cfg);
    }
    else {
        validatorUtils_1.doPropertyDecorator(args[0], args[1], validateArray, {});
    }
}
Arraya.List = ArrayList;
function validateEnum(propertyValue, decoratorData) {
    if (febs.utils.isNull(propertyValue)) {
        return { propertyValue: propertyValue };
    }
    for (const key1 in decoratorData.enumType) {
        if (propertyValue === decoratorData.enumType[key1]) {
            if (typeof decoratorData.checkCB === 'function') {
                if (false === decoratorData.checkCB(propertyValue)) {
                    return { isValid: false };
                }
            }
            return { propertyValue: propertyValue };
        }
    }
    return { isValid: false };
}
function validateEnum_list(propertyValue, decoratorData) {
    return validatorUtils_1.verifyPropertyList(propertyValue, decoratorData, validateEnum);
}
function EnumList(cfg) {
    return validatorUtils_1.getPropertyDecorator(validateEnum_list, cfg);
}
function Enuma(cfg) {
    return validatorUtils_1.getPropertyDecorator(validateEnum, cfg);
}
Enuma.List = EnumList;
function validateValidator(propertyValue, decoratorData) {
    if (typeof decoratorData.checkCB === 'function') {
        if (false === decoratorData.checkCB(propertyValue)) {
            return { isValid: false };
        }
        return { propertyValue: propertyValue };
    }
    return { isValid: false };
}
function Validator(cfg) {
    return validatorUtils_1.getPropertyDecorator(validateValidator, cfg);
}
//# sourceMappingURL=Type.js.map