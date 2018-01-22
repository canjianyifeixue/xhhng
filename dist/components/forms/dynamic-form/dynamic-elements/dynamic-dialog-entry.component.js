"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var core_2 = require("@covalent/core");
var fuse_js_1 = require("../../../../util/fuse-js");
var MhDynamicDialogEntryComponent = /** @class */ (function () {
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
        this.sortOrder = core_2.TdDataTableSortingOrder.Ascending;
        this.fuseOptions = {
            threshold: 0.1,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [],
        };
    }
    MhDynamicDialogEntryComponent.prototype.ngOnInit = function () {
        var data = this.dialogData;
        this.label = data.label;
        this.data = data.data;
        this.multiple = data.multiple || false;
        this.selectedRows = [];
        var columns = data.columns || [];
        // col初始化
        if (this.data.length <= 0) {
            return;
        }
        var colMap = [];
        columns.forEach(function (e) { return colMap.push(e.name); });
        for (var _i = 0, _a = Object.keys(this.data[0]); _i < _a.length; _i++) {
            var col = _a[_i];
            if (this.filterColumns.indexOf(col) < 0) {
                var index = colMap.indexOf(col);
                this.columns = this.columns.concat([
                    { name: col, label: index >= 0 ? columns[index].label : col }
                ]);
            }
        }
        for (var i = 0; i < this.data.length; i++) {
            this.data[i]._number = i + 1;
        }
        this.filter();
    };
    MhDynamicDialogEntryComponent.prototype.sort = function (sortEvent) {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    };
    MhDynamicDialogEntryComponent.prototype.search = function (searchTerm) {
        this.searchTerm = searchTerm;
        this.filter();
    };
    MhDynamicDialogEntryComponent.prototype.page = function (pagingEvent) {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
        this.filter();
    };
    MhDynamicDialogEntryComponent.prototype.filter = function () {
        var newData = this.data;
        // newData = this._dataTableService.filterData(newData, this.searchTerm, true);
        if (this.searchTerm.length > 0) {
            this.fuseOptions.keys = Object.keys(this.data[0]);
            this.fuse = new fuse_js_1.fusejs(newData, this.fuseOptions);
            newData = this.fuse.search(this.searchTerm);
        }
        this.filteredTotal = newData.length;
        newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
        newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
        this.filteredData = newData;
        this.detectChanges();
    };
    MhDynamicDialogEntryComponent.prototype.detectChanges = function () {
        var _this = this;
        setTimeout(function () {
            if (_this._cdr !== null &&
                _this._cdr !== undefined &&
                !_this._cdr.destroyed) {
                _this._cdr.detectChanges();
            }
        }, 250);
    };
    MhDynamicDialogEntryComponent.prototype.select = function (value) {
        if (!this.multiple) {
            this.dialogRef.close(value.row);
            return;
        }
    };
    MhDynamicDialogEntryComponent.prototype.multSelect = function () {
        if (this.selectedRows.length > 0) {
            this.dialogRef.close(this.selectedRows);
        }
    };
    MhDynamicDialogEntryComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-dialog-entry',
            templateUrl: './dynamic-dialog-entry.component.html',
        }),
        __param(2, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], MhDynamicDialogEntryComponent);
    return MhDynamicDialogEntryComponent;
}());
exports.MhDynamicDialogEntryComponent = MhDynamicDialogEntryComponent;
