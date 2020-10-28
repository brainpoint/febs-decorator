'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPropertyList = exports.getPropertyDecorator = exports.doPropertyDecorator = exports._validate_param = exports.MetadataKey_TypeArrayList = exports.MetadataKey_TypeArray = exports.MetadataKey_TypeObjectList = exports.MetadataKey_TypeObject = exports.MetadataKey_TypeDateList = exports.MetadataKey_TypeDate = exports.MetadataKey_TypeStringList = exports.MetadataKey_TypeString = exports.MetadataKey_TypeBigIntList = exports.MetadataKey_TypeBigInt = exports.MetadataKey_TypeIntegerList = exports.MetadataKey_TypeInteger = exports.MetadataKey_TypeNumberList = exports.MetadataKey_TypeNumber = exports.MetadataKey_TypeBoolList = exports.MetadataKey_TypeBool = exports.MetadataKey_SizeList = exports.MetadataKey_Size = exports.MetadataKey_RangeList = exports.MetadataKey_Range = exports.MetadataKey_PositiveOrZeroList = exports.MetadataKey_PositiveOrZero = exports.MetadataKey_PositiveList = exports.MetadataKey_Positive = exports.MetadataKey_PatternList = exports.MetadataKey_Pattern = exports.MetadataKey_PastOrPresentList = exports.MetadataKey_PastOrPresent = exports.MetadataKey_PastList = exports.MetadataKey_Past = exports.MetadataKey_NullList = exports.MetadataKey_Null = exports.MetadataKey_NotNullList = exports.MetadataKey_NotNull = exports.MetadataKey_NotEmptyList = exports.MetadataKey_NotEmpty = exports.MetadataKey_NotBlankList = exports.MetadataKey_NotBlank = exports.MetadataKey_NegativeOrZeroList = exports.MetadataKey_NegativeOrZero = exports.MetadataKey_NegativeList = exports.MetadataKey_Negative = exports.MetadataKey_MinList = exports.MetadataKey_Min = exports.MetadataKey_MaxList = exports.MetadataKey_Max = exports.MetadataKey_FutureOrPresentList = exports.MetadataKey_FutureOrPresent = exports.MetadataKey_FutureList = exports.MetadataKey_Future = exports.MetadataKey_EmailList = exports.MetadataKey_Email = exports.MetadataKey_DecimalMinList = exports.MetadataKey_DecimalMin = exports.MetadataKey_DecimalMaxList = exports.MetadataKey_DecimalMax = exports.MetadataKey_AssertTrueList = exports.MetadataKey_AssertTrue = exports.MetadataKey_AssertFalseList = exports.MetadataKey_AssertFalse = void 0;
require("reflect-metadata");
const febs = require("febs-browser");
const objectUtils_1 = require("../utils/objectUtils");
exports.MetadataKey_AssertFalse = Symbol('MetadataKey_AssertFalse');
exports.MetadataKey_AssertFalseList = Symbol('MetadataKey_AssertFalseList');
exports.MetadataKey_AssertTrue = Symbol('MetadataKey_AssertTrue');
exports.MetadataKey_AssertTrueList = Symbol('MetadataKey_AssertTrueList');
exports.MetadataKey_DecimalMax = Symbol('MetadataKey_DecimalMax');
exports.MetadataKey_DecimalMaxList = Symbol('MetadataKey_DecimalMaxList');
exports.MetadataKey_DecimalMin = Symbol('MetadataKey_DecimalMin');
exports.MetadataKey_DecimalMinList = Symbol('MetadataKey_DecimalMinList');
exports.MetadataKey_Email = Symbol('MetadataKey_Email');
exports.MetadataKey_EmailList = Symbol('MetadataKey_EmailList');
exports.MetadataKey_Future = Symbol('MetadataKey_Future');
exports.MetadataKey_FutureList = Symbol('MetadataKey_FutureList');
exports.MetadataKey_FutureOrPresent = Symbol('MetadataKey_FutureOrPresent');
exports.MetadataKey_FutureOrPresentList = Symbol('MetadataKey_FutureOrPresentList');
exports.MetadataKey_Max = Symbol('MetadataKey_Max');
exports.MetadataKey_MaxList = Symbol('MetadataKey_MaxList');
exports.MetadataKey_Min = Symbol('MetadataKey_Min');
exports.MetadataKey_MinList = Symbol('MetadataKey_MinList');
exports.MetadataKey_Negative = Symbol('MetadataKey_Negative');
exports.MetadataKey_NegativeList = Symbol('MetadataKey_NegativeList');
exports.MetadataKey_NegativeOrZero = Symbol('MetadataKey_NegativeOrZero');
exports.MetadataKey_NegativeOrZeroList = Symbol('MetadataKey_NegativeOrZeroList');
exports.MetadataKey_NotBlank = Symbol('MetadataKey_NotBlank');
exports.MetadataKey_NotBlankList = Symbol('MetadataKey_NotBlankList');
exports.MetadataKey_NotEmpty = Symbol('MetadataKey_NotEmpty');
exports.MetadataKey_NotEmptyList = Symbol('MetadataKey_NotEmptyList');
exports.MetadataKey_NotNull = Symbol('MetadataKey_NotNull');
exports.MetadataKey_NotNullList = Symbol('MetadataKey_NotNullList');
exports.MetadataKey_Null = Symbol('MetadataKey_Null');
exports.MetadataKey_NullList = Symbol('MetadataKey_NullList');
exports.MetadataKey_Past = Symbol('MetadataKey_Past');
exports.MetadataKey_PastList = Symbol('MetadataKey_PastList');
exports.MetadataKey_PastOrPresent = Symbol('MetadataKey_PastOrPresent');
exports.MetadataKey_PastOrPresentList = Symbol('MetadataKey_PastOrPresentList');
exports.MetadataKey_Pattern = Symbol('MetadataKey_Pattern');
exports.MetadataKey_PatternList = Symbol('MetadataKey_PatternList');
exports.MetadataKey_Positive = Symbol('MetadataKey_Positive');
exports.MetadataKey_PositiveList = Symbol('MetadataKey_PositiveList');
exports.MetadataKey_PositiveOrZero = Symbol('MetadataKey_PositiveOrZero');
exports.MetadataKey_PositiveOrZeroList = Symbol('MetadataKey_PositiveOrZeroList');
exports.MetadataKey_Range = Symbol('MetadataKey_Range');
exports.MetadataKey_RangeList = Symbol('MetadataKey_RangeList');
exports.MetadataKey_Size = Symbol('MetadataKey_Size');
exports.MetadataKey_SizeList = Symbol('MetadataKey_SizeList');
exports.MetadataKey_TypeBool = Symbol('MetadataKey_TypeBool');
exports.MetadataKey_TypeBoolList = Symbol('MetadataKey_TypeBoolList');
exports.MetadataKey_TypeNumber = Symbol('MetadataKey_TypeNumber');
exports.MetadataKey_TypeNumberList = Symbol('MetadataKey_TypeNumberList');
exports.MetadataKey_TypeInteger = Symbol('MetadataKey_TypeInteger');
exports.MetadataKey_TypeIntegerList = Symbol('MetadataKey_TypeIntegerList');
exports.MetadataKey_TypeBigInt = Symbol('MetadataKey_TypeBigInt');
exports.MetadataKey_TypeBigIntList = Symbol('MetadataKey_TypeBigIntList');
exports.MetadataKey_TypeString = Symbol('MetadataKey_TypeString');
exports.MetadataKey_TypeStringList = Symbol('MetadataKey_TypeStringList');
exports.MetadataKey_TypeDate = Symbol('MetadataKey_TypeDate');
exports.MetadataKey_TypeDateList = Symbol('MetadataKey_TypeDateList');
exports.MetadataKey_TypeObject = Symbol('MetadataKey_TypeObject');
exports.MetadataKey_TypeObjectList = Symbol('MetadataKey_TypeObjectList');
exports.MetadataKey_TypeArray = Symbol('MetadataKey_TypeArray');
exports.MetadataKey_TypeArrayList = Symbol('MetadataKey_TypeArrayList');
function _validate_param(target, propertyName, method, argumentList, metadataKey, validator) {
    let requiredParameters = _validate_get_param_matedata(metadataKey, target, propertyName);
    if (requiredParameters) {
        for (let parameterIndex of requiredParameters) {
            if (parameterIndex.parameterIndex >= argumentList.length) {
                let paramName = objectUtils_1.default.getParameterName(method)[parameterIndex.parameterIndex] ||
                    '';
                let defaultMsg = parameterIndex.data && typeof parameterIndex.data.message === 'string'
                    ? parameterIndex.data.message
                    : `validate Parameter '${paramName}': Missing required argument`;
                return { errParamName: paramName, defaultMsg };
            }
            else {
                let paramName = objectUtils_1.default.getParameterName(method)[parameterIndex.parameterIndex] ||
                    '';
                try {
                    let relt = validator(argumentList[parameterIndex.parameterIndex], parameterIndex.data);
                    if (false === relt) {
                        let defaultMsg = parameterIndex.data &&
                            typeof parameterIndex.data.message === 'string'
                            ? parameterIndex.data.message
                            : `Parameter '${paramName}': The argument is invalid`;
                        return { errParamName: paramName, defaultMsg };
                    }
                }
                catch (e) {
                    let defaultMsg = parameterIndex.data &&
                        typeof parameterIndex.data.message === 'string'
                        ? parameterIndex.data.message
                        : `Parameter '${paramName}': The argument verify failure`;
                    return { errParamName: paramName, e, defaultMsg };
                }
            }
        }
    }
    return null;
}
exports._validate_param = _validate_param;
function _validate_set_param_matedata(matedataKey, target, propertyKey, parameterIndex, data) {
    let existingRequiredParameters = Reflect.getOwnMetadata(matedataKey, target, propertyKey) || [];
    existingRequiredParameters.push({ parameterIndex, data });
    Reflect.defineMetadata(matedataKey, existingRequiredParameters, target, propertyKey);
}
function _validate_get_param_matedata(matedataKey, target, propertyKey) {
    return Reflect.getOwnMetadata(matedataKey, target, propertyKey);
}
function doPropertyDecorator(target, propertyKey, validateFunction, decoratorData) {
    let mk = propertyKey;
    let existingRequiredParameters = Reflect.getOwnMetadata(mk, target, propertyKey) || [];
    existingRequiredParameters.push({ validateFunction, decoratorData });
    Reflect.defineMetadata(mk, existingRequiredParameters, target, propertyKey);
    if (existingRequiredParameters.length > 1) {
        return;
    }
    let value = target[propertyKey];
    Object.defineProperty(target, propertyKey, {
        enumerable: true,
        configurable: false,
        get: function () {
            return value;
        },
        set: function (v) {
            let requiredParameters = Reflect.getOwnMetadata(mk, target, propertyKey);
            if (!requiredParameters) {
                value = v;
            }
            else {
                let r = {};
                let defaultMsg;
                try {
                    for (let parameter of requiredParameters) {
                        r = parameter.validateFunction(v, parameter.decoratorData);
                        if (false == r.isValid) {
                            break;
                        }
                    }
                }
                catch (e) {
                    defaultMsg =
                        decoratorData.message ||
                            `Property '${String(propertyKey)}': The value verify failure`;
                    throw new febs.exception(defaultMsg, febs.exception.PARAM, __filename, __line, __column);
                }
                if (false === r.isValid) {
                    defaultMsg =
                        decoratorData.message ||
                            `Property '${String(propertyKey)}': The value is invalid`;
                    throw new febs.exception(defaultMsg, febs.exception.PARAM, __filename, __line, __column);
                }
                value = r.propertyValue;
            }
        },
    });
}
exports.doPropertyDecorator = doPropertyDecorator;
function getPropertyDecorator(verify, cfg) {
    return (target, propertyKey) => {
        doPropertyDecorator(target, propertyKey, verify, cfg || {});
    };
}
exports.getPropertyDecorator = getPropertyDecorator;
function verifyPropertyList(propertyValues, decoratorData, verfiy) {
    let listMaxLength = Number(decoratorData.listMaxLength);
    listMaxLength = Number.isNaN(listMaxLength) ? Number.MAX_SAFE_INTEGER : listMaxLength;
    let r = {};
    if (propertyValues) {
        if (Array.isArray(propertyValues) &&
            propertyValues.length <= listMaxLength) {
            for (let i = 0; i < propertyValues.length; i++) {
                r = verfiy(propertyValues[i], decoratorData);
                if (false === r.isValid) {
                    return r;
                }
                propertyValues[i] = r.propertyValue;
            }
            r.isValid = true;
            r.propertyValue = propertyValues;
        }
        else {
            r.isValid = false;
        }
    }
    else {
        r.isValid = true;
        r.propertyValue = propertyValues;
    }
    return r;
}
exports.verifyPropertyList = verifyPropertyList;
//# sourceMappingURL=validatorUtils.js.map