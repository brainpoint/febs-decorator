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
exports.Bean = exports.Service = exports.getServiceInstances = exports.getGlobalAutowireds = void 0;
require("reflect-metadata");
const febs = require("febs-browser");
const ServiceInstance = Symbol('ServiceInstance');
const AutowiredInstances = Symbol('AutowiredInstances');
function getGlobalServices() {
    let instances = global[ServiceInstance];
    if (!instances) {
        instances = {};
        global[ServiceInstance] = instances;
    }
    return instances;
}
function getGlobalAutowireds() {
    let instances = global[AutowiredInstances] = global[AutowiredInstances] || [];
    return instances;
}
exports.getGlobalAutowireds = getGlobalAutowireds;
function getServiceInstances(key) {
    let instances = getGlobalServices();
    return instances[key] ? instances[key].concat() : [];
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
        let instances = getGlobalServices();
        let key = febs.string.isEmpty(name) ? target : name;
        if (instances[key]) {
            throw new Error(`@Bean '${key}': It's already declared`);
        }
        instances[key] = [];
        if (singleton) {
            let instance = new target();
            instances[key].push(instance);
            finishAutowired(key, target, singleton, instance);
        }
        else {
            let callback = () => __awaiter(this, void 0, void 0, function* () {
                return new target();
            });
            finishAutowired(key, target, singleton, callback);
        }
    };
}
exports.Service = Service;
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
        let instances = getGlobalServices();
        let key = febs.string.isEmpty(name) ? propertyKey : name;
        if (instances[key]) {
            throw new Error(`@Bean '${key}': It's already declared`);
        }
        let callback = () => __awaiter(this, void 0, void 0, function* () {
            let f = descriptor.value.apply(target);
            if (f instanceof Promise) {
                return yield f;
            }
            else {
                return f;
            }
        });
        instances[key] = [];
        if (singleton) {
            callback().then(res => {
                let instance = res;
                instances[key].push(instance);
                finishAutowired(key, target, singleton, instance).then();
            });
        }
        else {
            finishAutowired(key, target, singleton, callback).then();
        }
    };
}
exports.Bean = Bean;
function finishAutowired(key, target, singleton, instance) {
    return __awaiter(this, void 0, void 0, function* () {
        let autos = getGlobalAutowireds();
        for (let i = 0; i < autos.length; i++) {
            const element = autos[i];
            if (element && element.type === key) {
                if (singleton) {
                    element.target[element.propertyKey] = instance;
                }
                else {
                    element.target[element.propertyKey] = yield instance();
                }
                autos.splice(i, 1);
                i--;
            }
        }
    });
}
//# sourceMappingURL=Service.js.map