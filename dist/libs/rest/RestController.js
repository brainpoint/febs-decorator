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
var qs = require('../utils/qs/dist');
const DefaultRestControllerCfg = Symbol('DefaultRestControllerCfg');
const RestControllerRouters = Symbol('RestControllerRouters');
const _RestControllerRouterMetadataKey = Symbol('_RestControllerRouterMetadataKey');
exports._RestControllerMetadataKey = Symbol('_RestControllerMetadataKey');
function getRestControllerRouters() {
    let routers = global[RestControllerRouters];
    if (!routers) {
        routers = {};
        global[RestControllerRouters] = routers;
    }
    return routers;
}
function setRestControllerDefaultCfg(cfg) {
    let c = global[DefaultRestControllerCfg];
    if (!c) {
        c = {};
        global[DefaultRestControllerCfg] = c;
    }
    c = c || {};
    if (cfg.hasOwnProperty('filterMessageCallback')) {
        c.filterMessageCallback = cfg.filterMessageCallback;
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
    return (target) => {
        let routers = Reflect.getOwnMetadata(_RestControllerRouterMetadataKey, target);
        if (routers) {
            let globalRouters = getRestControllerRouters();
            for (let p in routers) {
                let val = routers[p];
                let pp = path.join(cfg.path, p);
                let reg = getPathReg(pp);
                val.reg = reg.reg;
                val.pathVars = reg.pathVars;
                globalRouters.push(val);
            }
        }
        Reflect.defineMetadata(exports._RestControllerMetadataKey, {}, target);
    };
}
exports.RestController = RestController;
function CallRestControllerRoute(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let rotuers = getRestControllerRouters();
        if (!rotuers) {
            return Promise.resolve(false);
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
        for (let i = 0; i < rotuers.length; i++) {
            let router = rotuers[i];
            if (router.reg.test(pathname)) {
                let ret = yield router.target[router.functionPropertyKey]({
                    pathname: pathname,
                    querystring,
                    request,
                    response,
                    params: router.params,
                    pathVars: router.pathVars,
                });
                let cfg = getRestControllerDefaultCfg();
                if (cfg.filterMessageCallback) {
                    ret = cfg.filterMessageCallback(ret);
                }
                response.body = ret;
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    });
}
exports.CallRestControllerRoute = CallRestControllerRoute;
function _RestControllerDo(target, dataType, args, pathname, querystring, request, response, params, pathVars) {
    args.length = 0;
    if (params) {
        for (let i = 0; i < params.length; i++) {
            let param = params[i];
            if (args.length <= param.parameterIndex) {
                args.length = param.parameterIndex + 1;
            }
            if (param.type == 'pv') {
                let index = pathVars[param.name];
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
                    let data = new dataType();
                    for (const key in request.body) {
                        data[key] = request.body[key];
                    }
                    args[param.parameterIndex] = data;
                }
            }
            else if (param.type == 'rp') {
                if (!querystring || !querystring[param.name]) {
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
                };
            }
        }
    }
    return true;
}
exports._RestControllerDo = _RestControllerDo;
function getPathReg(p) {
    p = febs.string.replace(p, '\\', '\\\\');
    p = febs.string.replace(p, '[', '\\[');
    p = febs.string.replace(p, ']', '\\]');
    p = febs.string.replace(p, '(', '\\(');
    p = febs.string.replace(p, ')', '\\)');
    p = febs.string.replace(p, '{', '\\{');
    p = febs.string.replace(p, '}', '\\}');
    p = febs.string.replace(p, '|', '\\|');
    p = febs.string.replace(p, '^', '\\^');
    p = febs.string.replace(p, '?', '\\?');
    p = febs.string.replace(p, '.', '\\.');
    p = febs.string.replace(p, '+', '\\+');
    p = febs.string.replace(p, '*', '\\*');
    p = febs.string.replace(p, '$', '\\$');
    p = febs.string.replace(p, ':', '\\:');
    p = febs.string.replace(p, '-', '\\-');
    let pathVars = {};
    let segs = p.split('/');
    p = '';
    for (let i = 0; i < segs.length; i++) {
        if (/^\\\{[a-zA-Z\$_][a-zA-Z\d_]*\\\}$/.test(segs[i])) {
            p += '\\/[^/]+';
            pathVars[segs[i]] = i;
        }
        else {
            p += '\\/' + segs[i];
        }
    }
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
            });
        }
    }
    else {
        routers.push({
            target: targetObject,
            functionPropertyKey: cfg.functionPropertyKey,
            params: cfg.params,
            path: cfg.path,
        });
    }
    Reflect.defineMetadata(_RestControllerRouterMetadataKey, routers, target);
}
exports._RestControllerPushRouter = _RestControllerPushRouter;
//# sourceMappingURL=RestController.js.map