'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports._ResponseBodyDo = exports.ResponseBody = void 0;
require("reflect-metadata");
const febs = require("febs-browser");
const _ResponseBodyMetadataKey = Symbol('_ResponseBodyMetadataKey');
function ResponseBody(...args) {
    if (args.length == 3) {
        let target = args[0];
        let propertyKey = args[1];
        let parameterIndex = args[2];
        if (Reflect.hasOwnMetadata(_ResponseBodyMetadataKey, target, propertyKey)) {
            throw new febs.exception('@ResponseBody must only one', febs.exception.ERROR, __filename, __line, __column);
        }
        Reflect.defineMetadata(_ResponseBodyMetadataKey, {
            type: null,
            parameterIndex,
        }, target, propertyKey);
    }
    else {
        let type = args[0];
        return (target, propertyKey, parameterIndex) => {
            if (Reflect.hasOwnMetadata(_ResponseBodyMetadataKey, target, propertyKey)) {
                throw new febs.exception('@ResponseBody must only one', febs.exception.ERROR, __filename, __line, __column);
            }
            Reflect.defineMetadata(_ResponseBodyMetadataKey, {
                type: type,
                parameterIndex,
            }, target, propertyKey);
        };
    }
}
exports.ResponseBody = ResponseBody;
function _ResponseBodyDo(target, propertyKey, args) {
    let parameter = Reflect.getOwnMetadata(_ResponseBodyMetadataKey, target, propertyKey);
    if (!parameter) {
        return null;
    }
    return {
        parameterIndex: parameter.parameterIndex,
        type: parameter.type,
    };
}
exports._ResponseBodyDo = _ResponseBodyDo;
//# sourceMappingURL=ResponseBody.js.map