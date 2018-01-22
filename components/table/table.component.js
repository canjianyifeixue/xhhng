"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@covalent/core");
var fuse_js_1 = require("../../util/fuse-js");
var MhTableComponent = /** @class */ (function () {
    function MhTableComponent(_dataTableService, _cdr) {
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
        this.pageSize = 10;
        this.sortBy = '';
        this.sortOrder = core_2.TdDataTableSortingOrder.Ascending;
    }
    MhTableComponent.prototype.sort = function (sortEvent) {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    };
    MhTableComponent.prototype.search = function (searchTerm) {
        this.searchTerm = searchTerm;
        this.pagingBar.navigateToPage(1);
        this.filter();
    };
    MhTableComponent.prototype.page = function (pagingEvent) {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
        this.filter();
    };
    MhTableComponent.prototype.filter = function () {
        var newData = this.data;
        // newData = this._dataTableService.filterData(newData, this.searchTerm, true);
        if (this.searchTerm && this.searchTerm.length > 0 && this.data.length > 0) {
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
    MhTableComponent.prototype.detectChanges = function () {
        var _this = this;
        setTimeout(function () {
            if (_this._cdr !== null &&
                _this._cdr !== undefined &&
                !_this._cdr.destroyed) {
                _this._cdr.detectChanges();
            }
        }, 250);
    };
    __decorate([
        core_1.Input()
    ], MhTableComponent.prototype, "columns", void 0);
    __decorate([
        core_1.Input()
    ], MhTableComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input()
    ], MhTableComponent.prototype, "filteredData", void 0);
    __decorate([
        core_1.Input()
    ], MhTableComponent.prototype, "filteredTotal", void 0);
    __decorate([
        core_1.ViewChild('pagingBar')
    ], MhTableComponent.prototype, "pagingBar", void 0);
    __decorate([
        core_1.Input()
    ], MhTableComponent.prototype, "searchTerm", void 0);
    __decorate([
        core_1.Input()
    ], MhTableComponent.prototype, "fromRow", void 0);
    __decorate([
        core_1.Input()
    ], MhTableComponent.prototype, "currentPage", void 0);
    __decorate([
        core_1.Input()
    ], MhTableComponent.prototype, "pageSize", void 0);
    __decorate([
        core_1.Input()
    ], MhTableComponent.prototype, "sortBy", void 0);
    __decorate([
        core_1.Input()
    ], MhTableComponent.prototype, "sortOrder", void 0);
    MhTableComponent = __decorate([
        core_1.Component({
            selector: 'mh-table',
            templateUrl: './table.component.html'
        })
    ], MhTableComponent);
    return MhTableComponent;
}());
exports.MhTableComponent = MhTableComponent;
