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
exports.Bean = exports.ImmediatelyService = exports.Service = exports.getServiceInstances = exports.getGlobalWaitAutowireds = exports.setupBeans = void 0;
require("reflect-metadata");
const febs = require("febs-browser");
const FinishDelay = Symbol('FinishDelay');
const ServiceWaitAutowiredInstance = Symbol('ServiceWaitAutowiredInstance');
const BeanWaitAutowiredInstance = Symbol('BeanWaitAutowiredInstance');
const ServiceInstance = Symbol('ServiceInstance');
const AutowiredInstances = Symbol('AutowiredInstances');
function getGlobalWaitAutowiredServices() {
    let instances = global[ServiceWaitAutowiredInstance];
    if (!instances) {
        instances = [];
        global[ServiceWaitAutowiredInstance] = instances;
    }
    return instances;
}
function getGlobalWaitAutowiredBeans() {
    let instances = global[BeanWaitAutowiredInstance];
    if (!instances) {
        instances = [];
        global[BeanWaitAutowiredInstance] = instances;
    }
    return instances;
}
function getGlobalServices() {
    let instances = global[ServiceInstance];
    if (!instances) {
        instances = {};
        global[ServiceInstance] = instances;
    }
    return instances;
}
function setupBeans() {
    return __awaiter(this, void 0, void 0, function* () {
        if (global[FinishDelay]) {
            return;
        }
        let instances = getGlobalServices();
        let waitServices = getGlobalWaitAutowiredServices();
        for (let i = 0; i < waitServices.length; i++) {
            let { key, target, singleton } = waitServices[i];
            if (singleton) {
                let instance = new target();
                instances[key] = { singleton, instance };
                yield finishAutowired(key);
            }
            else {
                let callback = () => __awaiter(this, void 0, void 0, function* () {
                    return new target();
                });
                instances[key] = {
                    singleton, callback
                };
                yield finishAutowired(key);
            }
        }
        waitServices.length = 0;
        let waitBeans = getGlobalWaitAutowiredBeans();
        for (let i = 0; i < waitBeans.length; i++) {
            let { key, callback, singleton } = waitBeans[i];
            if (singleton) {
                let res = yield callback();
                instances[key] = { singleton, instance: res };
                yield finishAutowired(key);
            }
            else {
                instances[key] = {
                    singleton, callback
                };
                yield finishAutowired(key);
            }
        }
        waitBeans.length = 0;
        let autos = getGlobalWaitAutowireds();
        if (autos.length > 0) {
            throw new Error(`Autowired Cannot find Bean: '${autos[0].type}'`);
        }
        global[FinishDelay] = true;
    });
}
exports.setupBeans = setupBeans;
function getGlobalWaitAutowireds() {
    let instances = global[AutowiredInstances] = global[AutowiredInstances] || [];
    return instances;
}
exports.getGlobalWaitAutowireds = getGlobalWaitAutowireds;
function getServiceInstances(key) {
    let instances = getGlobalServices();
    return instances[key];
}
exports.getServiceInstances = getServiceInstances;
function Service(...args) {
    let cfg;
    if (args.length == 0 || typeof args[0] !== 'string') {
        cfg = args[0] || {};
    }
    else {
        cfg = { name: args[0] };
    }
    cfg.singleton = cfg.hasOwnProperty('singleton') ? cfg.singleton : true;
    let { singleton, name } = cfg;
    return (target) => {
        let key = febs.string.isEmpty(name) ? target : name;
        if (target.__isServiced) {
            throw new Error(`@Bean '${key}': It's already declared`);
        }
        target.__isServiced = true;
        let instances = getGlobalServices();
        if (instances.hasOwnProperty(key)) {
            throw new Error(`@Bean '${key}': It's already declared`);
        }
        instances[key] = null;
        if (global[FinishDelay]) {
            if (singleton) {
                let instance = new target();
                instances[key] = { singleton, instance };
                finishAutowired(key).then(() => { });
            }
            else {
                let callback = () => __awaiter(this, void 0, void 0, function* () {
                    return new target();
                });
                instances[key] = {
                    singleton, callback
                };
                finishAutowired(key).then(() => { });
            }
        }
        else {
            let waitInstances = getGlobalWaitAutowiredServices();
            waitInstances.push({
                key,
                target,
                singleton,
            });
        }
    };
}
exports.Service = Service;
function ImmediatelyService(...args) {
    let cfg;
    if (args.length == 0 || typeof args[0] !== 'string') {
        cfg = args[0] || {};
    }
    else {
        cfg = { name: args[0] };
    }
    cfg.singleton = cfg.hasOwnProperty('singleton') ? cfg.singleton : true;
    let { singleton, name } = cfg;
    return (target) => {
        let key = febs.string.isEmpty(name) ? target : name;
        if (target.__isServiced) {
            throw new Error(`@Bean '${key}': It's already declared`);
        }
        target.__isServiced = true;
        let instances = getGlobalServices();
        if (instances.hasOwnProperty(key)) {
            throw new Error(`@Bean '${key}': It's already declared`);
        }
        instances[key] = null;
        if (singleton) {
            let instance = new target();
            instances[key] = { singleton, instance };
            finishAutowired(key).then(() => { });
        }
        else {
            let callback = () => __awaiter(this, void 0, void 0, function* () {
                return new target();
            });
            instances[key] = {
                singleton, callback
            };
            finishAutowired(key).then(() => { });
        }
    };
}
exports.ImmediatelyService = ImmediatelyService;
function Bean(...args) {
    let cfg;
    if (args.length == 0 || typeof args[0] !== 'string') {
        cfg = args[0] || {};
    }
    else {
        cfg = { name: args[0] };
    }
    cfg.singleton = cfg.hasOwnProperty('singleton') ? cfg.singleton : true;
    let { singleton, name } = cfg;
    return (target, propertyKey, descriptor) => {
        let key = febs.string.isEmpty(name) ? propertyKey : name;
        let instances = getGlobalServices();
        if (instances.hasOwnProperty(key)) {
            throw new Error(`@Bean '${key}': It's already declared`);
        }
        instances[key] = null;
        let callback = () => __awaiter(this, void 0, void 0, function* () {
            let f = descriptor.value.apply(target);
            if (f instanceof Promise) {
                return yield f;
            }
            else {
                return f;
            }
        });
        if (global[FinishDelay]) {
            if (singleton) {
                callback().then(res => {
                    instances[key] = { singleton, instance: res };
                    finishAutowired(key).then(() => { });
                });
            }
            else {
                instances[key] = {
                    singleton, callback
                };
                finishAutowired(key).then(() => { });
            }
        }
        else {
            let waitInstances = getGlobalWaitAutowiredBeans();
            waitInstances.push({
                key,
                singleton,
                callback,
            });
        }
    };
}
exports.Bean = Bean;
function finishAutowired(key) {
    return __awaiter(this, void 0, void 0, function* () {
        let instance = getServiceInstances(key);
        if (!instance) {
            throw new Error(`Autowired Cannot find Bean : '${key}'`);
        }
        let autos = getGlobalWaitAutowireds();
        for (let i = 0; i < autos.length; i++) {
            const element = autos[i];
            if (element && element.type === key) {
                let instance1;
                if (instance.singleton) {
                    instance1 = instance.instance;
                }
                else {
                    instance1 = yield instance.callback();
                }
                if (!instance1) {
                    throw new Error(`Autowired Cannot find Bean: '${key}'`);
                }
                element.target[element.propertyKey] = instance1;
                autos.splice(i, 1);
                i--;
            }
        }
    });
}
//# sourceMappingURL=Service.js.map