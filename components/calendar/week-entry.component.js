/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
var WeekEntryComponent = (function () {
    function WeekEntryComponent(dialogData, dialogRef) {
        this.dialogData = dialogData;
        this.dialogRef = dialogRef;
        this.title = this.dialogData.title || '周视图';
        this.ddCampus = this.dialogData.ddCampus || null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    WeekEntryComponent.prototype.save = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.dialogRef.close(value);
    };
    WeekEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-week-entry',
                    template: "<div style=\"font-size: 15px;margin-bottom:15px\">{{title}}</div> <mat-dialog-content> <mh-week-view [ddCampus]=\"ddCampus\" (select)=\"save($event)\"></mh-week-view> </mat-dialog-content> ",
                },] },
    ];
    /** @nocollapse */
    WeekEntryComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
        { type: MatDialogRef, },
    ]; };
    return WeekEntryComponent;
}());
export { WeekEntryComponent };
function WeekEntryComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeekEntryComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeekEntryComponent.ctorParameters;
    /** @type {?} */
    WeekEntryComponent.prototype.title;
    /** @type {?} */
    WeekEntryComponent.prototype.ddCampus;
    /** @type {?} */
    WeekEntryComponent.prototype.dialogData;
    /** @type {?} */
    WeekEntryComponent.prototype.dialogRef;
}
