'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2020-10-13 16:15
 * Desc:
 */

import * as febs from 'febs-browser'
import {
  MetadataKey_TypeArray,
  MetadataKey_TypeArrayList,
  MetadataKey_TypeBigInt,
  MetadataKey_TypeBigIntList,
  MetadataKey_TypeBool,
  MetadataKey_TypeBoolList,
  MetadataKey_TypeDate,
  MetadataKey_TypeDateList,
  MetadataKey_TypeInteger,
  MetadataKey_TypeIntegerList,
  MetadataKey_TypeNumber,
  MetadataKey_TypeNumberList,
  MetadataKey_TypeObject,
  MetadataKey_TypeObjectList,
  MetadataKey_TypeString,
  MetadataKey_TypeStringList,
  _validate_set_property_matedata,
  _validate_set_property_matedata_list,
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
}

/**
 * @desc: boolean
 */
function validateBoolean(
  param: any,
  decoratorData: any
): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }
  if (param === 'false' || param === 'true') {
    return { v: param === 'false' ? false : true }
  }
  if (param !== false && param !== true && param !== 1 && param !== 0) {
    return { r: false }
  }
  return { v: !!param }
}
function BooleanList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function BooleanList(target: Object, propertyKey: string | symbol): void
function BooleanList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata_list(
        MetadataKey_TypeBoolList,
        target,
        propertyKey,
        validateBoolean,
        {
          listMaxLength: cfg.listMaxLength,
          message: cfg.message,
        }
      )
    }
  } else {
    _validate_set_property_matedata_list(
      MetadataKey_TypeBoolList,
      args[0],
      args[1],
      validateBoolean,
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
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata(
        MetadataKey_TypeBool,
        target,
        propertyKey,
        validateBoolean,
        { message: args[0] ? args[0].message : undefined }
      )
    }
  } else {
    _validate_set_property_matedata(
      MetadataKey_TypeBool,
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
  param: any,
  decoratorData: any
): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }
  if (typeof param === 'number') {
    return { v: param }
  }

  if (Array.isArray(param)) {
    return { r: false }
  }
  param = Number(param)
  if (Number.isNaN(param)) {
    return { r: false }
  }
  return { v: param }
}
function NumberList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function NumberList(target: Object, propertyKey: string | symbol): void
function NumberList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata_list(
        MetadataKey_TypeNumberList,
        target,
        propertyKey,
        validateNumber,
        {
          listMaxLength: cfg.listMaxLength,
          message: cfg.message,
        }
      )
    }
  } else {
    _validate_set_property_matedata_list(
      MetadataKey_TypeNumberList,
      args[0],
      args[1],
      validateNumber,
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
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata(
        MetadataKey_TypeNumber,
        target,
        propertyKey,
        validateNumber,
        { message: args[0] ? args[0].message : undefined }
      )
    }
  } else {
    _validate_set_property_matedata(
      MetadataKey_TypeNumber,
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
  param: any,
  decoratorData: any
): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }
  if (Array.isArray(param)) {
    return { r: false }
  }
  param = Number(param)
  if (Number.isInteger(param)) {
    return { v: param }
  }

  return { r: false }
}
function IntegerList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function IntegerList(target: Object, propertyKey: string | symbol): void
function IntegerList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata_list(
        MetadataKey_TypeIntegerList,
        target,
        propertyKey,
        validateInteger,
        {
          listMaxLength: cfg.listMaxLength,
          message: cfg.message,
        }
      )
    }
  } else {
    _validate_set_property_matedata_list(
      MetadataKey_TypeIntegerList,
      args[0],
      args[1],
      validateInteger,
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
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata(
        MetadataKey_TypeInteger,
        target,
        propertyKey,
        validateInteger,
        { message: args[0] ? args[0].message : undefined }
      )
    }
  } else {
    _validate_set_property_matedata(
      MetadataKey_TypeInteger,
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
  param: any,
  decoratorData: any
): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }
  if (!febs.utils.bigint_check(param)) {
    return { r: false }
  }

  return { v: param }
}
function BigIntList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function BigIntList(target: Object, propertyKey: string | symbol): void
function BigIntList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata_list(
        MetadataKey_TypeBigIntList,
        target,
        propertyKey,
        validateBigInt,
        {
          listMaxLength: cfg.listMaxLength,
          message: cfg.message,
        }
      )
    }
  } else {
    _validate_set_property_matedata_list(
      MetadataKey_TypeBigIntList,
      args[0],
      args[1],
      validateBigInt,
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
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata(
        MetadataKey_TypeBigInt,
        target,
        propertyKey,
        validateBigInt,
        { message: args[0] ? args[0].message : undefined }
      )
    }
  } else {
    _validate_set_property_matedata(
      MetadataKey_TypeBigInt,
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
  param: any,
  decoratorData: any
): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }
  if (typeof param !== 'string') {
    return { r: false }
  }
  return { v: param }
}
function StringList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function StringList(target: Object, propertyKey: string | symbol): void
function StringList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata_list(
        MetadataKey_TypeStringList,
        target,
        propertyKey,
        validateString,
        {
          listMaxLength: cfg.listMaxLength,
          message: cfg.message,
        }
      )
    }
  } else {
    _validate_set_property_matedata_list(
      MetadataKey_TypeStringList,
      args[0],
      args[1],
      validateString,
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
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata(
        MetadataKey_TypeString,
        target,
        propertyKey,
        validateString,
        { message: args[0] ? args[0].message : undefined }
      )
    }
  } else {
    _validate_set_property_matedata(
      MetadataKey_TypeString,
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
  param: any,
  decoratorData: any
): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }
  if (typeof param === 'string') {
    param = new Date(param)
  }

  if (!febs.date.isValidate(param)) {
    return { r: false }
  }

  return { v: param }
}
function DateList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function DateList(target: Object, propertyKey: string | symbol): void
function DateList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata_list(
        MetadataKey_TypeDateList,
        target,
        propertyKey,
        validateDate,
        {
          listMaxLength: cfg.listMaxLength,
          message: cfg.message,
        }
      )
    }
  } else {
    _validate_set_property_matedata_list(
      MetadataKey_TypeDateList,
      args[0],
      args[1],
      validateDate,
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
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata(
        MetadataKey_TypeDate,
        target,
        propertyKey,
        validateDate,
        { message: args[0] ? args[0].message : undefined }
      )
    }
  } else {
    _validate_set_property_matedata(
      MetadataKey_TypeDate,
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
  param: any,
  decoratorData: any
): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }
  if (Array.isArray(param)) {
    return { r: false }
  }
  if (typeof param === 'object') {
    return { v: param }
  }

  return { r: false }
}
function ObjectList(cfg?: {
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function ObjectList(target: Object, propertyKey: string | symbol): void
function ObjectList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata_list(
        MetadataKey_TypeObjectList,
        target,
        propertyKey,
        validateObject,
        {
          listMaxLength: cfg.listMaxLength,
          message: cfg.message,
        }
      )
    }
  } else {
    _validate_set_property_matedata_list(
      MetadataKey_TypeObjectList,
      args[0],
      args[1],
      validateObject,
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
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata(
        MetadataKey_TypeObject,
        target,
        propertyKey,
        validateObject,
        { message: args[0] ? args[0].message : undefined }
      )
    }
  } else {
    _validate_set_property_matedata(
      MetadataKey_TypeObject,
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
  param: any,
  decoratorData: any
): { r?: boolean; v?: any } {
  if (febs.utils.isNull(param)) {
    return { v: param }
  }
  if (Array.isArray(param)) {
    if (typeof decoratorData.checkCB === 'function') {
      for (let i = 0; i < param.length; i++) {
        if (!decoratorData.checkCB(param[i], i)) {
          return { r: false }
        }
      }
    }

    return { v: param }
  }

  return { r: false }
}
function ArrayList(cfg?: {
  checkCB?: (elem: any, index?: number) => boolean
  listMaxLength?: number
  message?: string
}): PropertyDecorator
function ArrayList(target: Object, propertyKey: string | symbol): void
function ArrayList(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    let cfg: any = args[0] || {}
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata_list(
        MetadataKey_TypeArrayList,
        target,
        propertyKey,
        validateArray,
        {
          listMaxLength: cfg.listMaxLength,
          message: cfg.message,
          checkCB: cfg.checkCB,
        }
      )
    }
  } else {
    _validate_set_property_matedata_list(
      MetadataKey_TypeArrayList,
      args[0],
      args[1],
      validateArray,
      {}
    )
  }
}

/**
 * @desc: 判断是否是Array
 *
 * 验证后属性值将保持原样.
 *
 * @param cfg 可以传递checkCB(elem:any, index:number)=>boolean 对每个元素的类型进行判断.
 *
 * @return:
 */
function Arraya(cfg?: {
  checkCB?: (elem: any, index?: number) => boolean
  message?: string
}): PropertyDecorator
function Arraya(target: Object, propertyKey: string | symbol): void
function Arraya(...args: any[]) {
  if (args.length == 1 || args.length == 0) {
    return (target: Object, propertyKey: string | symbol) => {
      _validate_set_property_matedata(
        MetadataKey_TypeArray,
        target,
        propertyKey,
        validateArray,
        {
          message: args[0] ? args[0].message : undefined,
          checkCB: args[0] ? args[0].checkCB : undefined,
        }
      )
    }
  } else {
    _validate_set_property_matedata(
      MetadataKey_TypeArray,
      args[0],
      args[1],
      validateArray,
      {}
    )
  }
}
Arraya.List = ArrayList
