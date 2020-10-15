'use strict';

/**
* Copyright (c) 2019 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2019-09-12 15:41
* Desc: 如果进行了代码压缩, 获取的类名参数名将是压缩后的名称.
*/

export default {
  getClassName,
  getParameterName,
}

/**
* @desc: 获得类名.
*/
function getClassName(obj: any) {
  if (obj && obj.constructor && obj.constructor.toString()) {
    /*
     * for browsers which have name property in the constructor
     * of the object,such as chrome 
     */
    if (obj.constructor.name) {
      return obj.constructor.name;
    }
    var str = obj.constructor.toString();
    /*
     * executed if the return of object.constructor.toString() is 
     * "[object objectClass]"
     */
    if (str.charAt(0) == '[') {
      var arr = str.match(/\[\w+\s*(\w+)\]/);
    } else {
      /*
       * executed if the return of object.constructor.toString() is 
       * "function objectClass () {}"
       * for IE Firefox
       */
      var arr = str.match(/function\s*(\w+)/);
    }
    if (arr && arr.length == 2) {
      return arr[1];
    }
  }
  return undefined;
};

/**
* @desc: 获得参数名称列表.
*/
function getParameterName(fn:Function):string[] {
  try {
    if(typeof fn !== 'object' && typeof fn !== 'function' ) return;
    const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    const DEFAULT_PARAMS = /=[^,)]+/mg;
    const FAT_ARROWS = /=>.*$/mg;
    let code = fn.prototype ? fn.prototype.constructor.toString() : fn.toString();
    code = code
        .replace(COMMENTS, '')
        .replace(FAT_ARROWS, '')
        .replace(DEFAULT_PARAMS, '');
    let result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g);
    return result === null ? [] :result;
  }
  catch (e) {
    return [];
  }
}