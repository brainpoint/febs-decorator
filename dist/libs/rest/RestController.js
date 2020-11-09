'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._RestControllerPushRouter = exports._RestControllerDo = exports.CallRestControllerRoute = exports.RestController = exports.setRestControllerDefaultCfg = exports._RestControllerMetadataKey = void 0;
require("reflect-metadata");
const path = require("path");
const febs = require("febs-browser");
const Service_1 = require("../Service");
const logger_1 = require("../logger");
var qs = require('../utils/qs/dist');
const DefaultRestControllerCfg = Symbol('DefaultRestControllerCfg');
const RestControllerRouters = Symbol('RestControllerRouters');
const _RestControllerRouterMetadataKey = Symbol('_RestControllerRouterMetadataKey');
exports._RestControllerMetadataKey = Symbol('_RestControllerMetadataKey');
function getRestControllerRouters() {
    let routers = global[RestControllerRouters];
    if (!routers) {
        routers = [];
        global[RestControllerRouters] = routers;
    }
    return routers;
}
function setRestControllerDefaultCfg(cfg) {
    if (cfg.hasOwnProperty('logLevel')) {
        logger_1.setRestLoggerLevel(cfg.logLevel);
    }
    let c = global[DefaultRestControllerCfg];
    if (!c) {
        c = {};
        global[DefaultRestControllerCfg] = c;
    }
    if (cfg.hasOwnProperty('filterMessageCallback')) {
        c.filterMessageCallback = cfg.filterMessageCallback;
    }
    if (cfg.hasOwnProperty('errorRequestCallback')) {
        c.errorRequestCallback = cfg.errorRequestCallback;
    }
    if (cfg.hasOwnProperty('errorResponseCallback')) {
        c.errorResponseCallback = cfg.errorResponseCallback;
    }
    if (cfg.hasOwnProperty('notFoundCallback')) {
        c.notFoundCallback = cfg.notFoundCallback;
    }
    if (cfg.hasOwnProperty('headers')) {
        c.headers = febs.utils.mergeMap(cfg.headers);
    }
}
exports.setRestControllerDefaultCfg = setRestControllerDefaultCfg;
function getRestControllerDefaultCfg() {
    let cfg = global[DefaultRestControllerCfg];
    cfg = cfg || {};
    return cfg;
}
function RestController(cfg) {
    cfg = cfg || {};
    cfg.path = cfg.path || '';
    let fooService = Service_1.Service(true);
    return (target) => {
        fooService(target);
        let instance = Service_1.getServiceInstances(target);
        instance = instance[instance.length - 1];
        let routers = Reflect.getOwnMetadata(_RestControllerRouterMetadataKey, target);
        if (routers) {
            let globalRouters = getRestControllerRouters();
            for (let p in routers) {
                let val = routers[p];
                let pp = path.join(cfg.path, val.path);
                let reg = getPathReg(pp, val.params);
                val.reg = reg.reg;
                val.pathVars = reg.pathVars;
                val.target = instance;
                globalRouters.push(val);
            }
        }
        Reflect.defineMetadata(exports._RestControllerMetadataKey, {}, target);
    };
}
exports.RestController = RestController;
function CallRestControllerRoute(request, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let interval = Date.now();
        let rotuers = getRestControllerRouters();
        if (!rotuers) {
            return Promise.resolve(null);
        }
        let pathname = request.url;
        let querystring = null;
        let qsPos = pathname.indexOf('?');
        if (qsPos >= 0) {
            querystring = pathname.substr(qsPos + 1);
            if (!febs.string.isEmpty(querystring)) {
                querystring = qs.parse(querystring);
            }
            pathname = pathname.substr(0, qsPos);
        }
        let cfg = getRestControllerDefaultCfg();
        for (let i = 0; i < rotuers.length; i++) {
            let router = rotuers[i];
            if (router.method == request.method.toLowerCase() && router.reg.test(pathname)) {
                let response = {
                    headers: {},
                    status: 200,
                    body: null
                };
                let matchInfo = { match: true, requestError: null, responseError: null };
                let ret;
                ret = yield router.target[router.functionPropertyKey]({
                    pathname: pathname,
                    querystring,
                    request,
                    response,
                    params: router.params,
                    pathVars: router.pathVars,
                }, matchInfo, ctx);
                if (matchInfo.requestError) {
                    interval = Date.now() - interval;
                    logger_1.logRest(request, { err: '[Error] request error' }, interval);
                    if (cfg.errorRequestCallback) {
                        cfg.errorRequestCallback(matchInfo.requestError, request, response);
                    }
                    return Promise.resolve(null);
                }
                if (matchInfo.responseError) {
                    interval = Date.now() - interval;
                    logger_1.logRest(request, { err: '[Error] response error' }, interval);
                    if (cfg.errorResponseCallback) {
                        cfg.errorResponseCallback(matchInfo.responseError, request, response);
                    }
                    return Promise.resolve(null);
                }
                if (!matchInfo.match) {
                    interval = Date.now() - interval;
                    logger_1.logRest(request, { err: '[404] Route matched, but condition not satisfied' }, interval);
                    if (cfg.notFoundCallback) {
                        cfg.notFoundCallback(request, response);
                    }
                    return Promise.resolve(null);
                }
                if (cfg.filterMessageCallback) {
                    ret = cfg.filterMessageCallback(ret, request.url);
                }
                response.body = ret;
                interval = Date.now() - interval;
                logger_1.logRest(request, response, interval);
                return Promise.resolve(response);
            }
        }
        interval = Date.now() - interval;
        logger_1.logRest(request, { err: '[404] No match Router' }, interval);
        if (cfg.notFoundCallback) {
            let response = {
                headers: {},
                status: 200,
                body: null
            };
            const defaultHeaders = febs.utils.mergeMap(cfg.headers);
            if (defaultHeaders) {
                for (const key in defaultHeaders) {
                    response.headers[key] = defaultHeaders[key];
                }
            }
            cfg.notFoundCallback(request, response);
        }
        return Promise.resolve(null);
    });
}
exports.CallRestControllerRoute = CallRestControllerRoute;
function _RestControllerDo(target, ctx, matchInfo, headers, dataType, args, pathname, querystring, request, response, params, pathVars) {
    const defaultHeaders = febs.utils.mergeMap(getRestControllerDefaultCfg().headers, headers);
    if (defaultHeaders) {
        for (const key in defaultHeaders) {
            response.headers[key] = defaultHeaders[key];
        }
    }
    args.length = 0;
    if (params) {
        for (let i = 0; i < params.length; i++) {
            let param = params[i];
            if (args.length <= param.parameterIndex) {
                args.length = param.parameterIndex + 1;
            }
            if (param.type == 'pv') {
                let index = pathVars['{' + param.name + '}'];
                if (!febs.utils.isNull(index)) {
                    let data = pathname.split('/')[index];
                    if (data) {
                        decodeURIComponent(data);
                    }
                    else if (param.required) {
                        return false;
                    }
                    args[param.parameterIndex] = data;
                }
            }
            else if (param.type == 'rb') {
                if (!request.body) {
                    if (param.required) {
                        return false;
                    }
                    args[param.parameterIndex] = null;
                }
                else if (!dataType) {
                    args[param.parameterIndex] = request.body;
                }
                else {
                    try {
                        let data = new dataType();
                        if (data instanceof String) {
                            data = request.body;
                        }
                        else if (data instanceof Number) {
                            data = new Number(request.body).valueOf();
                        }
                        else if (data instanceof Boolean) {
                            data = (request.body === 'true' || request.body === '1' || request.body === true || request.body === 1);
                        }
                        else {
                            for (const key in request.body) {
                                data[key] = request.body[key];
                            }
                        }
                        args[param.parameterIndex] = data;
                    }
                    catch (e) {
                        matchInfo.requestError = e;
                    }
                }
            }
            else if (param.type == 'rp') {
                if (!querystring || !querystring.hasOwnProperty(param.name)) {
                    if (param.required && !param.defaultValue) {
                        return false;
                    }
                    args[param.parameterIndex] = param.defaultValue;
                }
                else {
                    args[param.parameterIndex] = querystring[param.name];
                }
            }
            else if (param.type == 'ro') {
                args[param.parameterIndex] = {
                    request,
                    response,
                    responseMsg: null,
                    error: null,
                    ctx,
                };
            }
        }
    }
    return true;
}
exports._RestControllerDo = _RestControllerDo;
function getPathReg(p, params) {
    params = params || [];
    if (p[0] != '/')
        p = '/' + p;
    if (p[p.length - 1] == '/')
        p = p.substr(0, p.length - 1);
    p = febs.string.replace(p, '\\', '\\\\');
    p = febs.string.replace(p, '[', '\[');
    p = febs.string.replace(p, ']', '\]');
    p = febs.string.replace(p, '(', '\(');
    p = febs.string.replace(p, ')', '\)');
    p = febs.string.replace(p, '{', '\{');
    p = febs.string.replace(p, '}', '\}');
    p = febs.string.replace(p, '|', '\|');
    p = febs.string.replace(p, '^', '\^');
    p = febs.string.replace(p, '?', '\?');
    p = febs.string.replace(p, '.', '\.');
    p = febs.string.replace(p, '+', '\+');
    p = febs.string.replace(p, '*', '\*');
    p = febs.string.replace(p, '$', '\$');
    p = febs.string.replace(p, ':', '\:');
    p = febs.string.replace(p, '-', '\-');
    let pathVars = {};
    let segs = p.split('/');
    p = '^\/';
    let pvHadRequired = true;
    for (let i = 0; i < segs.length; i++) {
        if (segs[i].length == 0)
            continue;
        if (/^\{[a-zA-Z\$_][a-zA-Z\d_]*\}$/.test(segs[i])) {
            p += '\/((?!.*\/).*)';
            for (let j = 0; j < params.length; j++) {
                if (params[j].type == 'pv' && '{' + params[j].name + '}' == segs[i]) {
                    if (!params[j].required) {
                        pvHadRequired = false;
                        p = '(' + p + ')?';
                    }
                    else if (!pvHadRequired) {
                        throw new Error(`@PathVariable '${params[j].name}': required cannot be 'true', pre-pathVariable required=false`);
                    }
                    break;
                }
            }
            pathVars[segs[i]] = i;
        }
        else {
            if (p.length > 2)
                p += '\/';
            p += segs[i];
        }
    }
    p += '\/?(\\?.*)?$';
    return { reg: new RegExp(p), pathVars };
}
function _RestControllerPushRouter(targetObject, target, cfg) {
    let routers = Reflect.getOwnMetadata(_RestControllerRouterMetadataKey, target) || [];
    if (Array.isArray(cfg.path)) {
        for (let i = 0; i < cfg.path.length; i++) {
            routers.push({
                target: targetObject,
                functionPropertyKey: cfg.functionPropertyKey,
                params: cfg.params,
                path: cfg.path[i],
                method: cfg.method.toLowerCase(),
            });
        }
    }
    else {
        routers.push({
            target: targetObject,
            functionPropertyKey: cfg.functionPropertyKey,
            params: cfg.params,
            path: cfg.path,
            method: cfg.method.toLowerCase(),
        });
    }
    Reflect.defineMetadata(_RestControllerRouterMetadataKey, routers, target);
}
exports._RestControllerPushRouter = _RestControllerPushRouter;
//# sourceMappingURL=RestController.js.map