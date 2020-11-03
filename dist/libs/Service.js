'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.getServiceInstances = void 0;
require("reflect-metadata");
const ServiceInstance = Symbol('ServiceInstance');
function getServiceInstances(key) {
    let instances = global[ServiceInstance];
    if (!instances) {
        instances = {};
        global[ServiceInstance] = instances;
    }
    return instances[key] ? instances[key].concat() : [];
}
exports.getServiceInstances = getServiceInstances;
function Service(target, key, singletonKey) {
    key = key || '';
    let instances = global[ServiceInstance];
    if (!instances) {
        instances = {};
        global[ServiceInstance] = instances;
    }
    instances[key] = instances[key] || [];
    if (singletonKey && instances[key].length > 0) {
        throw new Error(`@Service '${key}': There can only be one instance`);
    }
    let instance = new target();
    instances[key].push(instance);
}
exports.Service = Service;
//# sourceMappingURL=Service.js.map