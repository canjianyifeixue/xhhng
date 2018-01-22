/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MhDynamicFormElement, MhFormsService } from "../forms/index";
var TaskFormComponent = (function () {
    function TaskFormComponent(formsService) {
        this.formsService = formsService;
        this.editable = false;
        this.close = new EventEmitter();
        this.showDialog = true;
        this.elements = [];
    }
    /**
     * @return {?}
     */
    TaskFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.default = this.data.processData;
        if (this.editable) {
            this.opinion = JSON.parse(this.data.processVar).opinion;
            this.elements = [
                {
                    name: 'complete',
                    label: '是否重新提交',
                    type: MhDynamicFormElement.Radio,
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
                    type: MhDynamicFormElement.Radio,
                    selections: [{ key: 'true', value: '通过' }, { key: 'false', value: '驳回' }],
                    flex: 45,
                    required: true
                },
                {
                    name: 'opinion',
                    label: '审核意见',
                    type: MhDynamicFormElement.Textarea,
                    flex: 95
                }
            ];
        }
    };
    /**
     * @return {?}
     */
    TaskFormComponent.prototype.open = /**
     * @return {?}
     */
    function () {
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
    /**
     * @param {?} value
     * @return {?}
     */
    TaskFormComponent.prototype.save = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.editable && this.formData) {
            this.close.emit(Object.assign(value, { formData: this.formData }));
        }
        else {
            this.close.emit(value);
        }
    };
    /**
     * @return {?}
     */
    TaskFormComponent.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.close.emit();
    };
    TaskFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-task-form',
                    template: "<div layout=\"row\"> <div flex-gt-sm=\"100\"> <mat-card> <mat-card-title>任务办理</mat-card-title> <mat-card-content> <div> <button *ngIf=\"showDialog\" mat-button (click)=\"open()\"><mat-icon color=\"accent\">announcement</mat-icon>{{editable? '调整表单数据':'审核表单数据'}}</button> <p *ngIf=\"!showDialog\" flex=\"20\" flex-offset=\"2\" style=\"padding:16px\">表单数据:</p> <mh-step-form #dataForm *ngIf=\"!showDialog\" flex [forms]=\"forms\" [mode]=\"'horizontal'\" [default]=\"default\"></mh-step-form> </div> <div *ngIf=\"editable\" layout=\"row\" style=\"padding:16px\"> <p flex=\"10\" flex-offset=\"2\">驳回意见:</p> <p flex=\"88\">{{opinion}}</p> </div> <mh-dynamic-form #form [elements]=\"elements\"></mh-dynamic-form> </mat-card-content> <mat-card-actions align=\"end\"> <button mat-button [disabled]=\"!form.valid\" (click)=\"save(form.value)\"><mat-icon color=\"accent\">save</mat-icon>提交</button> <button mat-button (click)=\"cancel()\"><mat-icon color=\"warn\">cancel</mat-icon>取消</button> </mat-card-actions> </mat-card> </div> </div> ",
                },] },
    ];
    /** @nocollapse */
    TaskFormComponent.ctorParameters = function () { return [
        { type: MhFormsService, },
    ]; };
    TaskFormComponent.propDecorators = {
        "forms": [{ type: Input },],
        "data": [{ type: Input },],
        "editable": [{ type: Input },],
        "close": [{ type: Output },],
        "showDialog": [{ type: Input },],
    };
    return TaskFormComponent;
}());
export { TaskFormComponent };
function TaskFormComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TaskFormComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TaskFormComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TaskFormComponent.propDecorators;
    /** @type {?} */
    TaskFormComponent.prototype.forms;
    /** @type {?} */
    TaskFormComponent.prototype.data;
    /** @type {?} */
    TaskFormComponent.prototype.editable;
    /** @type {?} */
    TaskFormComponent.prototype.close;
    /** @type {?} */
    TaskFormComponent.prototype.showDialog;
    /** @type {?} */
    TaskFormComponent.prototype.opinion;
    /** @type {?} */
    TaskFormComponent.prototype.formData;
    /** @type {?} */
    TaskFormComponent.prototype.default;
    /** @type {?} */
    TaskFormComponent.prototype.elements;
    /** @type {?} */
    TaskFormComponent.prototype.formsService;
}
