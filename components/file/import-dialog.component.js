/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FileUploader } from "ng2-file-upload";
import { NotificationService, HttpService } from "../../services/index";
var ImportDialogComponent = (function () {
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
        this.uploader = new FileUploader({
            url: "" + this.httpService.api + dialogData.url,
            authToken: "Bearer " + localStorage.getItem('token')
        });
        this.uploader.onCompleteItem = this.onCompleteItem;
        this.uploader.onCompleteAll = this.onCompleteAll;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    ImportDialogComponent.prototype.select = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        var /** @type {?} */ ext = '';
        if (file && file.name && typeof file.name === 'string') {
            var /** @type {?} */ arr = file.name.match(/\.\w+$/);
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
    /**
     * @return {?}
     */
    ImportDialogComponent.prototype.clear = /**
     * @return {?}
     */
    function () {
        if (this.uploader.queue.length > 0) {
            this.uploader.removeFromQueue(this.uploader.queue[0]);
        }
    };
    /**
     * @return {?}
     */
    ImportDialogComponent.prototype.startUpload = /**
     * @return {?}
     */
    function () {
        this.text = '正在上传';
        this.buttonEnabled = false;
        this.uploader.uploadAll();
    };
    ImportDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-import-dialog',
                    template: "<div style=\"font-size: 15px;margin-bottom:15px\">数据导入</div> <mat-dialog-content> <div layout=\"row\"> <mat-form-field flex=\"45\" tdFileDrop (fileDrop)=\"file = $event\" (click)=\"fileInput.inputElement.click()\" flex> <input matInput placeholder=\"请选择模板文件\" [value]=\"file?.name\" readonly /> </mat-form-field> <button mat-icon-button *ngIf=\"file\" (click)=\"fileInput.clear();clear()\"> <mat-icon color=\"warn\">cancel</mat-icon> </button> <td-file-input class=\"push-left-xs push-right-xs\" #fileInput [(ngModel)]=\"file\" [accept]=\"accept\" (select)=\"select($event)\"> <mat-icon color=\"accent\">folder</mat-icon> <span class=\"text-upper\">选择文件</span> </td-file-input> </div> <!-- 文件上传List --> <mat-list dense> <mat-list-item *ngFor=\"let item of uploader.queue\"> <div layout=\"row\" layout-align=\"start center\"> <span flex=\"40\">{{ item?.file?.name }}</span> <span flex=\"15\">{{ item?.file?.size/1024/1024 | number:'.2' }} MB</span> <mat-progress-bar flex=\"35\" color=\"primary\" mode=\"buffer\" buffer=\"0\" [value]=\"item.progress\"> </mat-progress-bar> <span flex=\"8\" [ngSwitch]=\"item.progress\" class=\"push-left-xs\"> <mat-icon *ngSwitchCase=\"0\" color=\"primary\">remove</mat-icon> <mat-icon *ngSwitchCase=\"100\" color=\"accent\">check</mat-icon> <span *ngSwitchDefault>{{item.progress+' %'}}</span> </span> </div> </mat-list-item> </mat-list> </mat-dialog-content> <mat-dialog-actions align=\"end\"> <button mat-button (click)=\"startUpload()\" [disabled]=\"!buttonEnabled || !file\" class=\"btn-green\">{{text}}</button> <button mat-button mat-dialog-close [disabled]=\"!buttonEnabled\" class=\"btn-gray\">取消</button> </mat-dialog-actions> ",
                },] },
    ];
    /** @nocollapse */
    ImportDialogComponent.ctorParameters = function () { return [
        { type: HttpService, },
        { type: NotificationService, },
        { type: MatDialogRef, },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
    ]; };
    ImportDialogComponent.propDecorators = {
        "fileInput": [{ type: ViewChild, args: ['fileInput',] },],
    };
    return ImportDialogComponent;
}());
export { ImportDialogComponent };
function ImportDialogComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ImportDialogComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ImportDialogComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ImportDialogComponent.propDecorators;
    /** @type {?} */
    ImportDialogComponent.prototype.fileInput;
    /** @type {?} */
    ImportDialogComponent.prototype.hasError;
    /** @type {?} */
    ImportDialogComponent.prototype.file;
    /** @type {?} */
    ImportDialogComponent.prototype.accept;
    /** @type {?} */
    ImportDialogComponent.prototype.exts;
    /** @type {?} */
    ImportDialogComponent.prototype.uploader;
    /** @type {?} */
    ImportDialogComponent.prototype.buttonEnabled;
    /** @type {?} */
    ImportDialogComponent.prototype.data;
    /** @type {?} */
    ImportDialogComponent.prototype.text;
    /** @type {?} */
    ImportDialogComponent.prototype.uploaddata;
    /** @type {?} */
    ImportDialogComponent.prototype.onCompleteItem;
    /** @type {?} */
    ImportDialogComponent.prototype.onCompleteAll;
    /** @type {?} */
    ImportDialogComponent.prototype.httpService;
    /** @type {?} */
    ImportDialogComponent.prototype.notificationService;
    /** @type {?} */
    ImportDialogComponent.prototype.dialogRef;
    /** @type {?} */
    ImportDialogComponent.prototype.dialogData;
}
