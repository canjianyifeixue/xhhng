var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject, ChangeDetectorRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TdDataTableService } from "@covalent/core";
import { BaseTable } from "./base-table";
var TableEntryComponent = (function (_super) {
    __extends(TableEntryComponent, _super);
    function TableEntryComponent(dataTableService, dialogRef, dialogData, cdr) {
        var _this = _super.call(this, dataTableService, cdr) || this;
        _this.dialogRef = dialogRef;
        _this.dialogData = dialogData;
        _this.filterColumns = ['_number', '_$id_', '_$state_', 'id', 'parentId'];
        _this.selected = false;
        _this.multiple = false;
        _this.selectedRows = [];
        return _this;
    }
    /**
     * @return {?}
     */
    TableEntryComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ data = this.dialogData;
        this.label = data.label;
        this.data = data.data;
        this.selected = data.select === true ? true : false;
        this.multiple = data.multiple === true ? true : false;
        this.selectedRows = [];
        var /** @type {?} */ columns = data.columns || [];
        // col初始化
        if (this.data.length <= 0) {
            return;
        }
        var /** @type {?} */ colMap = [];
        columns.forEach(function (e) { return colMap.push(e.name); });
        for (var _i = 0, _a = Object.keys(this.data[0]); _i < _a.length; _i++) {
            var col = _a[_i];
            if (this.filterColumns.indexOf(col) < 0) {
                var /** @type {?} */ index = colMap.indexOf(col);
                this.columns = this.columns.concat([
                    { name: col, label: index >= 0 ? columns[index].label : col }
                ]);
            }
        }
        for (var /** @type {?} */ i = 0; i < this.data.length; i++) {
            this.data[i]._number = i + 1;
        }
        this.filter();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TableEntryComponent.prototype.select = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.multiple) {
            this.dialogRef.close(value.row);
        }
    };
    /**
     * @return {?}
     */
    TableEntryComponent.prototype.multSelect = /**
     * @return {?}
     */
    function () {
        if (this.selectedRows.length > 0) {
            this.dialogRef.close(this.selectedRows);
        }
    };
    TableEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-table-entry',
                    template: "<mat-dialog-content> <div layout=\"row\" layout-align=\"start center\" class=\"pad-left-sm pad-right-sm\"> <span *ngIf=\"!searchBox.searchVisible\" class=\"push-left-sm\"> <div style=\"font-size: 15px;margin-bottom:15px\">{{label}}</div> </span> <td-search-box #searchBox backIcon=\"arrow_back\" class=\"push-right-sm\" placeholder=\"在此输入搜索信息\" (searchDebounce)=\"search($event)\" flex> </td-search-box> </div> <mat-divider></mat-divider> <td-data-table #dataTable [data]=\"filteredData\" [columns]=\"columns\" [sortable]=\"true\" [sortBy]=\"sortBy\" [sortOrder]=\"sortOrder\" (sortChange)=\"sort($event)\" [selectable]=\"selected\" [multiple]=\"multiple\" (rowSelect)=\"select($event)\" [(ngModel)]=\"selectedRows\"> </td-data-table> <div class=\"mat-padding\" *ngIf=\"!dataTable.hasData\" layout=\"row\" layout-align=\"center center\"> <h3>暂无数据！</h3> </div> <td-paging-bar #pagingBar [total]=\"filteredTotal\" [pageSize]=\"pageSize\" (change)=\"page($event)\"> <span td-paging-bar-label hide-xs>每行显示:</span> <mat-select [style.width.px]=\"50\" [(ngModel)]=\"pageSize\"> <mat-option *ngFor=\"let size of [5,10,15,20,50]\" [value]=\"size\"> {{size}} </mat-option> </mat-select> <span>{{'第 '+pagingBar.range+' 条 共 '+pagingBar.total+' 条'}}</span> </td-paging-bar> </mat-dialog-content> <mat-dialog-actions align=\"end\"> <button *ngIf=\"multiple\" mat-button (click)=\"multSelect()\" class=\"btn-blue\">确定</button> <button mat-button mat-dialog-close class=\"btn-gray\">取消</button> </mat-dialog-actions> ",
                },] },
    ];
    /** @nocollapse */
    TableEntryComponent.ctorParameters = function () { return [
        { type: TdDataTableService, },
        { type: MatDialogRef, },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
        { type: ChangeDetectorRef, },
    ]; };
    return TableEntryComponent;
}(BaseTable));
export { TableEntryComponent };
function TableEntryComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TableEntryComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TableEntryComponent.ctorParameters;
    /** @type {?} */
    TableEntryComponent.prototype.label;
    /** @type {?} */
    TableEntryComponent.prototype.filterColumns;
    /** @type {?} */
    TableEntryComponent.prototype.selected;
    /** @type {?} */
    TableEntryComponent.prototype.multiple;
    /** @type {?} */
    TableEntryComponent.prototype.selectedRows;
    /** @type {?} */
    TableEntryComponent.prototype.dialogRef;
    /** @type {?} */
    TableEntryComponent.prototype.dialogData;
}
