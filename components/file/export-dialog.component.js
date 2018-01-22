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
var ExportDialogComponent = /** @class */ (function () {
    function ExportDialogComponent(notificationService, dialogRef, dialogData) {
        this.notificationService = notificationService;
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this.checkedAll = false;
        this.selectedCols = [];
        this.data = this.dialogData.data;
        var columns = this.dialogData.columns;
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
    ExportDialogComponent.prototype.change = function (index) {
        var value = this.columns[index];
        var i = this.selectedCols.indexOf(value);
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
    ExportDialogComponent.prototype.selectedAll = function () {
        var _this = this;
        if (this.checkedAll) {
            for (var i = 0; i < this.value.length; i++) {
                this.value[i] = true;
            }
            this.selectedCols = [];
            this.columns.forEach(function (_) { return _this.selectedCols.push(_); });
        }
        else {
            for (var i = 0; i < this.value.length; i++) {
                this.value[i] = false;
            }
            this.selectedCols = [];
        }
    };
    ExportDialogComponent.prototype.export = function () {
        if (this.selectedCols.length <= 0) {
            this.notificationService.error('请选择导出列');
            return;
        }
        this.dialogRef.close(this.selectedCols);
    };
    ExportDialogComponent = __decorate([
        core_1.Component({
            selector: 'mh-export-dialog',
            templateUrl: './export-dialog.component.html',
        }),
        __param(2, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], ExportDialogComponent);
    return ExportDialogComponent;
}());
exports.ExportDialogComponent = ExportDialogComponent;
