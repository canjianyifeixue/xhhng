/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
var MhDynamicLoaderService = (function () {
    function MhDynamicLoaderService(http) {
        this.http = http;
    }
    /**
     * 获取表单中的元素
     * @param {?} id
     * @return {?}
     */
    MhDynamicLoaderService.prototype.loadElements = /**
     * 获取表单中的元素
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.http.get("/platform/form/biz-form/" + id)
            .map(function (res) { return res.controls; });
    };
    /**
     * 获取表单设计器中数据源，数据字典，数据表单列表
     * @return {?}
     */
    MhDynamicLoaderService.prototype.loadOptions = /**
     * 获取表单设计器中数据源，数据字典，数据表单列表
     * @return {?}
     */
    function () {
        var /** @type {?} */ datasource$ = this.http.get("/platform/data/datasource");
        var /** @type {?} */ dictionary$ = this.http.get("/platform/data/data-dictionary");
        var /** @type {?} */ dataform$ = this.http.get("/platform/form/data-form");
        return Observable.combineLatest(datasource$, dictionary$, dataform$, function (s, d, f) {
            return {
                datasource: s,
                dictionary: d,
                dataform: f
            };
        });
    };
    /**
     * 加载字典，数据源，表单详细信息
     * @param {?} selections
     * @param {?} type
     * @param {?=} selectionParams
     * @return {?}
     */
    MhDynamicLoaderService.prototype.loadSelections = /**
     * 加载字典，数据源，表单详细信息
     * @param {?} selections
     * @param {?} type
     * @param {?=} selectionParams
     * @return {?}
     */
    function (selections, type, selectionParams) {
        var /** @type {?} */ selections$ = Observable.of(selections);
        if (typeof selections !== 'string') {
            return selections$;
        }
        var /** @type {?} */ url = '';
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
     * @param {?} controls
     * @param {?} type
     * @return {?}
     */
    MhDynamicLoaderService.prototype.loadControls = /**
     * 加载字典，数据源，表单详细信息
     * @param {?} controls
     * @param {?} type
     * @return {?}
     */
    function (controls, type) {
        var /** @type {?} */ controls$ = Observable.of(controls);
        if (typeof controls !== 'string') {
            return controls$;
        }
        var /** @type {?} */ url = '';
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
     * @param {?} value
     * @return {?}
     */
    MhDynamicLoaderService.prototype.loadFiles = /**
     * 加载文件信息
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ value$ = Observable.of(value);
        if (typeof value !== 'string') {
            return value$;
        }
        var /** @type {?} */ url = "/public/file/" + value;
        return this.http.get(url).map(function (data) { return data; });
    };
    /**
     * 加载文件信息
     * @param {?} url
     * @return {?}
     */
    MhDynamicLoaderService.prototype.download = /**
     * 加载文件信息
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this.http.download(url);
    };
    /**
     * 调用后端验证接口
     * @param {?} url
     * @param {?} value
     * @return {?}
     */
    MhDynamicLoaderService.prototype.validate = /**
     * 调用后端验证接口
     * @param {?} url
     * @param {?} value
     * @return {?}
     */
    function (url, value) {
        return this.http.post(url, { value: value });
    };
    MhDynamicLoaderService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MhDynamicLoaderService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['http',] },] },
    ]; };
    return MhDynamicLoaderService;
}());
export { MhDynamicLoaderService };
function MhDynamicLoaderService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicLoaderService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicLoaderService.ctorParameters;
    /** @type {?} */
    MhDynamicLoaderService.prototype.http;
}
