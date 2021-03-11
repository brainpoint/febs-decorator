'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */

import * as febs from 'febs-browser'
import {
  verifyPropertyList,
  doPropertyDecorator,
  getPropertyDecorator,

} from './validatorUtils'

export const Type = {
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
}

/**
 * @desc: boolean
 */
function validateBoolean(
  propertyValue: any,
  decoratorData: any
): { isValid?: boolean, propertyValue?: any } {
  if (febs.utils.isNull(propertyValue)) {
    return { propertyValue: propertyValue }
  }
  if (propertyValue === 'false' || propertyValue === 'true') {
    return { propertyValue: propertyValue === 'false' ? false : true }
  }
  if (propertyValue !== false && propertyValue !== true && propertyValue !== 1 && propertyValue !== 0) {
    return { isValid: false }
  }
  return { propertyValue: !!propertyValue }
}

function validateBoolean_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, validateBoolean);
}

function BooleanList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function BooleanList(target: Object, propertyKey: string | symbol): void
function BooleanList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(validateBoolean_list, cfg);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateBoolean_list,
      {}
    )
  }
}

/**
 * @desc: 判断是否是true,false,'true', 'false', 0, 1 之一;
 *
 * 验证后属性值将转为boolean
 *
 * @return:
 */
function Boolean(cfg?: { message?: string }): PropertyDecorator
function Boolean(target: Object, propertyKey: string | symbol): void
function Boolean(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    return getPropertyDecorator(validateBoolean, args[0]);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateBoolean,
      {}
    )
  }
}
Boolean.List = BooleanList

/**
 * @desc: Number
 */
function validateNumber(
  propertyValue: any,
  decoratorData: any
): { isValid?: boolean, propertyValue?: any } {
  if (febs.utils.isNull(propertyValue)) {
    return { propertyValue: propertyValue }
  }
  if (typeof propertyValue === 'number') {
    return { propertyValue: propertyValue }
  }

  if (Array.isArray(propertyValue)) {
    return { isValid: false }
  }
  propertyValue = Number(propertyValue)
  if (Number.isNaN(propertyValue)) {
    return { isValid: false }
  }
  return { propertyValue: propertyValue }
}


function validateNumber_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, validateNumber);
}

function NumberList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function NumberList(target: Object, propertyKey: string | symbol): void
function NumberList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(validateNumber_list, cfg);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateNumber_list,
      {}
    )
  }
}

/**
 * @desc: 判断是否是Number 或可以转换为Number的字符串;
 *
 * 验证后属性值将转为number
 *
 * @return:
 */
function Numbera(cfg?: { message?: string }): PropertyDecorator
function Numbera(target: Object, propertyKey: string | symbol): void
function Numbera(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    return getPropertyDecorator(validateNumber, args[0]);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateNumber,
      {}
    )
  }
}
Numbera.List = NumberList

/**
 * @desc: Int
 */
function validateInteger(
  propertyValue: any,
  decoratorData: any
): { isValid?: boolean, propertyValue?: any } {
  if (febs.utils.isNull(propertyValue)) {
    return { propertyValue: propertyValue }
  }
  if (Array.isArray(propertyValue)) {
    return { isValid: false }
  }
  propertyValue = Number(propertyValue)
  if (Number.isInteger(propertyValue)) {
    return { propertyValue: propertyValue }
  }

  return { isValid: false }
}

function validateInteger_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, validateInteger);
}
function IntegerList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function IntegerList(target: Object, propertyKey: string | symbol): void
function IntegerList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(validateInteger_list, cfg);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateInteger_list,
      {}
    )
  }
}

/**
 * @desc: 判断是否是integer或可以转换为integer的字符串;
 *
 * 验证后属性值将转为number
 *
 * @return:
 */
function Integer(cfg?: { message?: string }): PropertyDecorator
function Integer(target: Object, propertyKey: string | symbol): void
function Integer(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    return getPropertyDecorator(validateInteger, args[0]);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateInteger,
      {}
    )
  }
}
Integer.List = IntegerList

/**
 * @desc: BigInt
 */
function validateBigInt(
  propertyValue: any,
  decoratorData: any
): { isValid?: boolean, propertyValue?: any } {
  if (febs.utils.isNull(propertyValue)) {
    return { propertyValue: propertyValue }
  }
  if (!febs.utils.bigint_check(propertyValue)) {
    return { isValid: false }
  }

  return { propertyValue: propertyValue }
}

function validateBigInt_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, validateBigInt);
}
function BigIntList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function BigIntList(target: Object, propertyKey: string | symbol): void
function BigIntList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(validateBigInt_list, cfg);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateBigInt_list,
      {}
    )
  }
}

/**
 * @desc: 判断是否是integer, Bigint或可以转换为Bigint的字符串;
 *
 * 验证后属性值将保留原样.
 *
 * @return:
 */
function BigInt(cfg?: { message?: string }): PropertyDecorator
function BigInt(target: Object, propertyKey: string | symbol): void
function BigInt(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    return getPropertyDecorator(validateBigInt, args[0]);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateBigInt,
      {}
    )
  }
}
BigInt.List = BigIntList

/**
 * @desc: String
 */
function validateString(
  propertyValue: any,
  decoratorData: any
): { isValid?: boolean, propertyValue?: any } {
  if (febs.utils.isNull(propertyValue)) {
    return { propertyValue: propertyValue }
  }
  if (typeof propertyValue !== 'string') {
    return { isValid: false }
  }
  return { propertyValue: propertyValue }
}

function validateString_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, validateString);
}
function StringList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function StringList(target: Object, propertyKey: string | symbol): void
function StringList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(validateString_list, cfg);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateString_list,
      {}
    )
  }
}

/**
 * @desc: 判断是否是字符串
 *
 * 验证后属性值将保留原样
 *
 * @return:
 */
function Stringa(cfg?: { message?: string }): PropertyDecorator
function Stringa(target: Object, propertyKey: string | symbol): void
function Stringa(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(validateString, cfg);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateString,
      {}
    )
  }
}
Stringa.List = StringList

/**
 * @desc: Date
 */
function validateDate(
  propertyValue: any,
  decoratorData: any
): { isValid?: boolean, propertyValue?: any } {
  if (febs.utils.isNull(propertyValue)) {
    return { propertyValue: propertyValue }
  }
  let ty = typeof propertyValue;
  if (ty === 'string') {
    propertyValue = new Date(propertyValue)
  }
  else if (ty === 'number') {
    propertyValue = new Date(ty);
  }

  if (!febs.date.isValidate(propertyValue)) {
    return { isValid: false }
  }

  return { propertyValue: propertyValue }
}
function validateDate_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, validateDate);
}
function DateList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function DateList(target: Object, propertyKey: string | symbol): void
function DateList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(validateDate_list, cfg);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateDate_list,
      {}
    )
  }
}

/**
 * @desc: 判断是否是Date或形如 2009-06-15T08:00:00.000Z 的ISO时间字符串.
 *
 * 验证后属性值将转换为Date
 *
 * @return:
 */
function Datea(cfg?: { message?: string }): PropertyDecorator
function Datea(target: Object, propertyKey: string | symbol): void
function Datea(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(validateDate, cfg);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateDate,
      {}
    )
  }
}
Datea.List = DateList

/**
 * @desc: Object
 */
function validateObject(
  propertyValue: any,
  decoratorData: any
): { isValid?: boolean, propertyValue?: any } {
  if (febs.utils.isNull(propertyValue)) {
    return { propertyValue: propertyValue }
  }
  if (Array.isArray(propertyValue)) {
    return { isValid: false }
  }
  if (typeof propertyValue === 'object') {
    return { propertyValue: propertyValue }
  }

  return { isValid: false }
}

function validateObject_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, validateObject);
}
function ObjectList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function ObjectList(target: Object, propertyKey: string | symbol): void
function ObjectList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(validateObject_list, cfg);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateObject_list,
      {}
    )
  }
}

/**
 * @desc: 判断是否是Object
 *
 * 验证后属性值将保持原样.
 *
 * @return:
 */
function Objecta(cfg?: { message?: string }): PropertyDecorator
function Objecta(target: Object, propertyKey: string | symbol): void
function Objecta(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(validateObject, cfg);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateObject,
      {}
    )
  }
}
Objecta.List = ObjectList

/**
 * @desc: Array
 */
function validateArray(
  propertyValue: any,
  decoratorData: any
): { isValid?: boolean, propertyValue?: any } {
  if (febs.utils.isNull(propertyValue)) {
    return { propertyValue: propertyValue }
  }
  if (Array.isArray(propertyValue)) {
    if (typeof decoratorData.checkCB === 'function') {
      for (let i = 0; i < propertyValue.length; i++) {
        if (false === decoratorData.checkCB(propertyValue[i], i, propertyValue)) {
          return { isValid: false }
        }
      }
    }

    return { propertyValue: propertyValue }
  }

  return { isValid: false }
}

function validateArray_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, validateArray);
}
function ArrayList(cfg?: {
  checkCB?: (elem: any, index?: number, allElem?: Array<any>) => boolean
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function ArrayList(target: Object, propertyKey: string | symbol): void
function ArrayList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(validateArray_list, cfg);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateArray_list,
      {}
    )
  }
}

/**
 * @desc: 判断是否是Array
 *
 * 验证后属性值将保持原样.
 *
 * @param cfg 可以传递checkCB(elem:any, index:number, allElem?: Array<any>)=>boolean 对每个元素的类型进行判断.
 *
 * @return:
 */
function Arraya(cfg?: {
  checkCB?: (elem: any, index?: number, allElem?: Array<any>) => boolean
  message?: string
}): PropertyDecorator
function Arraya(target: Object, propertyKey: string | symbol): void
function Arraya(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return getPropertyDecorator(validateArray, cfg);
  } else {
    doPropertyDecorator(
      args[0],
      args[1],
      validateArray,
      {}
    )
  }
}
Arraya.List = ArrayList


/**
 * @desc: Enum
 */
function validateEnum(
  propertyValue: any,
  decoratorData: any
): { isValid?: boolean, propertyValue?: any } {
  if (febs.utils.isNull(propertyValue)) {
    return { propertyValue: propertyValue }
  }

  for (const key1 in decoratorData.enumType) {
    if (propertyValue === decoratorData.enumType[key1]) {
      if (typeof decoratorData.checkCB === 'function') {
        if (false === decoratorData.checkCB(propertyValue)) {
          return { isValid: false }
        }
      }
      return { propertyValue: propertyValue };
    }
  }

  return { isValid: false }
}

function validateEnum_list(propertyValue: any, decoratorData: any): { isValid?: boolean, propertyValue?: any } {
  return verifyPropertyList(propertyValue, decoratorData, validateEnum);
}
function EnumList(cfg: {
  /** 要验证的枚举类型 */
  enumType: any,
  checkCB?: (elem: any) => boolean
  listMaxLength?: number
  message?: string
}): PropertyDecorator {
  return getPropertyDecorator(validateEnum_list, cfg);
}

/**
 * @desc: 判断是否是指定的枚举类型
 *
 * @param cfg 可以传递checkCB(elem:any, index:number)=>boolean 对每个元素的类型进行判断.
 *
 * @return:
 */
function Enuma(cfg: {
  /** 要验证的枚举类型 */
  enumType: any,
  checkCB?: (elem: any) => boolean
  message?: string
}): PropertyDecorator {
  return getPropertyDecorator(validateEnum, cfg);
}
Enuma.List = EnumList

/**
 * @desc: Validator
 */
function validateValidator(
  propertyValue: any,
  decoratorData: any
): { isValid?: boolean, propertyValue?: any } {

  if (typeof decoratorData.checkCB === 'function') {
    if (false === decoratorData.checkCB(propertyValue)) {
      return { isValid: false }
    }
    return { propertyValue: propertyValue };
  }

  return { isValid: false }
}

/**
 * @desc: 使用具体的验证方法验证数据.
 *
 * @param cfg 可以传递checkCB(elem:any)=>boolean 对数据进行判断.
 *
 * @return:
 */
function Validator(cfg: {
  checkCB: (elem: any) => boolean
  message?: string
}): PropertyDecorator {
  return getPropertyDecorator(validateValidator, cfg);
}