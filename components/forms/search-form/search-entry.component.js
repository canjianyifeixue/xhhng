/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ViewChild, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
var SearchEntryComponent = (function () {
    function SearchEntryComponent(dialogData, dialogRef) {
        this.dialogData = dialogData;
        this.dialogRef = dialogRef;
        this.title = this.dialogData.title || '表单';
        this.elements = this.dialogData.elements || [];
        this.default = this.dialogData.default || null;
        this.showActions = this.dialogData.showActions === false ? false : true;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    SearchEntryComponent.prototype.save = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.dialogRef.close(value);
    };
    SearchEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-search-entry',
                    template: "<div style=\"font-size: 15px;margin-bottom:15px\">{{title}}</div> <mat-dialog-content> <mh-search-form #form [elements]=\"elements\" [value]=\"default\" (selected)=\"save($event)\"></mh-search-form> </mat-dialog-content> <mat-dialog-actions align=\"end\"> <button *ngIf=\"showActions\" mat-button (click)=\"save(form.value)\" class=\"btn-blue\">确定</button> <button mat-button mat-dialog-close  class=\"btn-gray\">取消</button> </mat-dialog-actions> ",
                },] },
    ];
    /** @nocollapse */
    SearchEntryComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
        { type: MatDialogRef, },
    ]; };
    SearchEntryComponent.propDecorators = {
        "formRef": [{ type: ViewChild, args: ['form',] },],
    };
    return SearchEntryComponent;
}());
export { SearchEntryComponent };
function SearchEntryComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SearchEntryComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SearchEntryComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SearchEntryComponent.propDecorators;
    /** @type {?} */
    SearchEntryComponent.prototype.formRef;
    /** @type {?} */
    SearchEntryComponent.prototype.showActions;
    /** @type {?} */
    SearchEntryComponent.prototype.title;
    /** @type {?} */
    SearchEntryComponent.prototype.elements;
    /** @type {?} */
    SearchEntryComponent.prototype.default;
    /** @type {?} */
    SearchEntryComponent.prototype.dialogData;
    /** @type {?} */
    SearchEntryComponent.prototype.dialogRef;
}
