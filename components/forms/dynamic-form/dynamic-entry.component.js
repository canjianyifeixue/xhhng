/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ViewChild, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ToolService } from "../../../services/index";
var DynamicEntryComponent = (function () {
    function DynamicEntryComponent(dialogData, dialogRef, toolService) {
        this.dialogData = dialogData;
        this.dialogRef = dialogRef;
        this.toolService = toolService;
        this.title = this.dialogData.title || '表单';
        this.elements = this.dialogData.elements || [];
        this.default = this.dialogData.default;
        this.showActions = this.dialogData.showActions === false ? false : true;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    DynamicEntryComponent.prototype.save = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.default) {
            value = this.toolService.filterField(this.default, value);
        }
        this.dialogRef.close(value);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    DynamicEntryComponent.prototype.change = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // nothing to do.
    };
    DynamicEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-entry',
                    template: "<div style=\"font-size: 15px;margin-bottom:15px\">{{title}}</div> <mat-dialog-content> <mh-dynamic-form #form [elements]=\"elements\" [default]=\"default\" (change)=\"change($event)\"> </mh-dynamic-form> </mat-dialog-content> <mat-dialog-actions align=\"end\"> <button mat-button *ngIf=\"showActions\" [disabled]=\"!form.valid\" (click)=\"save(form.value)\" class=\"btn-blue\">确定</button> <button mat-button mat-dialog-close class=\"btn-lightgray\">取消</button> </mat-dialog-actions> ",
                },] },
    ];
    /** @nocollapse */
    DynamicEntryComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
        { type: MatDialogRef, },
        { type: ToolService, },
    ]; };
    DynamicEntryComponent.propDecorators = {
        "formRef": [{ type: ViewChild, args: ['form',] },],
    };
    return DynamicEntryComponent;
}());
export { DynamicEntryComponent };
function DynamicEntryComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DynamicEntryComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DynamicEntryComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DynamicEntryComponent.propDecorators;
    /** @type {?} */
    DynamicEntryComponent.prototype.formRef;
    /** @type {?} */
    DynamicEntryComponent.prototype.showActions;
    /** @type {?} */
    DynamicEntryComponent.prototype.title;
    /** @type {?} */
    DynamicEntryComponent.prototype.elements;
    /** @type {?} */
    DynamicEntryComponent.prototype.default;
    /** @type {?} */
    DynamicEntryComponent.prototype.dialogData;
    /** @type {?} */
    DynamicEntryComponent.prototype.dialogRef;
    /** @type {?} */
    DynamicEntryComponent.prototype.toolService;
}
