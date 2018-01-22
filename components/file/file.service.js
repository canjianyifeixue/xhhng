/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { TdLoadingService } from "@covalent/core";
import { html2canvas } from "../../util/html2canvas";
import { jspdf as jsPDF } from "../../util/jspdf";
import { HttpService } from "../../services/index";
import { UploadDialogComponent } from "./upload-dialog.component";
import { ImportDialogComponent } from "./import-dialog.component";
import { ExportDialogComponent } from "./export-dialog.component";
var MhFileService = (function () {
    function MhFileService(dialog, httpService, loadingService) {
        this.dialog = dialog;
        this.httpService = httpService;
        this.loadingService = loadingService;
    }
    /**
     * 检测数据中是否包含文件属性
     * 一般用于动态表单中验证图片上传
     * @param {?} data 所验证的数据
     * @return {?}
     */
    MhFileService.prototype.checkUploadData = /**
     * 检测数据中是否包含文件属性
     * 一般用于动态表单中验证图片上传
     * @param {?} data 所验证的数据
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ fileObj = {};
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            var /** @type {?} */ v = data[key];
            if (v instanceof File) {
                fileObj[key] = v;
            }
            else if (v instanceof FileList) {
                var /** @type {?} */ fileList = [];
                for (var /** @type {?} */ i = 0; i < v.length; i++) {
                    fileList = fileList.concat([v.item(i)]);
                }
                fileObj[key] = fileList;
            }
        }
        if (Object.keys(fileObj).length > 0) {
            return this.upload(fileObj).map(function (form) { return Object.assign({}, data, form); });
        }
        else {
            return Observable.create(function (sub) {
                sub.next(data);
                sub.complete();
            });
        }
    };
    /**
     * 文件上传方法
     * @param {?} files 所选择的文件
     * @return {?}
     */
    MhFileService.prototype.upload = /**
     * 文件上传方法
     * @param {?} files 所选择的文件
     * @return {?}
     */
    function (files) {
        return this.dialog.open(UploadDialogComponent, {
            disableClose: true,
            width: '70%',
            data: files
        }).afterClosed().filter(function (_) { return _; });
    };
    /**
     * excel导入数据
     * @param {?} templateId 模板ID
     * @param {?=} url  可选导入url(一般不填)
     * @return {?}
     */
    MhFileService.prototype.import = /**
     * excel导入数据
     * @param {?} templateId 模板ID
     * @param {?=} url  可选导入url(一般不填)
     * @return {?}
     */
    function (templateId, url) {
        this.loadingService.register('loading');
        return this.dialog.open(ImportDialogComponent, {
            disableClose: true,
            width: '70%',
            data: {
                id: templateId,
                url: url || '/public/file/import'
            }
        }).afterClosed().filter(function (_) { return _; });
    };
    /**
     * 导出excel数据
     * @param {?} name
     * @param {?} datasourceId
     * @param {?} query
     * @param {?} data
     * @param {?} columns
     * @return {?}
     */
    MhFileService.prototype.exportXlsx = /**
     * 导出excel数据
     * @param {?} name
     * @param {?} datasourceId
     * @param {?} query
     * @param {?} data
     * @param {?} columns
     * @return {?}
     */
    function (name, datasourceId, query, data, columns) {
        var _this = this;
        return this.dialog.open(ExportDialogComponent, {
            width: '70%',
            data: {
                data: data,
                columns: columns,
            }
        }).afterClosed().filter(function (_) { return _; })
            .flatMap(function (_) {
            return _this.httpService.post("/public/file/export", {
                datasourceId: datasourceId,
                query: query,
                columns: _,
                name: name
            });
        }).map(function (_) { return _.path; }).flatMap(function (_) { return _this.httpService.download(_); });
    };
    /**
     * 导出html为pdf
     * @param {?} element
     * @param {?} filename
     * @return {?}
     */
    MhFileService.prototype.exportPDF = /**
     * 导出html为pdf
     * @param {?} element
     * @param {?} filename
     * @return {?}
     */
    function (element, filename) {
        if (!/\.pdf$/.test(filename)) {
            filename += '.pdf';
        }
        return Observable.fromPromise(html2canvas(element))
            .map(function (canvas) {
            var /** @type {?} */ imgData = canvas.toDataURL('img/notice/png');
            var /** @type {?} */ pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 20, 20);
            pdf.save(filename);
            return filename;
        });
    };
    MhFileService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MhFileService.ctorParameters = function () { return [
        { type: MatDialog, },
        { type: HttpService, },
        { type: TdLoadingService, },
    ]; };
    return MhFileService;
}());
export { MhFileService };
function MhFileService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhFileService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhFileService.ctorParameters;
    /** @type {?} */
    MhFileService.prototype.dialog;
    /** @type {?} */
    MhFileService.prototype.httpService;
    /** @type {?} */
    MhFileService.prototype.loadingService;
}
