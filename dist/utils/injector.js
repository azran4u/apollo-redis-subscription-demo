"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = void 0;
class Injector {
    constructor() {
        this._di = {};
    }
    static getInstance() {
        if (!Injector.instance) {
            Injector.instance = new Injector();
        }
        return Injector.instance;
    }
    addService(dependency, args) {
        if (this.serviceExists(dependency.name)) {
            return;
        }
        const construction = new dependency.prototype.constructor(args);
        this._di[dependency.name] = construction;
    }
    getInjector() {
        return this._di;
    }
    getService(dependency) {
        if (!this.serviceExists(dependency.name)) {
            return {};
        }
        const di = this._di;
        return this._di[dependency.name];
    }
    serviceExists(name) {
        return this._di[name] ? true : false;
    }
}
exports.Injector = Injector;
//# sourceMappingURL=injector.js.map