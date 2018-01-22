"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var html2canvas_1 = require("../../util/html2canvas");
var jspdf_1 = require("../../util/jspdf");
var upload_dialog_component_1 = require("./upload-dialog.component");
var import_dialog_component_1 = require("./import-dialog.component");
var export_dialog_component_1 = require("./export-dialog.component");
var MhFileService = /** @class */ (function () {
    function MhFileService(dialog, httpService, loadingService) {
        this.dialog = dialog;
        this.httpService = httpService;
        this.loadingService = loadingService;
    }
    /**
     * 检测数据中是否包含文件属性
     * 一般用于动态表单中验证图片上传
     * @param data 所验证的数据
     */
    MhFileService.prototype.checkUploadData = function (data) {
        var fileObj = {};
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            var v = data[key];
            if (v instanceof File) {
                fileObj[key] = v;
            }
            else if (v instanceof FileList) {
                var fileList = [];
                for (var i = 0; i < v.length; i++) {
                    fileList = fileList.concat([v.item(i)]);
                }
                fileObj[key] = fileList;
            }
        }
        if (Object.keys(fileObj).length > 0) {
            return this.upload(fileObj).map(function (form) { return Object.assign({}, data, form); });
        }
        else {
            return Observable_1.Observable.create(function (sub) {
                sub.next(data);
                sub.complete();
            });
        }
    };
    /**
     * 文件上传方法
     * @param files 所选择的文件
     */
    MhFileService.prototype.upload = function (files) {
        return this.dialog.open(upload_dialog_component_1.UploadDialogComponent, {
            disableClose: true,
            width: '70%',
            data: files
        }).afterClosed().filter(function (_) { return _; });
    };
    /**
     * excel导入数据
     * @param templateId 模板ID
     * @param url  可选导入url(一般不填)
     */
    MhFileService.prototype.import = function (templateId, url) {
        this.loadingService.register('loading');
        return this.dialog.open(import_dialog_component_1.ImportDialogComponent, {
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
     */
    MhFileService.prototype.exportXlsx = function (name, datasourceId, query, data, columns) {
        var _this = this;
        return this.dialog.open(export_dialog_component_1.ExportDialogComponent, {
            width: '70%',
            data: {
                data: data,
                columns: columns,
            }
        }).afterClosed().filter(function (_) { return _; })
            .flatMap(function (_) { return _this.httpService.post("/public/file/export", {
            datasourceId: datasourceId,
            query: query,
            columns: _,
            name: name
        }); }).map(function (_) { return _.path; }).flatMap(function (_) { return _this.httpService.download(_); });
    };
    /**
     * 导出html为pdf
     */
    MhFileService.prototype.exportPDF = function (element, filename) {
        if (!/\.pdf$/.test(filename)) {
            filename += '.pdf';
        }
        return Observable_1.Observable.fromPromise(html2canvas_1.html2canvas(element))
            .map(function (canvas) {
            var imgData = canvas.toDataURL('img/notice/png');
            var pdf = new jspdf_1.jspdf();
            pdf.addImage(imgData, 'PNG', 20, 20);
            pdf.save(filename);
            return filename;
        });
    };
    MhFileService = __decorate([
        core_1.Injectable()
    ], MhFileService);
    return MhFileService;
}());
exports.MhFileService = MhFileService;
