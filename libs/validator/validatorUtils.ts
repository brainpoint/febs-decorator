'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: lipengxiang
 * Date: 2020-01-19 16:11
 * Desc: 仅可用于异步方法. 验证错误时, 返回错误的Msg信息.
 */

import 'reflect-metadata'
import * as febs from 'febs-browser';
import objectUtils from '../utils/objectUtils'

export const MetadataKey_AssertFalse = Symbol('MetadataKey_AssertFalse')
export const MetadataKey_AssertFalseList = Symbol('MetadataKey_AssertFalseList')
export const MetadataKey_AssertTrue = Symbol('MetadataKey_AssertTrue')
export const MetadataKey_AssertTrueList = Symbol('MetadataKey_AssertTrueList')
export const MetadataKey_DecimalMax = Symbol('MetadataKey_DecimalMax')
export const MetadataKey_DecimalMaxList = Symbol('MetadataKey_DecimalMaxList')
export const MetadataKey_DecimalMin = Symbol('MetadataKey_DecimalMin')
export const MetadataKey_DecimalMinList = Symbol('MetadataKey_DecimalMinList')
export const MetadataKey_Email = Symbol('MetadataKey_Email')
export const MetadataKey_EmailList = Symbol('MetadataKey_EmailList')
export const MetadataKey_Future = Symbol('MetadataKey_Future')
export const MetadataKey_FutureList = Symbol('MetadataKey_FutureList')
export const MetadataKey_FutureOrPresent = Symbol('MetadataKey_FutureOrPresent')
export const MetadataKey_FutureOrPresentList = Symbol(
  'MetadataKey_FutureOrPresentList'
)
export const MetadataKey_Max = Symbol('MetadataKey_Max')
export const MetadataKey_MaxList = Symbol('MetadataKey_MaxList')
export const MetadataKey_Min = Symbol('MetadataKey_Min')
export const MetadataKey_MinList = Symbol('MetadataKey_MinList')
export const MetadataKey_Negative = Symbol('MetadataKey_Negative')
export const MetadataKey_NegativeList = Symbol('MetadataKey_NegativeList')
export const MetadataKey_NegativeOrZero = Symbol('MetadataKey_NegativeOrZero')
export const MetadataKey_NegativeOrZeroList = Symbol(
  'MetadataKey_NegativeOrZeroList'
)
export const MetadataKey_NotBlank = Symbol('MetadataKey_NotBlank')
export const MetadataKey_NotBlankList = Symbol('MetadataKey_NotBlankList')
export const MetadataKey_NotEmpty = Symbol('MetadataKey_NotEmpty')
export const MetadataKey_NotEmptyList = Symbol('MetadataKey_NotEmptyList')
export const MetadataKey_NotNull = Symbol('MetadataKey_NotNull')
export const MetadataKey_NotNullList = Symbol('MetadataKey_NotNullList')
export const MetadataKey_Null = Symbol('MetadataKey_Null')
export const MetadataKey_NullList = Symbol('MetadataKey_NullList')
export const MetadataKey_Past = Symbol('MetadataKey_Past')
export const MetadataKey_PastList = Symbol('MetadataKey_PastList')
export const MetadataKey_PastOrPresent = Symbol('MetadataKey_PastOrPresent')
export const MetadataKey_PastOrPresentList = Symbol(
  'MetadataKey_PastOrPresentList'
)
export const MetadataKey_Pattern = Symbol('MetadataKey_Pattern')
export const MetadataKey_PatternList = Symbol('MetadataKey_PatternList')
export const MetadataKey_Positive = Symbol('MetadataKey_Positive')
export const MetadataKey_PositiveList = Symbol('MetadataKey_PositiveList')
export const MetadataKey_PositiveOrZero = Symbol('MetadataKey_PositiveOrZero')
export const MetadataKey_PositiveOrZeroList = Symbol(
  'MetadataKey_PositiveOrZeroList'
)
export const MetadataKey_Range = Symbol('MetadataKey_Range')
export const MetadataKey_RangeList = Symbol('MetadataKey_RangeList')
export const MetadataKey_Size = Symbol('MetadataKey_Size')
export const MetadataKey_SizeList = Symbol('MetadataKey_SizeList')

export const MetadataKey_TypeBool = Symbol('MetadataKey_TypeBool')
export const MetadataKey_TypeBoolList = Symbol('MetadataKey_TypeBoolList')
export const MetadataKey_TypeNumber = Symbol('MetadataKey_TypeNumber')
export const MetadataKey_TypeNumberList = Symbol('MetadataKey_TypeNumberList')
export const MetadataKey_TypeInteger = Symbol('MetadataKey_TypeInteger')
export const MetadataKey_TypeIntegerList = Symbol('MetadataKey_TypeIntegerList')
export const MetadataKey_TypeBigInt = Symbol('MetadataKey_TypeBigInt')
export const MetadataKey_TypeBigIntList = Symbol('MetadataKey_TypeBigIntList')
export const MetadataKey_TypeString = Symbol('MetadataKey_TypeString')
export const MetadataKey_TypeStringList = Symbol('MetadataKey_TypeStringList')
export const MetadataKey_TypeDate = Symbol('MetadataKey_TypeDate')
export const MetadataKey_TypeDateList = Symbol('MetadataKey_TypeDateList')
export const MetadataKey_TypeObject = Symbol('MetadataKey_TypeObject')
export const MetadataKey_TypeObjectList = Symbol('MetadataKey_TypeObjectList')
export const MetadataKey_TypeArray = Symbol('MetadataKey_TypeArray')
export const MetadataKey_TypeArrayList = Symbol('MetadataKey_TypeArrayList')

/**
 * @desc: 验证参数.
 * @return null表明是正确的. 否则返回错误的参数名.
 */
export function _validate_param(
  target: any,
  propertyName: string,
  method: Function,
  argumentList: IArguments,
  metadataKey: Symbol,
  /** propertyValue:参数值; data:注解参数 */
  validator: (propertyValue: any, decoratorData: any) => false | void // 返回true表明有错误.
): {
  errParamName: string
  defaultMsg: string
  e?: Error
} {
  let requiredParameters: {
    parameterIndex: number
    data?: any
  }[] = _validate_get_param_matedata(metadataKey, target, propertyName)
  if (requiredParameters) {
    for (let parameterIndex of requiredParameters) {
      if (parameterIndex.parameterIndex >= argumentList.length) {
        let paramName =
          objectUtils.getParameterName(method)[parameterIndex.parameterIndex] ||
          ''
        let defaultMsg: string =
          parameterIndex.data && typeof parameterIndex.data.message === 'string'
            ? parameterIndex.data.message
            : `validate Parameter '${paramName}': Missing required argument`
        return { errParamName: paramName, defaultMsg }
      } else {
        let paramName =
          objectUtils.getParameterName(method)[parameterIndex.parameterIndex] ||
          ''
        try {
          let relt = validator(
            argumentList[parameterIndex.parameterIndex],
            parameterIndex.data
          )
          if (false === relt) {
            let defaultMsg: string =
              parameterIndex.data &&
              typeof parameterIndex.data.message === 'string'
                ? parameterIndex.data.message
                : `Parameter '${paramName}': The argument is invalid`
            return { errParamName: paramName, defaultMsg }
          }
        } catch (e) {
          let defaultMsg: string =
            parameterIndex.data &&
            typeof parameterIndex.data.message === 'string'
              ? parameterIndex.data.message
              : `Parameter '${paramName}': The argument verify failure`
          return { errParamName: paramName, e, defaultMsg }
        }
      }
    }
  }

  return null
}

/**
 * @desc: 对方法参数设置matedata数据.
 */
function _validate_set_param_matedata(
  matedataKey: Symbol,
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
  data?: any
) {
  let existingRequiredParameters: { parameterIndex: number; data?: any }[] =
    Reflect.getOwnMetadata(matedataKey, target, propertyKey) || []
  existingRequiredParameters.push({ parameterIndex, data })
  Reflect.defineMetadata(
    matedataKey,
    existingRequiredParameters,
    target,
    propertyKey
  )
}

function _validate_get_param_matedata(
  matedataKey: Symbol,
  target: Object,
  propertyKey: string | symbol
): { parameterIndex: number; data?: any }[] {
  return Reflect.getOwnMetadata(matedataKey, target, propertyKey)
}

/**
 * @desc: 对对象属性设置matedata数据.
 */
export function doPropertyDecorator(
  target: any,
  propertyKey: string | symbol,
  validateFunction: Function,
  decoratorData: any
) {
  let mk = propertyKey
  let existingRequiredParameters: {
    validateFunction: Function
    decoratorData: any
  }[] = Reflect.getOwnMetadata(mk, target, propertyKey) || []
  existingRequiredParameters.push({ validateFunction, decoratorData })
  Reflect.defineMetadata(mk, existingRequiredParameters, target, propertyKey)

  if (existingRequiredParameters.length > 1) {
    return
  }

  let value = target[propertyKey]
  Object.defineProperty(target, propertyKey, {
    enumerable: true,
    configurable: false,
    get: function () {
      return value
    },
    set: function (v) {
      let requiredParameters: {
        validateFunction: Function
        decoratorData: any
      }[] = Reflect.getOwnMetadata(mk, target, propertyKey)

      if (!requiredParameters) {
        value = v
      } else {
        let r = {} as { isValid?: boolean; propertyValue?: any }
        let defaultMsg: string
        try {
          for (let parameter of requiredParameters) {
            r = parameter.validateFunction(v, parameter.decoratorData)
            if (false == r.isValid) {
              break
            }
          }
        } catch (e) {
          defaultMsg =
            decoratorData.message ||
            `Property '${String(propertyKey)}': The value verify failure`
          throw new febs.exception(defaultMsg, febs.exception.PARAM, __filename, __line, __column)
        }

        if (false === r.isValid) {
          defaultMsg =
            decoratorData.message ||
            `Property '${String(propertyKey)}': The value is invalid`
          throw new febs.exception(defaultMsg, febs.exception.PARAM, __filename, __line, __column)
        }

        value = r.propertyValue
      }
    },
  })
}

/**
 * @desc 获取属性修饰器. 修饰器带必须一个参数.
 * @returns {PropertyDecorator}
 */
export function getPropertyDecorator(verify:Function, cfg: any): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    doPropertyDecorator(
      target,
      propertyKey,
      verify,
      cfg || {}
    )
  }
}

/**
* @desc: 当形如 `@xxx.List` 验证时使用的验证方法.
*/
export function verifyPropertyList(
  propertyValues: any[],
  decoratorData: any,
  verfiy:Function
): { isValid?: boolean; propertyValue?: any } {
  let listMaxLength: number = Number(decoratorData.listMaxLength);
  listMaxLength = Number.isNaN(listMaxLength) ? Number.MAX_SAFE_INTEGER : listMaxLength;
  
  let r = {} as { isValid?: boolean; propertyValue?: any }

  if (propertyValues) {
    if (
      Array.isArray(propertyValues) &&
      propertyValues.length <= listMaxLength
    ) {
      for (let i = 0; i < propertyValues.length; i++) {
        r = verfiy(propertyValues[i], decoratorData)
        if (false === r.isValid) {
          return r
        }
        propertyValues[i] = r.propertyValue
      }
      r.isValid = true
      r.propertyValue = propertyValues
    } else {
      r.isValid = false
    }
  } else {
    r.isValid = true
    r.propertyValue = propertyValues
  }
  return r
}
