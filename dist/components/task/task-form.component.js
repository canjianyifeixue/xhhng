"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../forms/index");
var TaskFormComponent = /** @class */ (function () {
    function TaskFormComponent(formsService) {
        this.formsService = formsService;
        this.editable = false;
        this.close = new core_1.EventEmitter();
        this.showDialog = true;
        this.elements = [];
    }
    TaskFormComponent.prototype.ngOnInit = function () {
        this.default = this.data.processData;
        if (this.editable) {
            this.opinion = JSON.parse(this.data.processVar).opinion;
            this.elements = [
                {
                    name: 'complete',
                    label: '是否重新提交',
                    type: index_1.MhDynamicFormElement.Radio,
                    selections: [{ key: 'true', value: '重新提交' }, { key: 'false', value: '废弃' }],
                    flex: 45,
                    required: true
                }
            ];
        }
        else {
            this.elements = [
                {
                    name: 'complete',
                    label: '审核结果',
                    type: index_1.MhDynamicFormElement.Radio,
                    selections: [{ key: 'true', value: '通过' }, { key: 'false', value: '驳回' }],
                    flex: 45,
                    required: true
                },
                {
                    name: 'opinion',
                    label: '审核意见',
                    type: index_1.MhDynamicFormElement.Textarea,
                    flex: 95
                }
            ];
        }
    };
    TaskFormComponent.prototype.open = function () {
        var _this = this;
        this.formsService.openStepForm({
            forms: this.forms,
            default: this.default,
            title: '数据审核',
            showActions: this.editable
        }).subscribe(function (_) {
            if (_this.editable) {
                _this.formData = _;
            }
        });
    };
    TaskFormComponent.prototype.save = function (value) {
        if (this.editable && this.formData) {
            this.close.emit(Object.assign(value, { formData: this.formData }));
        }
        else {
            this.close.emit(value);
        }
    };
    TaskFormComponent.prototype.cancel = function () {
        this.close.emit();
    };
    __decorate([
        core_1.Input()
    ], TaskFormComponent.prototype, "forms", void 0);
    __decorate([
        core_1.Input()
    ], TaskFormComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input()
    ], TaskFormComponent.prototype, "editable", void 0);
    __decorate([
        core_1.Output()
    ], TaskFormComponent.prototype, "close", void 0);
    __decorate([
        core_1.Input()
    ], TaskFormComponent.prototype, "showDialog", void 0);
    TaskFormComponent = __decorate([
        core_1.Component({
            selector: 'mh-task-form',
            templateUrl: './task-form.component.html',
        })
    ], TaskFormComponent);
    return TaskFormComponent;
}());
exports.TaskFormComponent = TaskFormComponent;
