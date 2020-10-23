'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports._PathVariableDo = exports.PathVariable = void 0;
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-22 18:15
* Desc:
*/
require("reflect-metadata");
const febs = require("febs-browser");
const _PathVariableMetadataKey = Symbol('_PathVariableMetadataKey');
/**
 * @desc 用于映射请求路径中的参数.
 *
 * @example
 *
 *       // url: /contacts/xxx
 *
 *       ﹫RequestMapping({path: "/contacts/{contactname}"})
 *       foo(﹫PathVariable("contactname") contactname: string) {
 *           ...
 *       }
 * @returns {ParameterDecorator}
 */
function PathVariable(cfg) {
    if (febs.string.isEmpty(cfg.name)) {
        throw new febs.exception('@RequestParam need \'name\' parameter', febs.exception.ERROR, __filename, __line, __column);
    }
    cfg.required = febs.utils.isNull(cfg.required) ? true : cfg.required;
    return (target, propertyKey, parameterIndex) => {
        let existingParameters = Reflect.getOwnMetadata(_PathVariableMetadataKey, target, propertyKey) || [];
        existingParameters.push({
            name: cfg.name,
            required: cfg.required,
            parameterIndex
        });
        Reflect.defineMetadata(_PathVariableMetadataKey, existingParameters, target, propertyKey);
    };
}
exports.PathVariable = PathVariable;
function _PathVariableDo(target, propertyKey, args, pathVariables) {
    let parameters = Reflect.getOwnMetadata(_PathVariableMetadataKey, target, propertyKey);
    if (parameters) {
        for (let parameter of parameters) {
            if (parameter.required) {
                if (parameter.parameterIndex >= args.length || febs.utils.isNull(args[parameter.parameterIndex])) {
                    throw new Error("@PathVariable Missing required argument.");
                }
            }
            if (!pathVariables.hasOwnProperty(parameter.name)) {
                throw new febs.exception(`@PathVariable parameter '${parameter.name}' cannot be finded`, febs.exception.ERROR, __filename, __line, __column);
            }
            pathVariables[parameter.name] = args[parameter.parameterIndex];
        } // for.
    } // if.
    return true;
}
exports._PathVariableDo = _PathVariableDo;
//# sourceMappingURL=PathVariable.js.map