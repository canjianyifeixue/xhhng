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
var ng2_file_upload_1 = require("ng2-file-upload");
var ImportDialogComponent = /** @class */ (function () {
    function ImportDialogComponent(httpService, notificationService, dialogRef, dialogData) {
        var _this = this;
        this.httpService = httpService;
        this.notificationService = notificationService;
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this.hasError = true;
        this.accept = 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        this.exts = ['.xls', '.xlsx'];
        this.buttonEnabled = true;
        this.data = {};
        this.text = '上传';
        this.onCompleteItem = function (item, response, status) {
            _this.uploaddata = JSON.parse(response);
            if (status === 200) {
                _this.hasError = false;
            }
        };
        this.onCompleteAll = function () {
            _this.text = '正在保存';
            if (_this.hasError) {
                _this.notificationService.error('导入失败');
            }
            _this.dialogRef.close(_this.uploaddata);
        };
        this.uploader = new ng2_file_upload_1.FileUploader({
            url: "" + this.httpService.api + dialogData.url,
            authToken: "Bearer " + localStorage.getItem('token')
        });
        this.uploader.onCompleteItem = this.onCompleteItem;
        this.uploader.onCompleteAll = this.onCompleteAll;
    }
    ImportDialogComponent.prototype.select = function (file) {
        var ext = '';
        if (file && file.name && typeof file.name === 'string') {
            var arr = file.name.match(/\.\w+$/);
            if (Array.isArray(arr)) {
                ext = arr[0];
            }
        }
        if (this.exts.indexOf(ext) < 0) {
            this.fileInput.clear();
            this.notificationService.error('文件类型不正确');
            return;
        }
        if (file.name.indexOf(this.dialogData.id + '_') !== 0) {
            this.fileInput.clear();
            this.notificationService.error('文件不正确,请确认模板文件名为本界面下载的模板!');
            return;
        }
        this.clear();
        this.uploader.addToQueue([file]);
    };
    ImportDialogComponent.prototype.clear = function () {
        if (this.uploader.queue.length > 0) {
            this.uploader.removeFromQueue(this.uploader.queue[0]);
        }
    };
    ImportDialogComponent.prototype.startUpload = function () {
        this.text = '正在上传';
        this.buttonEnabled = false;
        this.uploader.uploadAll();
    };
    __decorate([
        core_1.ViewChild('fileInput')
    ], ImportDialogComponent.prototype, "fileInput", void 0);
    ImportDialogComponent = __decorate([
        core_1.Component({
            selector: 'mh-import-dialog',
            templateUrl: './import-dialog.component.html',
        }),
        __param(3, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], ImportDialogComponent);
    return ImportDialogComponent;
}());
exports.ImportDialogComponent = ImportDialogComponent;
