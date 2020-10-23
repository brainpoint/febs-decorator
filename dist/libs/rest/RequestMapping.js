'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestMapping = exports.DeleteMapping = exports.GetMapping = exports.PatchMapping = exports.PutMapping = exports.PostMapping = exports.RequestMethod = exports.setRequestMappingDefaultCfg = void 0;
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-10-22 18:15
* Desc:
*/
require("reflect-metadata");
const febs = require("febs-browser");
const PathVariable_1 = require("./PathVariable");
const FeignClient_1 = require("./FeignClient");
const RequestBody_1 = require("./RequestBody");
const RequestParam_1 = require("./RequestParam");
const ResponseBody_1 = require("./ResponseBody");
const DefaultRequestCfg = Symbol('DefaultRequestCfg');
// export type RequestMappingMetadataType = {
//   path: string[],
//   method: RequestMethod,
//   mode: string|'no-cors'|'cors'|'same-origin',
//   headers: { [key: string]: string },
//   timeout: number,
//   credentials: 'include'|null|undefined,
// };
/**
* @desc: 设置默认的请求配置. 可用于设置header等.
*/
function setRequestMappingDefaultCfg(cfg) {
    global[DefaultRequestCfg] = {
        mode: cfg.mode,
        headers: cfg.headers,
        timeout: cfg.timeout,
        credentials: cfg.credentials,
    };
}
exports.setRequestMappingDefaultCfg = setRequestMappingDefaultCfg;
function getRequestMappingDefaultCfg() {
    let cfg = global[DefaultRequestCfg];
    return cfg || {};
}
/**
 * request method.
 */
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
/**
 * @desc 用于定义post请求.
 *
 * @returns {MethodDecorator}
 */
function PostMapping(cfg) {
    return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.POST));
}
exports.PostMapping = PostMapping;
/**
 * @desc 用于定义put请求.
 *
 * @returns {MethodDecorator}
 */
function PutMapping(cfg) {
    return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.PUT));
}
exports.PutMapping = PutMapping;
/**
 * @desc 用于定义patch请求.
 *
 * @returns {MethodDecorator}
 */
function PatchMapping(cfg) {
    return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.PATCH));
}
exports.PatchMapping = PatchMapping;
/**
 * @desc 用于定义get请求.
 *
 * @returns {MethodDecorator}
 */
function GetMapping(cfg) {
    return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.GET));
}
exports.GetMapping = GetMapping;
/**
 * @desc 用于定义delete请求.
 *
 * @returns {MethodDecorator}
 */
function DeleteMapping(cfg) {
    return RequestMapping(febs.utils.mergeMap(cfg, RequestMethod.DELETE));
}
exports.DeleteMapping = DeleteMapping;
/**
 * @desc 用于定义请求.
 *
 * @returns {MethodDecorator}
 */
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
        let method = descriptor.value;
        descriptor.value = function () {
            // FeignClient.
            let isFeignClientClass = Reflect.hasOwnMetadata(FeignClient_1._FeignClientMetadataKey, target.constructor);
            //
            // PathVariable
            //
            if (!PathVariable_1._PathVariableDo(target, propertyKey, arguments, pathVariables)) {
                return;
            }
            let urlPaths = setPathVariables(cpath, pathVariables);
            let requestDefaultCfg = getRequestMappingDefaultCfg();
            let requestMappingParam = {
                path: urlPaths,
                method: cfg.method,
                mode: cfg.mode || requestDefaultCfg.mode,
                headers: cfg.headers || requestDefaultCfg.headers,
                timeout: cfg.timeout || requestDefaultCfg.timeout,
                credentials: cfg.credentials || requestDefaultCfg.credentials,
                body: null,
            };
            //
            // RequestBody
            //
            RequestBody_1._RequestBodyDo(target, propertyKey, arguments, requestMappingParam);
            //
            // RequestParam
            //
            RequestParam_1._RequestParamDo(target, propertyKey, arguments, requestMappingParam);
            //
            // ResponseBody.
            //
            let respBody = ResponseBody_1._ResponseBodyDo(target, propertyKey, arguments);
            //
            // feignClient.
            //
            if (isFeignClientClass) {
                return FeignClient_1._FeignClientDo(target, requestMappingParam, respBody, arguments, () => method.apply(this, arguments));
            }
            else {
                return method.apply(this, arguments);
            }
        };
    };
}
exports.RequestMapping = RequestMapping;
/**
 * 在参数路径中寻找所有 {xxx} 形式的参数; 如果重复, 则抛出异常
 * @param urlPaths
 */
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
            } // if.
        } // for.
    } // for.
    return vars;
}
/**
 * 使用pathVariables构建正确的path.
 * @param urlPaths
 */
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
//# sourceMappingURL=RequestMapping.js.map