'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports._RequestParamDo = exports.RequestParam = void 0;
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-22 18:15
* Desc:
*/
require("reflect-metadata");
const febs = require("febs-browser");
const qs_1 = require("qs");
const _RequestParamMetadataKey = Symbol('_RequestParamMetadataKey');
/**
 * @desc 用于映射请求中的查询参数.
 *
 *
 * @example
 *
 *       // url: /contacts?contactname=xxx
 *
 *       ﹫RequestMapping({path: "/contacts"})
 *       foo(﹫RequestParam("contactname") contactname: string) {
 *           ...
 *       }
 * @returns {ParameterDecorator}
 */
function RequestParam(cfg) {
    if (febs.string.isEmpty(cfg.name)) {
        throw new febs.exception('@RequestParam need \'name\' parameter', febs.exception.ERROR, __filename, __line, __column);
    }
    cfg.required = febs.utils.isNull(cfg.required) ? true : cfg.required;
    return (target, propertyKey, parameterIndex) => {
        let existingParameters = Reflect.getOwnMetadata(_RequestParamMetadataKey, target, propertyKey) || [];
        existingParameters.push({
            name: cfg.name,
            required: cfg.required,
            defaultValue: cfg.defaultValue,
            parameterIndex,
        });
        Reflect.defineMetadata(_RequestParamMetadataKey, existingParameters, target, propertyKey);
    };
}
exports.RequestParam = RequestParam;
function _RequestParamDo(target, propertyKey, args, requestMapping) {
    let parameters = Reflect.getOwnMetadata(_RequestParamMetadataKey, target, propertyKey);
    if (parameters) {
        let qs = '';
        for (let parameter of parameters) {
            let val = args[parameter.parameterIndex];
            if (parameter.required) {
                if (parameter.parameterIndex >= args.length || febs.utils.isNull(val)) {
                    if (!parameter.defaultValue) {
                        throw new Error("@RequestParam Missing required argument.");
                    }
                }
            }
            if (febs.utils.isNull(val)) {
                val = parameter.defaultValue;
            }
            let obj = {};
            obj[parameter.name] = val;
            qs += qs_1.default.stringify(obj);
            // append qs
            for (const key in requestMapping.path) {
                let p = requestMapping.path[key];
                let i = p.indexOf('?');
                if (i == p.length - 1) {
                    p += qs;
                }
                else if (i < 0) {
                    p += '?' + qs;
                }
                else {
                    p += '&' + qs;
                }
                requestMapping.path[key] = p;
            }
        } // for.
    } // if.
}
exports._RequestParamDo = _RequestParamDo;
//# sourceMappingURL=RequestParam.js.map