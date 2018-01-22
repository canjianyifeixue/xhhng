/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
var ConfirmEntryComponent = (function () {
    function ConfirmEntryComponent(dialogData, dialogRef) {
        this.dialogData = dialogData;
        this.dialogRef = dialogRef;
        this.actions = [];
        this.actions = this.dialogData.actions;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    ConfirmEntryComponent.prototype.close = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.dialogRef.close(key);
    };
    ConfirmEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-confirm-entry',
                    template: "<mat-dialog-content class=\"push-bottom-sm\"> <span>请选择要进行的操作</span> </mat-dialog-content> <mat-dialog-actions align=\"end\"> <div layout=\"row\"> <button flex mat-button mat-dialog-close>取消</button> <button flex mat-button *ngFor=\"let btn of actions\" (click)=\"close(btn.key)\" color=\"accent\">{{btn.label}}</button> </div> </mat-dialog-actions> "
                },] },
    ];
    /** @nocollapse */
    ConfirmEntryComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
        { type: MatDialogRef, },
    ]; };
    return ConfirmEntryComponent;
}());
export { ConfirmEntryComponent };
function ConfirmEntryComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ConfirmEntryComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ConfirmEntryComponent.ctorParameters;
    /** @type {?} */
    ConfirmEntryComponent.prototype.actions;
    /** @type {?} */
    ConfirmEntryComponent.prototype.dialogData;
    /** @type {?} */
    ConfirmEntryComponent.prototype.dialogRef;
}
