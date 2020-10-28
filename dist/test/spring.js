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
const tap_1 = require("tap");
const __1 = require("..");
const lib_1 = require("./lib");
class SpringBean {
}
__decorate([
    __1.Null,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_null", void 0);
__decorate([
    __1.Null.List({ listMaxLength: 2 }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_nullList", void 0);
__decorate([
    __1.NotNull,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_notnull", void 0);
__decorate([
    __1.NotNull.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_notnullList", void 0);
__decorate([
    __1.NotBlank,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_notblank", void 0);
__decorate([
    __1.NotBlank.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_notblankList", void 0);
__decorate([
    __1.NotEmpty,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_notempty", void 0);
__decorate([
    __1.NotEmpty.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_notemptyList", void 0);
__decorate([
    __1.Size({ min: 2, max: 10 }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_size2_10", void 0);
__decorate([
    __1.Size.List({ max: 10 }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_size2_10List", void 0);
__decorate([
    __1.AssertFalse,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_false", void 0);
__decorate([
    __1.AssertFalse.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_falseList", void 0);
__decorate([
    __1.AssertTrue,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_true", void 0);
__decorate([
    __1.AssertTrue.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_trueList", void 0);
__decorate([
    __1.DecimalMax({ value: 100000000000 }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_decimalMax", void 0);
__decorate([
    __1.DecimalMax.List({ value: 100000000000 }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_decimalMaxList", void 0);
__decorate([
    __1.DecimalMin({ value: 0 }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_decimalMin", void 0);
__decorate([
    __1.DecimalMin.List({ value: 0 }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_decimalMinList", void 0);
__decorate([
    __1.Max({ value: 0 }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_max", void 0);
__decorate([
    __1.Max.List({ value: 0 }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_maxList", void 0);
__decorate([
    __1.Min({ value: 0 }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_min", void 0);
__decorate([
    __1.Min.List({ value: 0 }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_minList", void 0);
__decorate([
    __1.Negative,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_negative", void 0);
__decorate([
    __1.Negative.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_negativeList", void 0);
__decorate([
    __1.NegativeOrZero,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_negativeOrZero", void 0);
__decorate([
    __1.NegativeOrZero.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_negativeOrZeroList", void 0);
__decorate([
    __1.Positive,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_positive", void 0);
__decorate([
    __1.Positive.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_positiveList", void 0);
__decorate([
    __1.PositiveOrZero,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_positiveOrZero", void 0);
__decorate([
    __1.PositiveOrZero.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_positiveOrZeroList", void 0);
__decorate([
    __1.Range({ min: 0, max: 100 }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_range", void 0);
__decorate([
    __1.Range.List({ min: 0, max: 100 }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_rangeList", void 0);
__decorate([
    __1.Email,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_email", void 0);
__decorate([
    __1.Email.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_emailList", void 0);
__decorate([
    __1.Pattern({ regexp: /^\d*$/ }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_pattern", void 0);
__decorate([
    __1.Pattern.List({ regexp: /^\d*$/ }),
    __metadata("design:type", Object)
], SpringBean.prototype, "value_patternList", void 0);
__decorate([
    __1.Future,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_future", void 0);
__decorate([
    __1.Future.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_futureList", void 0);
__decorate([
    __1.FutureOrPresent,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_futureOrPresent", void 0);
__decorate([
    __1.FutureOrPresent.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_futureOrPresentList", void 0);
__decorate([
    __1.Past,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_past", void 0);
__decorate([
    __1.Past.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_pastList", void 0);
__decorate([
    __1.PastOrPresent,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_pastOrPresent", void 0);
__decorate([
    __1.PastOrPresent.List,
    __metadata("design:type", Object)
], SpringBean.prototype, "value_pastOrPresentList", void 0);
let bean = new SpringBean();
lib_1.except_success(() => {
    bean.value_null = null;
    bean.value_null = undefined;
});
lib_1.except_fail(() => {
    bean.value_null = [1231, '23424', '121321723427834628'];
}, () => {
    bean.value_null = '123ddfsgsfg';
});
lib_1.except_success(() => {
    bean.value_nullList = null;
    bean.value_nullList = undefined;
    bean.value_nullList = [null, null];
});
lib_1.except_fail(() => {
    bean.value_nullList = [1231, '23424', '121321723427834628'];
}, () => {
    bean.value_nullList = '121321723427834628';
});
lib_1.except_success(() => {
    bean.value_notnull = 1;
    bean.value_notnull = 0;
    bean.value_notnull = '1212';
    bean.value_notnull = {};
});
lib_1.except_fail(() => {
    bean.value_notnull = null;
}, () => {
    bean.value_notnull = undefined;
});
lib_1.except_success(() => {
    bean.value_notnullList = [122, 1, 'true'];
    bean.value_notnullList = null;
    bean.value_notnullList = undefined;
});
lib_1.except_fail(() => {
    bean.value_notnullList = [12, null];
}, () => {
    bean.value_notnullList = [12, undefined];
});
lib_1.except_success(() => {
    bean.value_notblank = ' 1 ';
    bean.value_notblank = '12212';
});
lib_1.except_fail(() => {
    bean.value_notblank = '';
}, () => {
    bean.value_notblank = '    ';
}, () => {
    bean.value_notblank = null;
}, () => {
    bean.value_notblank = undefined;
}, () => {
    bean.value_notblank = 324;
});
lib_1.except_success(() => {
    bean.value_notblankList = null;
    bean.value_notblankList = undefined;
    bean.value_notblankList = [' 1   ', '1213'];
});
lib_1.except_fail(() => {
    bean.value_notblankList = ['', '23424', '121321723aa427834628'];
}, () => {
    bean.value_notblankList = 1231;
});
lib_1.except_success(() => {
    bean.value_notempty = {
        size() {
            return 1;
        },
    };
    bean.value_notempty = '22';
    bean.value_notempty = '-2324125321.1212';
    bean.value_notempty = [1];
});
lib_1.except_fail(() => {
    bean.value_notempty = null;
}, () => {
    bean.value_notempty = undefined;
}, () => {
    bean.value_notempty = {};
}, () => {
    bean.value_notempty = [];
}, () => {
    bean.value_notempty = 1;
}, () => {
    bean.value_notempty = 0;
}, () => {
    bean.value_notempty = '';
});
lib_1.except_success(() => {
    bean.value_notemptyList = null;
    bean.value_notemptyList = undefined;
    bean.value_notemptyList = [[1], '1213', '1212.1223'];
});
lib_1.except_fail(() => {
    bean.value_notemptyList = [1, '23424', '121321723aa427834628'];
}, () => {
    bean.value_notemptyList = ['', '23424', '121321723aa427834628'];
}, () => {
    bean.value_notemptyList = [null, '23424', '121321723aa427834628'];
}, () => {
    bean.value_notemptyList = 1231;
});
lib_1.except_success(() => {
    bean.value_size2_10 = '123131';
    bean.value_size2_10 = '12';
    bean.value_size2_10 = '1234567890';
    bean.value_size2_10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,];
    bean.value_size2_10 = [1, 2];
    bean.value_size2_10 = [1, 2, 4];
    bean.value_size2_10 = undefined;
    bean.value_size2_10 = null;
});
lib_1.except_fail(() => {
    bean.value_size2_10 = '12345678901';
}, () => {
    bean.value_size2_10 = '1';
}, () => {
    bean.value_size2_10 = [1];
}, () => {
    bean.value_size2_10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1];
});
lib_1.except_success(() => {
    bean.value_size2_10List = ['1213', '1234567890'];
    bean.value_size2_10List = [[1, 2], '1234567890'];
    bean.value_size2_10List = ['1213', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,]];
    bean.value_size2_10List = ['1213', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,], null];
});
lib_1.except_fail(() => {
    bean.value_size2_10List = ['1', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,]];
    bean.value_size2_10List = ['12', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1,]];
}, () => {
    bean.value_size2_10List = '23424';
});
lib_1.except_success(() => {
    bean.value_false = false;
    bean.value_false = 0;
    bean.value_false = 'false';
    bean.value_false = null;
    bean.value_false = undefined;
}, () => {
    bean.value_false = 'false';
    tap_1.default.equal(bean.value_false, false);
    bean.value_false = 0;
    tap_1.default.equal(bean.value_false, false);
});
lib_1.except_fail(() => {
    bean.value_false = 1;
}, () => {
    bean.value_false = true;
}, () => {
    bean.value_false = 'true';
}, () => {
    bean.value_false = 'asdfs';
}, () => {
    bean.value_false = {};
});
lib_1.except_success(() => {
    bean.value_falseList = [null, 0, 'false', false];
    tap_1.default.equal(bean.value_falseList[1], false);
});
lib_1.except_fail(() => {
    bean.value_falseList = [1, true];
});
lib_1.except_success(() => {
    bean.value_true = true;
    bean.value_true = 1;
    bean.value_true = 'true';
    bean.value_true = null;
    bean.value_true = undefined;
}, () => {
    bean.value_true = 'true';
    tap_1.default.equal(bean.value_true, true);
    bean.value_true = 1;
    tap_1.default.equal(bean.value_true, true);
});
lib_1.except_fail(() => {
    bean.value_true = 0;
}, () => {
    bean.value_true = false;
}, () => {
    bean.value_true = 'false';
}, () => {
    bean.value_true = 'asdfs';
}, () => {
    bean.value_true = {};
});
lib_1.except_success(() => {
    bean.value_trueList = [null, 1, 'true', true];
    tap_1.default.equal(bean.value_trueList[1], true);
});
lib_1.except_fail(() => {
    bean.value_trueList = [1, false];
});
lib_1.except_success(() => {
    bean.value_decimalMax = 100000000000;
    bean.value_decimalMax = 0;
    bean.value_decimalMax = -111;
    bean.value_decimalMax = '100000000000';
    bean.value_decimalMax = '1212';
});
lib_1.except_fail(() => {
    bean.value_decimalMax = 100000000001;
}, () => {
    bean.value_decimalMax = 'ssss';
});
lib_1.except_success(() => {
    bean.value_decimalMaxList = [100000000000, 0, '-1212'];
});
lib_1.except_fail(() => {
    bean.value_decimalMaxList = 123;
}, () => {
    bean.value_decimalMinList = [100000000001, 'sdd'];
}, () => {
    bean.value_decimalMaxList = {};
});
lib_1.except_success(() => {
    bean.value_decimalMin = 0;
    bean.value_decimalMin = 111;
    bean.value_decimalMin = '1000000';
    bean.value_decimalMin = '0';
});
lib_1.except_fail(() => {
    bean.value_decimalMin = -1;
}, () => {
    bean.value_decimalMin = 1.212;
}, () => {
    bean.value_decimalMin = 'ssss';
});
lib_1.except_success(() => {
    bean.value_decimalMinList = [1121, 0, '1212'];
});
lib_1.except_fail(() => {
    bean.value_decimalMinList = 123;
}, () => {
    bean.value_decimalMinList = [-11212, '1212'];
}, () => {
    bean.value_decimalMinList = {};
});
lib_1.except_success(() => {
    bean.value_max = 0;
    bean.value_max = -111;
    bean.value_max = '-1000000';
    bean.value_max = '0';
});
lib_1.except_fail(() => {
    bean.value_max = 1;
}, () => {
    bean.value_max = -0.12;
}, () => {
    bean.value_max = '-0.12';
}, () => {
    bean.value_max = 'ssss';
});
lib_1.except_success(() => {
    bean.value_maxList = [-1121, 0, '-1212'];
});
lib_1.except_fail(() => {
    bean.value_maxList = 123;
}, () => {
    bean.value_maxList = [1212, '1212'];
}, () => {
    bean.value_maxList = {};
});
lib_1.except_success(() => {
    bean.value_min = 0;
    bean.value_min = 111;
    bean.value_min = '1000000';
    bean.value_min = '0';
});
lib_1.except_fail(() => {
    bean.value_min = -1;
}, () => {
    bean.value_min = 0.12;
}, () => {
    bean.value_min = '0.12';
}, () => {
    bean.value_min = 'ssss';
});
lib_1.except_success(() => {
    bean.value_minList = [1121, 0, '1212'];
});
lib_1.except_fail(() => {
    bean.value_minList = -123;
}, () => {
    bean.value_minList = [-1212, '1212'];
}, () => {
    bean.value_minList = {};
});
lib_1.except_success(() => {
    bean.value_negative = null;
    bean.value_negative = undefined;
    bean.value_negative = -1;
    bean.value_negative = '-1000000';
});
lib_1.except_fail(() => {
    bean.value_negative = 1;
}, () => {
    bean.value_negative = 0.12;
}, () => {
    bean.value_negative = '0.12';
}, () => {
    bean.value_negative = 'ssss';
}, () => {
    bean.value_negative = {};
});
lib_1.except_success(() => {
    bean.value_negativeList = [null, -1, '-1212'];
});
lib_1.except_fail(() => {
    bean.value_negativeList = -123;
}, () => {
    bean.value_negativeList = [-1212, '1212'];
}, () => {
    bean.value_negativeList = {};
});
lib_1.except_success(() => {
    bean.value_negativeOrZero = null;
    bean.value_negativeOrZero = undefined;
    bean.value_negativeOrZero = -1;
    bean.value_negativeOrZero = '-1000000';
    bean.value_negativeOrZero = '0';
    bean.value_negativeOrZero = 0;
});
lib_1.except_fail(() => {
    bean.value_negativeOrZero = 1;
}, () => {
    bean.value_negativeOrZero = 0.12;
}, () => {
    bean.value_negativeOrZero = '0.12';
}, () => {
    bean.value_negativeOrZero = 'ssss';
}, () => {
    bean.value_negativeOrZero = {};
});
lib_1.except_success(() => {
    bean.value_negativeOrZeroList = [null, 0, '0', -1, '-1212'];
});
lib_1.except_fail(() => {
    bean.value_negativeOrZeroList = -123;
}, () => {
    bean.value_negativeOrZeroList = [-1212, '1212'];
}, () => {
    bean.value_negativeOrZeroList = {};
});
lib_1.except_success(() => {
    bean.value_positive = null;
    bean.value_positive = undefined;
    bean.value_positive = 1;
    bean.value_positive = '1000000';
});
lib_1.except_fail(() => {
    bean.value_positive = -1;
}, () => {
    bean.value_positive = 0;
}, () => {
    bean.value_positive = '-0.12';
}, () => {
    bean.value_positive = 'ssss';
}, () => {
    bean.value_positive = {};
});
lib_1.except_success(() => {
    bean.value_positiveList = [null, 1, '1212'];
});
lib_1.except_fail(() => {
    bean.value_positiveList = -123;
}, () => {
    bean.value_positiveList = [-1212, '1212'];
}, () => {
    bean.value_positiveList = {};
});
lib_1.except_success(() => {
    bean.value_positiveOrZero = null;
    bean.value_positiveOrZero = undefined;
    bean.value_positiveOrZero = 1;
    bean.value_positiveOrZero = '1000000';
    bean.value_positiveOrZero = '0';
    bean.value_positiveOrZero = 0;
});
lib_1.except_fail(() => {
    bean.value_positiveOrZero = -1;
}, () => {
    bean.value_positiveOrZero = -0.12;
}, () => {
    bean.value_positiveOrZero = '-0.12';
}, () => {
    bean.value_positiveOrZero = 'ssss';
}, () => {
    bean.value_positiveOrZero = {};
});
lib_1.except_success(() => {
    bean.value_positiveOrZeroList = [null, 0, '0', 1, '1212'];
});
lib_1.except_fail(() => {
    bean.value_positiveOrZeroList = -123;
}, () => {
    bean.value_positiveOrZeroList = [-1212, '1212'];
}, () => {
    bean.value_positiveOrZeroList = {};
});
lib_1.except_success(() => {
    bean.value_range = null;
    bean.value_range = undefined;
    bean.value_range = 0;
    bean.value_range = 100;
    bean.value_range = 59;
    bean.value_range = '30.12';
});
lib_1.except_fail(() => {
    bean.value_range = -1;
}, () => {
    bean.value_range = -0.12;
}, () => {
    bean.value_range = '100.12';
}, () => {
    bean.value_range = 'ssss';
}, () => {
    bean.value_range = {};
});
lib_1.except_success(() => {
    bean.value_rangeList = [null, 0, '0', 1, '50'];
});
lib_1.except_fail(() => {
    bean.value_rangeList = -123;
}, () => {
    bean.value_rangeList = [-1212, '1212'];
}, () => {
    bean.value_rangeList = {};
});
lib_1.except_success(() => {
    bean.value_email = null;
    bean.value_email = undefined;
    bean.value_email = 'xxx@cx.com';
    bean.value_email = 'sdf1@sdsdg.net';
    bean.value_email = '1212rf.sge@sdgs.cn';
    bean.value_email = 'zzz.xx@xx.cn';
});
lib_1.except_fail(() => {
    bean.value_email = -1;
}, () => {
    bean.value_email = -0.12;
}, () => {
    bean.value_email = 'sdf1';
}, () => {
    bean.value_email = 'ssss@ddf';
}, () => {
    bean.value_email = {};
});
lib_1.except_success(() => {
    bean.value_emailList = [null, 'xxx@cx.com', 'zzz.xx@xx.cn'];
});
lib_1.except_fail(() => {
    bean.value_emailList = -123;
}, () => {
    bean.value_emailList = ['ssss@ddf', 'zzz.xx@xx.cn'];
}, () => {
    bean.value_emailList = {};
});
lib_1.except_success(() => {
    bean.value_pattern = null;
    bean.value_pattern = undefined;
    bean.value_pattern = '123143';
    bean.value_pattern = '0127432';
});
lib_1.except_fail(() => {
    bean.value_pattern = -1;
}, () => {
    bean.value_pattern = -0.12;
}, () => {
    bean.value_pattern = 'sdf123';
}, () => {
    bean.value_pattern = {};
});
lib_1.except_success(() => {
    bean.value_patternList = [null, '0127432'];
});
lib_1.except_fail(() => {
    bean.value_patternList = -123;
}, () => {
    bean.value_patternList = ['ssss@ddf', '你好.xx@中国.cn'];
}, () => {
    bean.value_patternList = {};
});
lib_1.except_success(() => {
    bean.value_future = null;
    bean.value_future = undefined;
    let now = new Date();
    now.setDate(now.getDate() + 1);
    bean.value_future = now;
});
lib_1.except_fail(() => {
    let now = new Date();
    now.setDate(now.getDate() - 1);
    bean.value_future = now;
});
lib_1.except_success(() => {
    let now = new Date();
    now.setDate(now.getDate() + 1);
    bean.value_futureList = [now];
});
lib_1.except_fail(() => {
    let now = new Date();
    now.setDate(now.getDate() - 1);
    bean.value_futureList = [now];
}, () => {
    bean.value_futureList = ['n'];
}, () => {
    bean.value_futureList = {};
});
lib_1.except_success(() => {
    bean.value_futureOrPresent = null;
    bean.value_futureOrPresent = undefined;
    let now = new Date();
    now.setDate(now.getDate());
    bean.value_futureOrPresent = now;
});
lib_1.except_fail(() => {
    let now = new Date();
    now.setDate(now.getDate() - 1);
    bean.value_futureOrPresent = now;
});
lib_1.except_success(() => {
    let now = new Date();
    now.setDate(now.getDate());
    bean.value_futureOrPresentList = [now];
});
lib_1.except_fail(() => {
    let now = new Date();
    now.setDate(now.getDate() - 1);
    bean.value_futureOrPresentList = [now];
}, () => {
    bean.value_futureOrPresentList = ['n'];
}, () => {
    bean.value_futureOrPresentList = {};
});
lib_1.except_success(() => {
    bean.value_past = null;
    bean.value_past = undefined;
    let now = new Date();
    now.setDate(now.getDate() - 1);
    bean.value_past = now;
});
lib_1.except_fail(() => {
    let now = new Date();
    now.setDate(now.getDate() + 1);
    bean.value_past = now;
});
lib_1.except_success(() => {
    let now = new Date();
    now.setDate(now.getDate() - 1);
    bean.value_pastList = [now];
});
lib_1.except_fail(() => {
    let now = new Date();
    now.setDate(now.getDate() + 1);
    bean.value_pastList = [now];
}, () => {
    bean.value_pastList = ['n'];
}, () => {
    bean.value_pastList = {};
});
lib_1.except_success(() => {
    bean.value_pastOrPresent = null;
    bean.value_pastOrPresent = undefined;
    let now = new Date();
    now.setDate(now.getDate());
    bean.value_pastOrPresent = now;
});
lib_1.except_fail(() => {
    let now = new Date();
    now.setDate(now.getDate() + 1);
    bean.value_pastOrPresent = now;
});
lib_1.except_success(() => {
    let now = new Date();
    now.setDate(now.getDate());
    bean.value_pastOrPresentList = [now];
});
lib_1.except_fail(() => {
    let now = new Date();
    now.setDate(now.getDate() + 1);
    bean.value_pastOrPresentList = [now];
}, () => {
    bean.value_pastOrPresentList = ['n'];
}, () => {
    bean.value_pastOrPresentList = {};
});
//# sourceMappingURL=spring.js.map