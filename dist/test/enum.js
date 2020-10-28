'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const lib_1 = require("./lib");
var Enum1;
(function (Enum1) {
    Enum1["a"] = "2323";
    Enum1["b"] = "xxxx";
})(Enum1 || (Enum1 = {}));
class EnumBean {
}
__decorate([
    __1.Enum({ allows: [1, 2, 3, 'a', 'b', 'c'] }),
    __metadata("design:type", Object)
], EnumBean.prototype, "value_enum", void 0);
__decorate([
    __1.Enum.List({ allows: [1, 2, 3, 'a', 'b', 'c'] }),
    __metadata("design:type", Object)
], EnumBean.prototype, "value_enumList", void 0);
__decorate([
    __1.Type.Enum({ enumType: Enum1 }),
    __metadata("design:type", Object)
], EnumBean.prototype, "value_enumType", void 0);
__decorate([
    __1.Type.Enum.List({ enumType: Enum1 }),
    __metadata("design:type", Object)
], EnumBean.prototype, "value_enumTypeList", void 0);
let bean = new EnumBean();
lib_1.except_success(() => {
    bean.value_enum = null;
    bean.value_enum = undefined;
    bean.value_enum = 1;
    bean.value_enum = 2;
    bean.value_enum = 3;
    bean.value_enum = 'a';
    bean.value_enum = 'b';
    bean.value_enum = 'c';
});
lib_1.except_fail(() => {
    bean.value_enum = [1231];
}, () => {
    bean.value_enum = '123ddfsgsfg';
}, () => {
    bean.value_enum = 4;
});
lib_1.except_success(() => {
    bean.value_enumList = null;
    bean.value_enumList = undefined;
    bean.value_enumList = [1, 2, 'a', 'c'];
});
lib_1.except_fail(() => {
    bean.value_enumList = [1231];
}, () => {
    bean.value_enumList = 1;
});
lib_1.except_success(() => {
    bean.value_enumType = null;
    bean.value_enumType = undefined;
    bean.value_enumType = Enum1.a;
    bean.value_enumType = Enum1.b;
});
lib_1.except_fail(() => {
    bean.value_enumType = [1231];
}, () => {
    bean.value_enumType = 2;
}, () => {
    bean.value_enumType = 4;
});
lib_1.except_success(() => {
    bean.value_enumTypeList = null;
    bean.value_enumTypeList = undefined;
    bean.value_enumTypeList = [Enum1.a, Enum1.b];
});
lib_1.except_fail(() => {
    bean.value_enumTypeList = ['232s3'];
}, () => {
    bean.value_enumTypeList = 1;
});
//# sourceMappingURL=enum.js.map