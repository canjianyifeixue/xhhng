/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ViewChild, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
var StepEntryComponent = (function () {
    function StepEntryComponent(dialogData, dialogRef) {
        this.dialogData = dialogData;
        this.dialogRef = dialogRef;
        this.title = this.dialogData.title || '表单';
        this.forms = this.dialogData.forms || [];
        this.default = this.dialogData.default || null;
        this.showActions = this.dialogData.showActions === false ? false : true;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    StepEntryComponent.prototype.save = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.dialogRef.close(value);
    };
    StepEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-step-entry',
                    template: "<div style=\"font-size: 15px;margin-bottom:15px\">{{title}}</div> <mat-dialog-content> <mh-step-form #form [forms]=\"forms\" [mode]=\"'horizontal'\" [default]=\"default\"></mh-step-form> </mat-dialog-content> <mat-dialog-actions align=\"end\"> <button *ngIf=\"showActions\" mat-button [disabled]=\"!form.valid\" (click)=\"save(form.value)\" class=\"btn-blue\">确定</button> <button mat-button mat-dialog-close class=\"btn-gray\">取消</button> </mat-dialog-actions> ",
                },] },
    ];
    /** @nocollapse */
    StepEntryComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
        { type: MatDialogRef, },
    ]; };
    StepEntryComponent.propDecorators = {
        "formRef": [{ type: ViewChild, args: ['form',] },],
    };
    return StepEntryComponent;
}());
export { StepEntryComponent };
function StepEntryComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    StepEntryComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    StepEntryComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    StepEntryComponent.propDecorators;
    /** @type {?} */
    StepEntryComponent.prototype.formRef;
    /** @type {?} */
    StepEntryComponent.prototype.showActions;
    /** @type {?} */
    StepEntryComponent.prototype.title;
    /** @type {?} */
    StepEntryComponent.prototype.forms;
    /** @type {?} */
    StepEntryComponent.prototype.default;
    /** @type {?} */
    StepEntryComponent.prototype.dialogData;
    /** @type {?} */
    StepEntryComponent.prototype.dialogRef;
}
