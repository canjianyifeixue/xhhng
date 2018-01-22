/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject } from "@angular/core";
import { Http, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs/Rx";
import * as URI from "urijs";
import { moment } from "../util/moment";
import { NotificationService } from "./notification.service";
/**
 *  封装AuthHttp请求方法
 */
var HttpService = (function () {
    function HttpService(http, notificationService, api) {
        var _this = this;
        this.http = http;
        this.notificationService = notificationService;
        this.api = api;
        this.filterStatus = function (data) {
            if (data.status === 1) {
                return true;
            }
            else if (data.message) {
                _this.notificationService.error(data.message);
            }
            return false;
        };
        /**
         * 捕获token过期异常
         */
        this.handleError = function (error) {
            if (error.status === 401) {
                _this.notificationService.error('您的身份认证已过期，请重新登录');
                // this.authService.logout();
            }
            return Observable.throw(error || 'Server error');
        };
    }
    /**
     * get请求方法
     * @param {?} url  请求路径
     * @param {?=} options  请求参数(例如headers)
     * @return {?}
     */
    HttpService.prototype.get = /**
     * get请求方法
     * @param {?} url  请求路径
     * @param {?=} options  请求参数(例如headers)
     * @return {?}
     */
    function (url, options) {
        return this.http.get("" + this.api + url, options)
            .map(function (res) { return res.json(); })
            .filter(this.filterStatus)
            .map(function (json) { return json.data; })
            .catch(this.handleError);
    };
    /**
     * post请求方法
     * @param {?} url  请求路径
     * @param {?} data  body对象
     * @return {?}
     */
    HttpService.prototype.post = /**
     * post请求方法
     * @param {?} url  请求路径
     * @param {?} data  body对象
     * @return {?}
     */
    function (url, data) {
        return this.http.post(this.getTimestampUrl("" + this.api + url), data)
            .map(function (res) { return res.json(); })
            .filter(this.filterStatus)
            .map(function (json) { return json.data; })
            .catch(this.handleError);
    };
    /**
     * put请求方法
     * @param {?} url  请求路径
     * @param {?} data  body对象
     * @return {?}
     */
    HttpService.prototype.put = /**
     * put请求方法
     * @param {?} url  请求路径
     * @param {?} data  body对象
     * @return {?}
     */
    function (url, data) {
        return this.http.put("" + this.api + url, data)
            .map(function (res) { return res.json(); })
            .filter(this.filterStatus)
            .map(function (json) { return json.data; })
            .catch(this.handleError);
    };
    /**
     * patch请求方法
     * @param {?} url 请求路径
     * @param {?} data body对象
     * @return {?}
     */
    HttpService.prototype.patch = /**
     * patch请求方法
     * @param {?} url 请求路径
     * @param {?} data body对象
     * @return {?}
     */
    function (url, data) {
        return this.http.patch(this.getTimestampUrl("" + this.api + url), data)
            .map(function (res) { return res.json(); })
            .filter(this.filterStatus)
            .map(function (json) { return json.data; })
            .catch(this.handleError);
    };
    /**
     * delete请求方法
     * @param {?} url 请求路径
     * @param {?=} options 请求参数(例如headers)
     * @return {?}
     */
    HttpService.prototype.delete = /**
     * delete请求方法
     * @param {?} url 请求路径
     * @param {?=} options 请求参数(例如headers)
     * @return {?}
     */
    function (url, options) {
        return this.http.delete("" + this.api + url, options)
            .map(function (res) { return res.json(); })
            .filter(this.filterStatus)
            .map(function (json) { return json.data; })
            .catch(this.handleError);
    };
    /**
     * 文件下载方法
     * @param {?} url 文件路径
     * @param {?=} name 文件名
     * @param {?=} download 是否直接弹出下载界面
     * @return {?}
     */
    HttpService.prototype.download = /**
     * 文件下载方法
     * @param {?} url 文件路径
     * @param {?=} name 文件名
     * @param {?=} download 是否直接弹出下载界面
     * @return {?}
     */
    function (url, name, download) {
        if (download === void 0) { download = true; }
        var /** @type {?} */ fileName = '';
        if (/\./.test(url)) {
            var /** @type {?} */ arr = url.split('/');
            fileName = arr[arr.length - 1];
        }
        if (name) {
            fileName = name;
        }
        return this.http.get("" + this.api + url, { responseType: ResponseContentType.Blob })
            .map(function (res) {
            var /** @type {?} */ blob = res.blob();
            if (download) {
                var /** @type {?} */ link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(link.href);
            }
            return { name: fileName, blob: blob };
        })
            .catch(this.handleError);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    HttpService.prototype.getTimestampUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var /** @type {?} */ uri = new URI(url);
        uri.addQuery("timestamp=" + moment().valueOf());
        return uri.valueOf();
    };
    HttpService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HttpService.ctorParameters = function () { return [
        { type: Http, },
        { type: NotificationService, },
        { type: undefined, decorators: [{ type: Inject, args: ['api',] },] },
    ]; };
    return HttpService;
}());
export { HttpService };
function HttpService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HttpService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HttpService.ctorParameters;
    /** @type {?} */
    HttpService.prototype.filterStatus;
    /**
     * 捕获token过期异常
     * @type {?}
     */
    HttpService.prototype.handleError;
    /** @type {?} */
    HttpService.prototype.http;
    /** @type {?} */
    HttpService.prototype.notificationService;
    /** @type {?} */
    HttpService.prototype.api;
}
