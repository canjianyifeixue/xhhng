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
var Observable_1 = require("rxjs/Observable");
var MhDynamicLoaderService = /** @class */ (function () {
    function MhDynamicLoaderService(http) {
        this.http = http;
    }
    /**
     * 获取表单中的元素
     */
    MhDynamicLoaderService.prototype.loadElements = function (id) {
        return this.http.get("/platform/form/biz-form/" + id)
            .map(function (res) { return res.controls; });
    };
    /**
     * 获取表单设计器中数据源，数据字典，数据表单列表
     */
    MhDynamicLoaderService.prototype.loadOptions = function () {
        var datasource$ = this.http.get("/platform/data/datasource");
        var dictionary$ = this.http.get("/platform/data/data-dictionary");
        var dataform$ = this.http.get("/platform/form/data-form");
        return Observable_1.Observable.combineLatest(datasource$, dictionary$, dataform$, function (s, d, f) {
            return {
                datasource: s,
                dictionary: d,
                dataform: f
            };
        });
    };
    /**
     * 加载字典，数据源，表单详细信息
     */
    MhDynamicLoaderService.prototype.loadSelections = function (selections, type, selectionParams) {
        var selections$ = Observable_1.Observable.of(selections);
        if (typeof selections !== 'string') {
            return selections$;
        }
        var url = '';
        switch (type) {
            case 'checkbox-group':
            case 'chips':
            case 'radio':
            case 'select':
            case 'tree-select':
            case 'cascad-select':
                url = "/platform/data/data-dictionary/preview/" + selections;
                break;
            case 'dialog-select':
            case 'data-form':
                url = "/platform/data/datasource/preview/" + selections;
                break;
            default:
                return selections$;
        }
        if (selectionParams) {
            return this.http.get(url, { params: selectionParams });
        }
        else {
            return this.http.get(url);
        }
    };
    /**
     * 加载字典，数据源，表单详细信息
     */
    MhDynamicLoaderService.prototype.loadControls = function (controls, type) {
        var controls$ = Observable_1.Observable.of(controls);
        if (typeof controls !== 'string') {
            return controls$;
        }
        var url = '';
        switch (type) {
            case 'data-form':
                url = "/platform/form/data-form/" + controls;
                break;
            default:
                return controls$;
        }
        return this.http.get(url).map(function (data) { return data.controls; });
    };
    /**
     * 加载文件信息
     */
    MhDynamicLoaderService.prototype.loadFiles = function (value) {
        var value$ = Observable_1.Observable.of(value);
        if (typeof value !== 'string') {
            return value$;
        }
        var url = "/public/file/" + value;
        return this.http.get(url).map(function (data) { return data; });
    };
    /**
     * 加载文件信息
     */
    MhDynamicLoaderService.prototype.download = function (url) {
        return this.http.download(url);
    };
    /**
     * 调用后端验证接口
     */
    MhDynamicLoaderService.prototype.validate = function (url, value) {
        return this.http.post(url, { value: value });
    };
    MhDynamicLoaderService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject('http'))
    ], MhDynamicLoaderService);
    return MhDynamicLoaderService;
}());
exports.MhDynamicLoaderService = MhDynamicLoaderService;
