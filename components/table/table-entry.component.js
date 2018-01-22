"use strict";
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
var base_table_1 = require("./base-table");
var TableEntryComponent = /** @class */ (function (_super) {
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
    TableEntryComponent.prototype.ngOnInit = function () {
        var data = this.dialogData;
        this.label = data.label;
        this.data = data.data;
        this.selected = data.select === true ? true : false;
        this.multiple = data.multiple === true ? true : false;
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
    TableEntryComponent.prototype.select = function (value) {
        if (!this.multiple) {
            this.dialogRef.close(value.row);
        }
    };
    TableEntryComponent.prototype.multSelect = function () {
        if (this.selectedRows.length > 0) {
            this.dialogRef.close(this.selectedRows);
        }
    };
    TableEntryComponent = __decorate([
        core_1.Component({
            selector: 'mh-table-entry',
            templateUrl: './table-entry.component.html',
        }),
        __param(2, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], TableEntryComponent);
    return TableEntryComponent;
}(base_table_1.BaseTable));
exports.TableEntryComponent = TableEntryComponent;
