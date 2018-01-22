/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { NotificationService } from "../../services/index";
var ExportDialogComponent = (function () {
    function ExportDialogComponent(notificationService, dialogRef, dialogData) {
        this.notificationService = notificationService;
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this.checkedAll = false;
        this.selectedCols = [];
        this.data = this.dialogData.data;
        var /** @type {?} */ columns = this.dialogData.columns;
        this.columns = [];
        this.value = [];
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var col = columns_1[_i];
            if (this.data[0][col.name]) {
                this.columns = this.columns.concat([col]);
                this.value.push(false);
            }
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    ExportDialogComponent.prototype.change = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var /** @type {?} */ value = this.columns[index];
        var /** @type {?} */ i = this.selectedCols.indexOf(value);
        if (i >= 0) {
            this.selectedCols = this.selectedCols.slice(0, i).concat(this.selectedCols.slice(i + 1));
        }
        else {
            this.selectedCols = this.selectedCols.concat([
                value
            ]);
        }
        this.checkedAll = this.selectedCols.length === this.columns.length ? true : false;
    };
    /**
     * @return {?}
     */
    ExportDialogComponent.prototype.selectedAll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.checkedAll) {
            for (var /** @type {?} */ i = 0; i < this.value.length; i++) {
                this.value[i] = true;
            }
            this.selectedCols = [];
            this.columns.forEach(function (_) { return _this.selectedCols.push(_); });
        }
        else {
            for (var /** @type {?} */ i = 0; i < this.value.length; i++) {
                this.value[i] = false;
            }
            this.selectedCols = [];
        }
    };
    /**
     * @return {?}
     */
    ExportDialogComponent.prototype.export = /**
     * @return {?}
     */
    function () {
        if (this.selectedCols.length <= 0) {
            this.notificationService.error('请选择导出列');
            return;
        }
        this.dialogRef.close(this.selectedCols);
    };
    ExportDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-export-dialog',
                    template: "<div style=\"font-size: 15px;margin-bottom:15px\">数据导出</div> <mat-dialog-content> <p>即将导出 {{data.length}} 条数据</p> <p>请选择导出列 <mat-checkbox name=\"check\" [(ngModel)]=\"checkedAll\" (change)=\"selectedAll()\">全选</mat-checkbox> </p> <div layout=\"row\" layout-wrap> <div *ngFor=\"let col of columns;let index=index\" flex-xs=\"25\" flex-gt-xs=\"15\" layout=\"row\"> <mat-checkbox flex=\"95\" (change)=\"change(index)\" [(ngModel)]=\"value[index]\" [name]=\"col.name\"> {{col.label}} </mat-checkbox> </div> </div> </mat-dialog-content> <mat-dialog-actions align=\"end\"> <button mat-button (click)=\"export()\" class=\"btn-green\">确定</button> <button mat-button mat-dialog-close  class=\"btn-gray\">取消</button> </mat-dialog-actions> ",
                },] },
    ];
    /** @nocollapse */
    ExportDialogComponent.ctorParameters = function () { return [
        { type: NotificationService, },
        { type: MatDialogRef, },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
    ]; };
    return ExportDialogComponent;
}());
export { ExportDialogComponent };
function ExportDialogComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ExportDialogComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ExportDialogComponent.ctorParameters;
    /** @type {?} */
    ExportDialogComponent.prototype.checkedAll;
    /** @type {?} */
    ExportDialogComponent.prototype.data;
    /** @type {?} */
    ExportDialogComponent.prototype.columns;
    /** @type {?} */
    ExportDialogComponent.prototype.value;
    /** @type {?} */
    ExportDialogComponent.prototype.selectedCols;
    /** @type {?} */
    ExportDialogComponent.prototype.notificationService;
    /** @type {?} */
    ExportDialogComponent.prototype.dialogRef;
    /** @type {?} */
    ExportDialogComponent.prototype.dialogData;
}
