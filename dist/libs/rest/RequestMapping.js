'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports._RequestMappingPushParams = exports._GetRequestMappingParams = exports.RequestMapping = exports.DeleteMapping = exports.GetMapping = exports.PatchMapping = exports.PutMapping = exports.PostMapping = exports.RequestMethod = void 0;
require("reflect-metadata");
const febs = require("febs-browser");
const PathVariable_1 = require("./PathVariable");
const FeignClient_1 = require("./FeignClient");
const RequestBody_1 = require("./RequestBody");
const RequestParam_1 = require("./RequestParam");
const RestObject_1 = require("./RestObject");
const RestController_1 = require("./RestController");
const FeignClient_2 = require("./FeignClient");
const _RequestMappingParamsMetadataKey = Symbol('_RequestMappingParamsMetadataKey');
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["GET"] = "GET";
    RequestMethod["HEAD"] = "HEAD";
    RequestMethod["POST"] = "POST";
    RequestMethod["PUT"] = "PUT";
    RequestMethod["PATCH"] = "PATCH";
    RequestMethod["DELETE"] = "DELETE";
    RequestMethod["OPTIONS"] = "OPTIONS";
})(RequestMethod = exports.RequestMethod || (exports.RequestMethod = {}));
function PostMapping(cfg) {
    return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.POST));
}
exports.PostMapping = PostMapping;
function PutMapping(cfg) {
    return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.PUT));
}
exports.PutMapping = PutMapping;
function PatchMapping(cfg) {
    return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.PATCH));
}
exports.PatchMapping = PatchMapping;
function GetMapping(cfg) {
    return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.GET));
}
exports.GetMapping = GetMapping;
function DeleteMapping(cfg) {
    return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.DELETE));
}
exports.DeleteMapping = DeleteMapping;
function RequestMapping(cfg) {
    let cpath = Array.isArray(cfg.path) ? cfg.path : [cfg.path];
    for (let i = 0; i < cpath.length; i++) {
        if (febs.string.isEmpty(cpath[i])) {
            throw new febs.exception('@RequestMapping need \'path\' parameter', febs.exception.ERROR, __filename, __line, __column);
        }
    }
    if (cfg.path.length == 0) {
        throw new febs.exception('@RequestMapping need \'path\' parameter', febs.exception.ERROR, __filename, __line, __column);
    }
    cfg.method = cfg.method || RequestMethod.GET;
    let pathVariables = getPathVariables(cpath);
    return function (target, propertyKey, descriptor) {
        RestController_1._RestControllerPushRouter(target, target.constructor, {
            path: cfg.path,
            functionPropertyKey: propertyKey,
            params: _GetRequestMappingParams(target),
            method: cfg.method,
        });
        let method = descriptor.value;
        descriptor.value = function () {
            let isRestControllerClass = !!Reflect.hasOwnMetadata(RestController_1._RestControllerMetadataKey, target.constructor);
            if (isRestControllerClass) {
                let cfgp = arguments[0];
                let matchInfo = arguments[1];
                if (RestController_1._RestControllerDo(target, matchInfo, cfg.headers, cfg.dataType, arguments, cfgp.pathname, cfgp.querystring, cfgp.request, cfgp.response, cfgp.params, cfgp.pathVars)) {
                    try {
                        return method.apply(this, arguments);
                    }
                    catch (e) {
                        if (matchInfo) {
                            matchInfo.responseError = e;
                        }
                        return;
                    }
                }
                else {
                    if (matchInfo) {
                        matchInfo.match = false;
                    }
                    return;
                }
            }
            let isFeignClientClass = !!Reflect.hasOwnMetadata(FeignClient_1._FeignClientMetadataKey, target.constructor);
            if (!PathVariable_1._PathVariableDo(target, propertyKey, arguments, pathVariables)) {
                return;
            }
            let urlPaths = setPathVariables(cpath, pathVariables);
            let requestDefaultCfg = FeignClient_2.getFeignClientDefaultCfg();
            let requestMappingParam = {
                path: urlPaths,
                method: cfg.method,
                mode: cfg.mode || requestDefaultCfg.mode,
                headers: cfg.headers || requestDefaultCfg.headers,
                timeout: cfg.timeout || requestDefaultCfg.timeout,
                credentials: cfg.credentials || requestDefaultCfg.credentials,
                body: null,
            };
            RequestBody_1._RequestBodyDo(target, propertyKey, arguments, requestMappingParam);
            RequestParam_1._RequestParamDo(target, propertyKey, arguments, requestMappingParam);
            let restObject = RestObject_1._RestObjectDo(target, propertyKey, arguments);
            if (isFeignClientClass) {
                return FeignClient_1._FeignClientDo(target, requestMappingParam, restObject, cfg.dataType, arguments, () => method.apply(this, arguments));
            }
            else {
                return method.apply(this, arguments);
            }
        };
    };
}
exports.RequestMapping = RequestMapping;
function getPathVariables(urlPaths) {
    let vars = {};
    for (let i in urlPaths) {
        let url = urlPaths[i];
        let urls = url.split('/');
        for (let j in urls) {
            url = urls[j];
            if (/^\{[a-zA-Z\$_][a-zA-Z\d_]*\}$/.test(url)) {
                url = url.substr(1, url.length - 2);
                if (vars.hasOwnProperty(url)) {
                    throw new febs.exception('@RequestMapping path variables is conflicted', febs.exception.ERROR, __filename, __line, __column);
                }
                else {
                    vars[url] = '';
                }
            }
        }
    }
    return vars;
}
function setPathVariables(urlPaths, pathVariables) {
    for (let vari in pathVariables) {
        for (let i in urlPaths) {
            let url = urlPaths[i];
            let urls = url.split('/');
            let match = false;
            for (let j in urls) {
                if (urls[j] == '{' + vari + '}') {
                    urls[j] = pathVariables[vari];
                    match = true;
                    break;
                }
            }
            if (match) {
                url = '';
                for (let j in urls) {
                    if (url.length > 0) {
                        url += '/';
                    }
                    url += urls[j];
                }
                urlPaths[i] = url;
                break;
            }
        }
    }
    return urlPaths;
}
function _GetRequestMappingParams(target) {
    return Reflect.getOwnMetadata(_RequestMappingParamsMetadataKey, target);
}
exports._GetRequestMappingParams = _GetRequestMappingParams;
function _RequestMappingPushParams(target, cfg) {
    let routers = Reflect.getOwnMetadata(_RequestMappingParamsMetadataKey, target) || [];
    routers.push(cfg);
    Reflect.defineMetadata(_RequestMappingParamsMetadataKey, routers, target);
}
exports._RequestMappingPushParams = _RequestMappingPushParams;
//# sourceMappingURL=RequestMapping.js.map