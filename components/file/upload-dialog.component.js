/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FileUploader } from "ng2-file-upload";
import { HttpService } from "../../services/index";
var UploadDialogComponent = (function () {
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
                var /** @type {?} */ res = JSON.parse(response);
                var /** @type {?} */ id_1 = res.data.id;
                var _loop_1 = function (key) {
                    var /** @type {?} */ v = _this.dialogData[key];
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
        this.uploader = new FileUploader({
            url: this.httpService.api + "/public/file/upload",
            authToken: "Bearer " + localStorage.getItem('token')
        });
        this.uploader.onCompleteItem = this.onCompleteItem;
        this.uploader.onCompleteAll = this.onCompleteAll;
        var /** @type {?} */ fileList = [];
        for (var _i = 0, _a = Object.keys(this.dialogData); _i < _a.length; _i++) {
            var key = _a[_i];
            var /** @type {?} */ v = this.dialogData[key];
            var /** @type {?} */ arr = Array.isArray(v) ? v : [v];
            arr.forEach(function (_) { return fileList = fileList.concat([_]); });
        }
        this.uploader.addToQueue(fileList);
    }
    /**
     * @return {?}
     */
    UploadDialogComponent.prototype.startUpload = /**
     * @return {?}
     */
    function () {
        this.text = '正在上传';
        this.buttonEnabled = false;
        this.uploader.uploadAll();
    };
    UploadDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-upload-dialog',
                    template: "<div style=\"font-size: 15px;margin-bottom:15px\">文件上传</div> <mat-dialog-content> <p class=\"push-sm\">检测到{{' '+uploader.queue.length+' '}}个待上传的文件，请上传后继续操作</p> <mat-list dense> <mat-list-item *ngFor=\"let item of uploader.queue\"> <div layout=\"row\" layout-align=\"start center\"> <span flex=\"40\">{{ item?.file?.name }}</span> <span flex=\"15\">{{ item?.file?.size/1024/1024 | number:'.2' }} MB</span> <mat-progress-bar flex=\"35\" color=\"primary\" mode=\"buffer\" buffer=\"0\" [value]=\"item.progress\"> </mat-progress-bar> <span flex=\"8\" [ngSwitch]=\"item.progress\" class=\"push-left-xs\"> <mat-icon *ngSwitchCase=\"0\" color=\"primary\">remove</mat-icon> <mat-icon *ngSwitchCase=\"100\" color=\"accent\">check</mat-icon> <span *ngSwitchDefault>{{item.progress+' %'}}</span> </span> </div> </mat-list-item> </mat-list> </mat-dialog-content> <mat-dialog-actions align=\"end\"> <button mat-button (click)=\"startUpload()\" [disabled]=\"!buttonEnabled\" class=\"btn-green\">{{text}}</button> <button mat-button mat-dialog-close [disabled]=\"!buttonEnabled\" class=\"btn-gray\">取消</button> </mat-dialog-actions> ",
                },] },
    ];
    /** @nocollapse */
    UploadDialogComponent.ctorParameters = function () { return [
        { type: HttpService, },
        { type: MatDialogRef, },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
    ]; };
    return UploadDialogComponent;
}());
export { UploadDialogComponent };
function UploadDialogComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    UploadDialogComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    UploadDialogComponent.ctorParameters;
    /** @type {?} */
    UploadDialogComponent.prototype.uploader;
    /** @type {?} */
    UploadDialogComponent.prototype.buttonEnabled;
    /** @type {?} */
    UploadDialogComponent.prototype.data;
    /** @type {?} */
    UploadDialogComponent.prototype.text;
    /** @type {?} */
    UploadDialogComponent.prototype.onCompleteItem;
    /** @type {?} */
    UploadDialogComponent.prototype.onCompleteAll;
    /** @type {?} */
    UploadDialogComponent.prototype.httpService;
    /** @type {?} */
    UploadDialogComponent.prototype.dialogRef;
    /** @type {?} */
    UploadDialogComponent.prototype.dialogData;
}
