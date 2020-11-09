'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.getServiceInstances = exports.AutowiredInstances = void 0;
require("reflect-metadata");
const ServiceInstance = Symbol('ServiceInstance');
exports.AutowiredInstances = Symbol('AutowiredInstances');
function getServiceInstances(key) {
    let instances = global[ServiceInstance];
    if (!instances) {
        instances = {};
        global[ServiceInstance] = instances;
    }
    return instances[key] ? instances[key].concat() : [];
}
exports.getServiceInstances = getServiceInstances;
function Service(singletonKey) {
    return (target) => {
        let instances = global[ServiceInstance];
        if (!instances) {
            instances = {};
            global[ServiceInstance] = instances;
        }
        instances[target] = instances[target] || [];
        if (singletonKey && instances[target].length > 0) {
            throw new Error(`@Service '${target}': There can only be one instance`);
        }
        let instance = new target();
        instances[target].push(instance);
        finishAutowired(target);
    };
}
exports.Service = Service;
function finishAutowired(target) {
    global[exports.AutowiredInstances] = global[exports.AutowiredInstances] || [];
    let autos = global[exports.AutowiredInstances];
    for (const key in autos) {
        const element = autos[key];
        if (element && element.type === target) {
            let ins = getServiceInstances(element.type);
            element.target[element.propertyKey] = ins ? ins[ins.length - 1] : null;
            autos[key] = null;
        }
    }
}
//# sourceMappingURL=Service.js.map