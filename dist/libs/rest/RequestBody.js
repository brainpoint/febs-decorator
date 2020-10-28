'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports._RequestBodyDo = exports.RequestBody = void 0;
require("reflect-metadata");
const febs = require("febs-browser");
var qs = require('../utils/qs/dist');
const _RequestBodyMetadataKey = Symbol('_RequestBodyMetadataKey');
function RequestBody(cfg) {
    cfg.required = febs.utils.isNull(cfg.required) ? true : cfg.required;
    return (target, propertyKey, parameterIndex) => {
        if (Reflect.hasOwnMetadata(_RequestBodyMetadataKey, target, propertyKey)) {
            throw new febs.exception('@RequestBody must only one', febs.exception.ERROR, __filename, __line, __column);
        }
        Reflect.defineMetadata(_RequestBodyMetadataKey, {
            required: cfg.required,
            stringifyCallback: cfg.stringifyCallback,
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
    if (typeof parameter.stringifyCallback === 'function') {
        paramStr = parameter.stringifyCallback(argVal);
    }
    else if (t === 'string') {
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
        }
        if (isJson) {
            paramStr = JSON.stringify(argVal);
        }
        else {
            paramStr = qs.stringify(argVal);
        }
    }
    if (febs.string.isEmpty(paramStr)) {
        return;
    }
    if (requestMapping.method === 'GET') {
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
    }
}
exports._RequestBodyDo = _RequestBodyDo;
//# sourceMappingURL=RequestBody.js.map