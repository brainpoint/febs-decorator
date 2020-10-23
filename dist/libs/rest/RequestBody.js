'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports._RequestBodyDo = exports.RequestBody = void 0;
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-22 18:15
* Desc:
*/
require("reflect-metadata");
const febs = require("febs-browser");
const qs_1 = require("qs");
const _RequestBodyMetadataKey = Symbol('_RequestBodyMetadataKey');
/**
 * @desc 用于映射请求中的content body.
 *
 *  将根据 {RequestMapping} 的请求header中的Content-Type来决定body的格式化.
 *
 *  - 如果参数类型为string, 则直接作为body, 不进行格式化
 *  - 如果参数类型为object, Content-Type:application/json, 将格式化为json.
 *  - 如果参数类型为object, Content-Type:application/x-www-form-urlencoded, 将格式化为querystring.
 *  - 如果请求类型为GET, 将格式化为querystring, 附加在url上.
 *
 * @returns {ParameterDecorator}
 */
function RequestBody(cfg) {
    cfg.required = febs.utils.isNull(cfg.required) ? true : cfg.required;
    return (target, propertyKey, parameterIndex) => {
        if (Reflect.hasOwnMetadata(_RequestBodyMetadataKey, target, propertyKey)) {
            throw new febs.exception('@RequestBody must only one', febs.exception.ERROR, __filename, __line, __column);
        }
        Reflect.defineMetadata(_RequestBodyMetadataKey, {
            required: cfg.required,
            parameterIndex,
        }, target, propertyKey);
    };
}
exports.RequestBody = RequestBody;
function _RequestBodyDo(target, propertyKey, args, requestMapping) {
    let parameter = Reflect.getOwnMetadata(_RequestBodyMetadataKey, target, propertyKey);
    if (!parameter) {
        return;
    }
    let argVal = args[parameter.parameterIndex];
    if (parameter.required) {
        if (parameter.parameterIndex >= args.length || febs.utils.isNull(argVal)) {
            throw new Error(`@RequestBody Missing required argument`);
        }
    }
    let paramStr;
    let t = typeof argVal;
    if (t === 'string') {
        paramStr = argVal;
    }
    else if (t === 'boolean' || t === 'number' || t === 'bigint') {
        paramStr = argVal.toString();
    }
    else {
        let isJson = false;
        if (requestMapping.method === 'GET') {
            isJson = false;
        }
        else if (requestMapping.headers) {
            for (let k in requestMapping.headers) {
                if (k.toLowerCase() === 'content-type') {
                    let v = requestMapping.headers[k];
                    if (v && v.indexOf('application/json') >= 0) {
                        isJson = true;
                    }
                    break;
                }
            }
        } // if..else.
        if (isJson) {
            paramStr = JSON.stringify(argVal);
        }
        else {
            paramStr = qs_1.default.stringify(argVal);
        }
    } // if..else.
    //
    // set to requestMapping.
    if (requestMapping.method === 'GET') {
        // append qs
        for (const key in requestMapping.path) {
            let p = requestMapping.path[key];
            let i = p.indexOf('?');
            if (i == p.length - 1) {
                p += paramStr;
            }
            else if (i < 0) {
                p += '?' + paramStr;
            }
            else {
                p += '&' + paramStr;
            }
            requestMapping.path[key] = p;
        }
    }
    else {
        requestMapping.body = paramStr;
    } // if..else.
}
exports._RequestBodyDo = _RequestBodyDo;
//# sourceMappingURL=RequestBody.js.map