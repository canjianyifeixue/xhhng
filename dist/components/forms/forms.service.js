"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("./dynamic-form/index");
var index_2 = require("./step-form/index");
var index_3 = require("./search-form/index");
var MhFormsService = /** @class */ (function () {
    function MhFormsService(dialog) {
        this.dialog = dialog;
    }
    /**
     * 打开动态表单
     * elements:动态表单ID
     * default:动态表单默认值(属性数等于组件数)
     * @param opt
     *
     */
    MhFormsService.prototype.openDynamicForm = function (opt) {
        return this.dialog.open(index_1.DynamicEntryComponent, {
            width: opt.width || '70%',
            data: {
                title: opt.title || '动态表单',
                elements: opt.elements || [],
                default: opt.default || null,
                showActions: opt.showActions,
            }
        }).afterClosed().filter(function (_) { return _; });
    };
    /**
     * 打开步骤表单
     * @param opt
     */
    MhFormsService.prototype.openStepForm = function (opt) {
        return this.dialog.open(index_2.StepEntryComponent, {
            width: opt.width || '70%',
            data: {
                title: opt.title || '步骤表单',
                forms: opt.forms || [],
                default: opt.default || null,
                showActions: opt.showActions,
            }
        }).afterClosed().filter(function (_) { return _; });
    };
    /**
     * 打开查询表单
     * @param opt
     */
    MhFormsService.prototype.openSearchForm = function (opt) {
        return this.dialog.open(index_3.SearchEntryComponent, {
            width: opt.width || '70%',
            data: {
                title: opt.title || '查询表单',
                elements: opt.elements || [],
                default: opt.default || null,
                showActions: opt.showActions,
            }
        }).afterClosed().filter(function (_) { return _; });
    };
    MhFormsService = __decorate([
        core_1.Injectable()
    ], MhFormsService);
    return MhFormsService;
}());
exports.MhFormsService = MhFormsService;
