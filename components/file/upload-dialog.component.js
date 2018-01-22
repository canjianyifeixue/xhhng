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
var UploadDialogComponent = /** @class */ (function () {
    function UploadDialogComponent(httpService, dialogRef, dialogData) {
        var _this = this;
        this.httpService = httpService;
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this.buttonEnabled = true;
        this.data = {};
        this.text = '上传';
        this.onCompleteItem = function (item, response, status) {
            if (status === 200) {
                var res = JSON.parse(response);
                var id_1 = res.data.id;
                var _loop_1 = function (key) {
                    var v = _this.dialogData[key];
                    if (!Array.isArray(v)) {
                        if (item.file.name === v.name) {
                            _this.data[key] = id_1;
                        }
                    }
                    else {
                        v.forEach(function (_) {
                            if (item.file.name === _.name) {
                                if (!_this.data[key]) {
                                    _this.data[key] = [];
                                }
                                _this.data[key] = _this.data[key].concat([id_1]);
                            }
                        });
                    }
                };
                for (var _i = 0, _a = Object.keys(_this.dialogData); _i < _a.length; _i++) {
                    var key = _a[_i];
                    _loop_1(key);
                }
            }
        };
        this.onCompleteAll = function () {
            _this.text = '正在保存';
            _this.dialogRef.close(_this.data);
        };
        this.uploader = new ng2_file_upload_1.FileUploader({
            url: this.httpService.api + "/public/file/upload",
            authToken: "Bearer " + localStorage.getItem('token')
        });
        this.uploader.onCompleteItem = this.onCompleteItem;
        this.uploader.onCompleteAll = this.onCompleteAll;
        var fileList = [];
        for (var _i = 0, _a = Object.keys(this.dialogData); _i < _a.length; _i++) {
            var key = _a[_i];
            var v = this.dialogData[key];
            var arr = Array.isArray(v) ? v : [v];
            arr.forEach(function (_) { return fileList = fileList.concat([_]); });
        }
        this.uploader.addToQueue(fileList);
    }
    UploadDialogComponent.prototype.startUpload = function () {
        this.text = '正在上传';
        this.buttonEnabled = false;
        this.uploader.uploadAll();
    };
    UploadDialogComponent = __decorate([
        core_1.Component({
            selector: 'mh-upload-dialog',
            templateUrl: './upload-dialog.component.html',
        }),
        __param(2, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], UploadDialogComponent);
    return UploadDialogComponent;
}());
exports.UploadDialogComponent = UploadDialogComponent;
