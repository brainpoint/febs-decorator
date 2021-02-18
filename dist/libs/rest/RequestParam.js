'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports._RequestParamDo = exports.RequestParam = void 0;
require("reflect-metadata");
const febs = require("febs-browser");
const RequestMapping_1 = require("./RequestMapping");
var queryString = require('../utils/qs/dist');
const _RequestParamMetadataKey = Symbol('_RequestParamMetadataKey');
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
            castType: cfg.castType,
            parameterIndex,
        });
        Reflect.defineMetadata(_RequestParamMetadataKey, existingParameters, target, propertyKey);
        RequestMapping_1._RequestMappingPushParams(target, propertyKey, {
            name: cfg.name,
            required: cfg.required,
            defaultValue: cfg.defaultValue,
            castType: cfg.castType,
            parameterIndex,
            type: 'rp'
        });
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
            qs += queryString.stringify(obj);
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
        }
    }
}
exports._RequestParamDo = _RequestParamDo;
//# sourceMappingURL=RequestParam.js.map