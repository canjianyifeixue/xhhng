/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject, ChangeDetectorRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TdDataTableSortingOrder, TdDataTableService } from "@covalent/core";
import { fusejs as Fuse } from "../../../../util/fuse-js";
var MhDynamicDialogEntryComponent = (function () {
    function MhDynamicDialogEntryComponent(_dataTableService, dialogRef, dialogData, _cdr) {
        this._dataTableService = _dataTableService;
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this._cdr = _cdr;
        this.filterColumns = ['_number', '_$id_', '_$state_', 'id', 'parentId'];
        this.columns = [{ name: '_number', label: '序号' }];
        this.data = [];
        this.filteredData = this.data;
        this.filteredTotal = this.data.length;
        this.multiple = false;
        this.selectedRows = [];
        this.searchTerm = '';
        this.fromRow = 1;
        this.currentPage = 1;
        this.pageSize = 5;
        this.sortBy = '_number';
        this.sortOrder = TdDataTableSortingOrder.Ascending;
        this.fuseOptions = {
            threshold: 0.1,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [],
        };
    }
    /**
     * @return {?}
     */
    MhDynamicDialogEntryComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ data = this.dialogData;
        this.label = data.label;
        this.data = data.data;
        this.multiple = data.multiple || false;
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
     * @param {?} sortEvent
     * @return {?}
     */
    MhDynamicDialogEntryComponent.prototype.sort = /**
     * @param {?} sortEvent
     * @return {?}
     */
    function (sortEvent) {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    };
    /**
     * @param {?} searchTerm
     * @return {?}
     */
    MhDynamicDialogEntryComponent.prototype.search = /**
     * @param {?} searchTerm
     * @return {?}
     */
    function (searchTerm) {
        this.searchTerm = searchTerm;
        this.filter();
    };
    /**
     * @param {?} pagingEvent
     * @return {?}
     */
    MhDynamicDialogEntryComponent.prototype.page = /**
     * @param {?} pagingEvent
     * @return {?}
     */
    function (pagingEvent) {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
        this.filter();
    };
    /**
     * @return {?}
     */
    MhDynamicDialogEntryComponent.prototype.filter = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ newData = this.data;
        // newData = this._dataTableService.filterData(newData, this.searchTerm, true);
        if (this.searchTerm.length > 0) {
            this.fuseOptions.keys = Object.keys(this.data[0]);
            this.fuse = new Fuse(newData, this.fuseOptions);
            newData = this.fuse.search(this.searchTerm);
        }
        this.filteredTotal = newData.length;
        newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
        newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
        this.filteredData = newData;
        this.detectChanges();
    };
    /**
     * @return {?}
     */
    MhDynamicDialogEntryComponent.prototype.detectChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            if (_this._cdr !== null &&
                _this._cdr !== undefined &&
                !(/** @type {?} */ (_this._cdr)).destroyed) {
                _this._cdr.detectChanges();
            }
        }, 250);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MhDynamicDialogEntryComponent.prototype.select = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.multiple) {
            this.dialogRef.close(value.row);
            return;
        }
    };
    /**
     * @return {?}
     */
    MhDynamicDialogEntryComponent.prototype.multSelect = /**
     * @return {?}
     */
    function () {
        if (this.selectedRows.length > 0) {
            this.dialogRef.close(this.selectedRows);
        }
    };
    MhDynamicDialogEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-dialog-entry',
                    template: "<mat-dialog-content> <div layout=\"row\" layout-align=\"start center\" class=\"pad-left-sm pad-right-sm\"> <span *ngIf=\"!searchBox.searchVisible\" class=\"push-left-sm\"> <span class=\"mat-title\">{{label}}</span> </span> <td-search-box #searchBox backIcon=\"arrow_back\" class=\"push-right-sm\" placeholder=\"在此输入搜索信息\" (searchDebounce)=\"search($event)\" flex> </td-search-box> </div> <mat-divider></mat-divider> <td-data-table #dataTable [data]=\"filteredData\" [columns]=\"columns\" [sortable]=\"true\" [sortBy]=\"sortBy\" [sortOrder]=\"sortOrder\" (sortChange)=\"sort($event)\" selectable=\"true\" [multiple]=\"multiple\" (rowSelect)=\"select($event)\" [(ngModel)]=\"selectedRows\"> </td-data-table> <div class=\"mat-padding\" *ngIf=\"!dataTable.hasData\" layout=\"row\" layout-align=\"center center\"> <h3>暂无数据！</h3> </div> <td-paging-bar #pagingBar [total]=\"filteredTotal\" [pageSize]=\"pageSize\" (change)=\"page($event)\"> <span td-paging-bar-label hide-xs>每行显示:</span> <mat-select [style.width.px]=\"50\" [(ngModel)]=\"pageSize\"> <mat-option *ngFor=\"let size of [5,10,15,20,50]\" [value]=\"size\"> {{size}} </mat-option> </mat-select> <span>{{'第 '+pagingBar.range+' 条   共 '+pagingBar.total+' 条'}}</span> </td-paging-bar> </mat-dialog-content> <mat-dialog-actions align=\"end\"> <button *ngIf=\"multiple\" mat-button (click)=\"multSelect()\"><mat-icon color=\"accent\">save</mat-icon>确定</button> <button mat-button mat-dialog-close><mat-icon color=\"warn\">cancel</mat-icon>取消</button> </mat-dialog-actions> ",
                },] },
    ];
    /** @nocollapse */
    MhDynamicDialogEntryComponent.ctorParameters = function () { return [
        { type: TdDataTableService, },
        { type: MatDialogRef, },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
        { type: ChangeDetectorRef, },
    ]; };
    return MhDynamicDialogEntryComponent;
}());
export { MhDynamicDialogEntryComponent };
function MhDynamicDialogEntryComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicDialogEntryComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicDialogEntryComponent.ctorParameters;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.filterColumns;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.label;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.columns;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.data;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.filteredData;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.filteredTotal;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.multiple;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.selectedRows;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.searchTerm;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.fromRow;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.currentPage;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.pageSize;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.sortBy;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.sortOrder;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.fuse;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.fuseOptions;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype._dataTableService;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.dialogRef;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype.dialogData;
    /** @type {?} */
    MhDynamicDialogEntryComponent.prototype._cdr;
}
