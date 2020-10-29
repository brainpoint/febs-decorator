'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports._RestObjectDo = exports.RestObject = void 0;
require("reflect-metadata");
const febs = require("febs-browser");
const RequestMapping_1 = require("./RequestMapping");
const _RestObjectMetadataKey = Symbol('_RestObjectMetadataKey');
function RestObject(...args) {
    if (args.length == 3) {
        let target = args[0];
        let propertyKey = args[1];
        let parameterIndex = args[2];
        if (Reflect.hasOwnMetadata(_RestObjectMetadataKey, target, propertyKey)) {
            throw new febs.exception('@RestObject must only one', febs.exception.ERROR, __filename, __line, __column);
        }
        Reflect.defineMetadata(_RestObjectMetadataKey, {
            parameterIndex,
        }, target, propertyKey);
        RequestMapping_1._RequestMappingPushParams(target, {
            parameterIndex,
            type: 'ro'
        });
    }
    else {
        return (target, propertyKey, parameterIndex) => {
            if (Reflect.hasOwnMetadata(_RestObjectMetadataKey, target, propertyKey)) {
                throw new febs.exception('@RestObject must only one', febs.exception.ERROR, __filename, __line, __column);
            }
            Reflect.defineMetadata(_RestObjectMetadataKey, {
                parameterIndex,
            }, target, propertyKey);
            RequestMapping_1._RequestMappingPushParams(target, {
                parameterIndex,
                type: 'ro'
            });
        };
    }
}
exports.RestObject = RestObject;
function _RestObjectDo(target, propertyKey, args) {
    let parameter = Reflect.getOwnMetadata(_RestObjectMetadataKey, target, propertyKey);
    if (!parameter) {
        return null;
    }
    return {
        parameterIndex: parameter.parameterIndex,
    };
}
exports._RestObjectDo = _RestObjectDo;
//# sourceMappingURL=RestObject.js.map