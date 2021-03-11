// Type definitions for febs-decorator

/// <reference types="node" />

import { BigNumber } from "febs-browser";

/**
 * 判断值是否为false或'false'
 *
 * 验证后属性值将转换为boolean
 *
 * @param cfg
 */
export function AssertFalse(cfg?: {
  message?: string
}): PropertyDecorator
export function AssertFalse(target: Object, propertyKey: string | symbol): void

export namespace AssertFalse {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}

/**
 * 判断值是否为true或'true'
 *
 * 验证后属性值将转换为boolean
 *
 * @param cfg
 */
export function AssertTrue(cfg?: {
  message?: string
}): PropertyDecorator
export function AssertTrue(target: Object, propertyKey: string | symbol): void

export namespace AssertTrue {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}

/**
 * @desc 指定参数值必须小于等于指定的值.
 *
 * 验证后属性值如果使用number可以表示将转换为number, 否则将保留原样
 *
 * @returns {PropertyDecorator}
 */
export function DecimalMax(cfg: {
  value: number | BigNumber | string
  message?: string
}): PropertyDecorator;

export namespace DecimalMax {
  function List(cfg: {
    listMaxLength?: number
    value: number | BigNumber | string
    message?: string
  }): PropertyDecorator;
}

/**
 * @desc 指定参数值必须大于等于指定的值.
 *
 * 验证后属性值如果使用number可以表示将转换为number, 否则将保留原样
 *
 * @returns {PropertyDecorator}
 */
export function DecimalMin(cfg: {
  value: number | BigNumber | string
  message?: string
}): PropertyDecorator;

export namespace DecimalMin {
  function List(cfg: {
    listMaxLength?: number
    value: number | BigNumber | string
    message?: string
  }): PropertyDecorator;
}


/**
 * @desc 指定参数必须是email或指定的正则表达式.
 * @returns {PropertyDecorator}
 */
export function Email(cfg?: {
  regexp?: RegExp
  message?: string
}): PropertyDecorator
export function Email(target: Object, propertyKey: string | symbol): void
export namespace Email {
  function List(cfg?: {
    listMaxLength?: number
    regexp?: RegExp
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}

/**
 * @desc 验证参数是否配置允许的值之一.
 * @returns {PropertyDecorator}
 */
export function Enum(cfg: { allows: any[]; message?: string }): PropertyDecorator
export namespace Enum {
  function List(cfg: {
    listMaxLength?: number,
    allows: any[],
    message?: string
  }): PropertyDecorator
}

/**
 * @desc 指定参数必须是将来时间.
 *
 * 时间可以是 Date或是 形如 '2009-06-15T08:00:00.000Z' 的ISO时间字符串
 *
 * 验证后属性值将转换为Date
 *
 * @returns {PropertyDecorator}
 */
export function Future(cfg?: {
  message?: string
}): PropertyDecorator
export function Future(target: Object, propertyKey: string | symbol): void;
export namespace Future {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}


/**
 * @desc 指定参数必须是将来或当前时间.
 *
 * 时间可以是 Date或是 形如 '2009-06-15T08:00:00.000Z' 的ISO时间字符串
 *
 * 验证后属性值将转换为Date
 *
 *
 * @returns {PropertyDecorator}
 */
export function FutureOrPresent(cfg?: {
  message?: string
}): PropertyDecorator
export function FutureOrPresent(
  target: Object,
  propertyKey: string | symbol
): void
export namespace FutureOrPresent {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}

/**
 * @desc 指定参数必须是过去时间.
 *
 * 时间可以是 Date或是 形如 '2009-06-15T08:00:00.000Z' 的ISO时间字符串
 *
 * 验证后属性值将转换为Date
 *
 *
 * @returns {PropertyDecorator}
 */
export function Past(cfg?: {
  message?: string
}): PropertyDecorator
export function Past(
  target: Object,
  propertyKey: string | symbol
): void
export namespace Past {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}

/**
 * @desc 指定参数必须是过去或当前时间.
 *
 * 时间可以是 Date或是 形如 '2009-06-15T08:00:00.000Z' 的ISO时间字符串
 *
 * 验证后属性值将转换为Date
 *
 *
 * @returns {PropertyDecorator}
 */
export function PastOrPresent(cfg?: {
  message?: string
}): PropertyDecorator
export function PastOrPresent(
  target: Object,
  propertyKey: string | symbol
): void
export namespace PastOrPresent {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}

/**
 * @desc 指定参数值必须小于等于指定的值.
 *
 * 验证后属性值如果使用number可以表示将转换为number, 否则将保留原样
 *
 * @returns {PropertyDecorator}
 */
export function Max(cfg: {
  value: number | BigNumber | string
  message?: string
}): PropertyDecorator
export namespace Max {
  function List(cfg?: {
    listMaxLength?: number
    value: number | BigNumber | string
    message?: string
  }): PropertyDecorator
}

/**
 * @desc 指定参数值必须大于等于指定的值.
 *
 * 验证后属性值如果使用number可以表示将转换为number, 否则将保留原样
 *
 * @returns {PropertyDecorator}
 */
export function Min(cfg: {
  value: number | BigNumber | string
  message?: string
}): PropertyDecorator
export namespace Min {
  function List(cfg?: {
    listMaxLength?: number
    value: number | BigNumber | string
    message?: string
  }): PropertyDecorator
}

/**
 * @desc 指定参数值必须是负数
 *
 * 验证后属性值如果使用number可以表示将转换为number, 否则将保留原样
 *
 * @returns {PropertyDecorator}
 */
export function Negative(cfg?: {
  message?: string
}): PropertyDecorator
export function Negative(target: Object, propertyKey: string | symbol): void
export namespace Negative {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}

/**
 * @desc 指定参数值必须是负数或0
 *
 * 验证后属性值如果使用number可以表示将转换为number, 否则将保留原样
 *
 * @returns {PropertyDecorator}
 */
export function NegativeOrZero(cfg?: {
  message?: string
}): PropertyDecorator
export function NegativeOrZero(target: Object, propertyKey: string | symbol): void
export namespace NegativeOrZero {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}


/**
 * @desc 指定参数值必须是正数
 *
 * 验证后属性值如果使用number可以表示将转换为number, 否则将保留原样
 *
 * @returns {PropertyDecorator}
 */
export function Positive(cfg?: {
  message?: string
}): PropertyDecorator
export function Positive(target: Object, propertyKey: string | symbol): void
export namespace Positive {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}

/**
 * @desc 指定参数值必须是正数或0
 *
 * 验证后属性值如果使用number可以表示将转换为number, 否则将保留原样
 *
 * @returns {PropertyDecorator}
 */
export function PositiveOrZero(cfg?: {
  message?: string
}): PropertyDecorator
export function PositiveOrZero(target: Object, propertyKey: string | symbol): void
export namespace PositiveOrZero {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}


/**
* @desc: 指定参数必须至少包含一个非空字符串; trim操作后长度>0
*/
export function NotBlank(cfg?: {
  message?: string
}): PropertyDecorator
export function NotBlank(target: Object, propertyKey: string | symbol): void
export namespace NotBlank {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}

/**
* @desc: 指定参数不能为 null、undefined且长度大于0<br> (o.size() > 0 或 o.length > 0)
*/
export function NotEmpty(cfg?: {
  message?: string
}): PropertyDecorator
export function NotEmpty(target: Object, propertyKey: string | symbol): void
export namespace NotEmpty {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}

/**
* @desc: 指定参数不能为 null 或 undefined.
*/
export function NotNull(cfg?: {
  message?: string
}): PropertyDecorator
export function NotNull(target: Object, propertyKey: string | symbol): void
export namespace NotNull {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}


/**
* @desc: 指定参数必须为 null 或 undefined.
*/
export function Null(cfg?: {
  message?: string
}): PropertyDecorator
export function Null(target: Object, propertyKey: string | symbol): void
export namespace Null {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
  }): PropertyDecorator
  function List(target: Object, propertyKey: string | symbol): void
}


/**
 * @desc 指定参数必须是email或指定的正则表达式.
 * @returns {PropertyDecorator}
 */
export function Pattern(cfg: { regexp: RegExp; message?: string }): PropertyDecorator;
export namespace Pattern {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
    regexp: RegExp
  }): PropertyDecorator
}

/**
 * @desc 指定参数值必须在 [min, max] 范围内;
 * @returns {PropertyDecorator}
 */
export function Range(cfg: {
  min?: number /*=0*/
  max: number
  message?: string
}): PropertyDecorator;
export namespace Range {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
    min?: number /*=0*/
    max: number
  }): PropertyDecorator
}

/**
 * @desc 指定参数(字符串,array)的长度的最大最小值 (o.size() 或 o.length) .
 * @returns {PropertyDecorator}
 */
export function Size(cfg?: { max?: number; min?: number; message?: string }): PropertyDecorator;
export namespace Size {
  function List(cfg?: {
    listMaxLength?: number
    message?: string
    max?: number;
    min?: number
  }): PropertyDecorator
}

/**
 * 类型限定.
 */
export namespace Type {
  /**
   * @desc: 判断是否是true,false,'true', 'false', 0, 1 之一;
   *
   * 验证后属性值将转为boolean
   *
   * @return:
   */
  function Boolean(cfg?: { message?: string }): PropertyDecorator
  function Boolean(target: Object, propertyKey: string | symbol): void
  namespace Boolean {
    function List(cfg?: {
      listMaxLength?: number
      message?: string
    }): PropertyDecorator
    function List(target: Object, propertyKey: string | symbol): void
  }
  
  /**
   * @desc: 判断是否是Number 或可以转换为Number的字符串;
   *
   * 验证后属性值将转为number
   *
   * @return:
   */
  function Number(cfg?: { message?: string }): PropertyDecorator
  function Number(target: Object, propertyKey: string | symbol): void
  namespace Number {
    function List(cfg?: {
      listMaxLength?: number
      message?: string
    }): PropertyDecorator
    function List(target: Object, propertyKey: string | symbol): void
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
  namespace Integer {
    function List(cfg?: {
      listMaxLength?: number
      message?: string
    }): PropertyDecorator
    function List(target: Object, propertyKey: string | symbol): void
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
  namespace BigInt {
    function List(cfg?: {
      listMaxLength?: number
      message?: string
    }): PropertyDecorator
    function List(target: Object, propertyKey: string | symbol): void
  }
  
  /**
   * @desc: 判断是否是字符串
   *
   * 验证后属性值将保留原样
   *
   * @return:
   */
  function String(cfg?: { message?: string }): PropertyDecorator
  function String(target: Object, propertyKey: string | symbol): void
  namespace String {
    function List(cfg?: {
      listMaxLength?: number
      message?: string
    }): PropertyDecorator
    function List(target: Object, propertyKey: string | symbol): void
  }

  /**
   * @desc: 判断是否是Date或形如 2009-06-15T08:00:00.000Z 的ISO时间字符串.
   *
   * 验证后属性值将转换为Date
   *
   * @return:
   */
  function Date(cfg?: { message?: string }): PropertyDecorator
  function Date(target: Object, propertyKey: string | symbol): void
  namespace Date {
    function List(cfg?: {
      listMaxLength?: number
      message?: string
    }): PropertyDecorator
    function List(target: Object, propertyKey: string | symbol): void
  }

  /**
   * @desc: 判断是否是Object
   *
   * 验证后属性值将保持原样.
   *
   * @return:
   */
  function Object(cfg?: { message?: string }): PropertyDecorator
  function Object(target: Object, propertyKey: string | symbol): void
  namespace Object {
    function List(cfg?: {
      listMaxLength?: number
      message?: string
    }): PropertyDecorator
    function List(target: Object, propertyKey: string | symbol): void
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
  function Array(cfg?: {
    /** 明确返回false表明数据错误 */
    checkCB?: (elem: any, index?: number, allElem?: Array<any>) => boolean
    message?: string
  }): PropertyDecorator
  function Array(target: Object, propertyKey: string | symbol): void
  namespace Array {
    function List(cfg?: {
      /** 明确返回false表明数据错误 */
      checkCB?: (elem: any, index?: number, allElem?: Array<any>) => boolean
      listMaxLength?: number
      message?: string
    }): PropertyDecorator
    function List(target: Object, propertyKey: string | symbol): void
  }

  /**
   * @desc: 判断是否是指定的枚举类型
   *
   * @param cfg 可以传递checkCB(elem:any, index:number)=>boolean 对每个元素的类型进行判断.
   *
   * @return:
   */
  function Enum(cfg: {
    /** 要验证的枚举类型 */
    enumType: any,
    /** 明确返回false表明数据错误 */
    checkCB?: (elem: any) => boolean
    message?: string
  }): PropertyDecorator
  namespace Enum {
    function List(cfg: {
      /** 要验证的枚举类型 */
      enumType: any,
      /** 明确返回false表明数据错误 */
      checkCB?: (elem: any) => boolean
      listMaxLength?: number
      message?: string
    }): PropertyDecorator
  }

  /**
   * @desc: 使用具体的验证方法验证数据.
   *
   * @param cfg 可以传递checkCB(elem:any)=>boolean 对数据进行判断.
   *
   * @return:
   */
  function Validator(cfg: {
    /** 明确返回false表明数据错误 */
    checkCB: (elem: any) => boolean
    message?: string
  }): PropertyDecorator


}
