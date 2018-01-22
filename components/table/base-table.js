/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ViewChild } from "@angular/core";
import { TdDataTableSortingOrder } from "@covalent/core";
import { fusejs as Fuse } from "../../util/fuse-js";
/**
 * 封装基本页面表格数据相关写法
 * 例如：模糊查询、分页处理等
 * @abstract
 */
var BaseTable = (function () {
    function BaseTable(_dataTableService, _cdr) {
        this._dataTableService = _dataTableService;
        this._cdr = _cdr;
        this.columns = [];
        this.data = [];
        this.filteredData = this.data;
        this.filteredTotal = this.data.length;
        this.fuseOptions = {
            threshold: 0.1,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [],
        };
        this.searchTerm = '';
        this.fromRow = 1;
        this.currentPage = 1;
        this.pageSize = 5;
        this.sortBy = '';
        this.sortOrder = TdDataTableSortingOrder.Ascending;
    }
    /**
     * @param {?} sortEvent
     * @return {?}
     */
    BaseTable.prototype.sort = /**
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
    BaseTable.prototype.search = /**
     * @param {?} searchTerm
     * @return {?}
     */
    function (searchTerm) {
        this.searchTerm = searchTerm;
        this.pagingBar.navigateToPage(1);
        this.filter();
    };
    /**
     * @param {?} pagingEvent
     * @return {?}
     */
    BaseTable.prototype.page = /**
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
    BaseTable.prototype.filter = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ newData = this.data;
        // newData = this._dataTableService.filterData(newData, this.searchTerm, true);
        if (this.searchTerm && this.searchTerm.length > 0 && this.data.length > 0) {
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
    BaseTable.prototype.detectChanges = /**
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
    BaseTable.propDecorators = {
        "pagingBar": [{ type: ViewChild, args: ['pagingBar',] },],
    };
    return BaseTable;
}());
export { BaseTable };
function BaseTable_tsickle_Closure_declarations() {
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    BaseTable.propDecorators;
    /** @type {?} */
    BaseTable.prototype.columns;
    /** @type {?} */
    BaseTable.prototype.data;
    /** @type {?} */
    BaseTable.prototype.filteredData;
    /** @type {?} */
    BaseTable.prototype.filteredTotal;
    /** @type {?} */
    BaseTable.prototype.pagingBar;
    /** @type {?} */
    BaseTable.prototype.fuse;
    /** @type {?} */
    BaseTable.prototype.fuseOptions;
    /** @type {?} */
    BaseTable.prototype.searchTerm;
    /** @type {?} */
    BaseTable.prototype.fromRow;
    /** @type {?} */
    BaseTable.prototype.currentPage;
    /** @type {?} */
    BaseTable.prototype.pageSize;
    /** @type {?} */
    BaseTable.prototype.sortBy;
    /** @type {?} */
    BaseTable.prototype.sortOrder;
    /** @type {?} */
    BaseTable.prototype._dataTableService;
    /** @type {?} */
    BaseTable.prototype._cdr;
}
