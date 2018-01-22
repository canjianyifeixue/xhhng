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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var URI = require("urijs");
var moment_1 = require("../util/moment");
/**
 *  封装Http请求方法
 */
var HttpService = /** @class */ (function () {
    function HttpService(http, notificationService, api) {
        this.http = http;
        this.notificationService = notificationService;
        this.api = api;
        this.filterStatus = function (data) {
            if (data.status === 1) {
                return true;
            }
            // else if (data.error) {
            //   this.notificationService.error(data.error);
            // }
            return false;
        };
        this.handleError = function (error) {
            return Rx_1.Observable.throw(error);
        };
    }
    /**
     * get请求方法
     * @param url  请求路径
     * @param options  请求参数(例如headers)
     */
    HttpService.prototype.get = function (url, options) {
        return this.http.get("" + this.api + url, options)
            .map(function (res) { return res.json(); })
            .filter(this.filterStatus)
            .map(function (json) { return json.data; })
            .catch(this.handleError);
    };
    /**
     * post请求方法
     * @param url  请求路径
     * @param data  body对象
     */
    HttpService.prototype.post = function (url, data) {
        return this.http.post(this.getTimestampUrl("" + this.api + url), data)
            .map(function (res) { return res.json(); })
            .filter(this.filterStatus)
            .map(function (json) { return json.data; })
            .catch(this.handleError);
    };
    /**
     * put请求方法
     * @param url  请求路径
     * @param data  body对象
     */
    HttpService.prototype.put = function (url, data) {
        return this.http.put("" + this.api + url, data)
            .map(function (res) { return res.json(); })
            .filter(this.filterStatus)
            .map(function (json) { return json.data; })
            .catch(this.handleError);
    };
    /**
     * patch请求方法
     * @param url 请求路径
     * @param data body对象
     */
    HttpService.prototype.patch = function (url, data) {
        return this.http.patch(this.getTimestampUrl("" + this.api + url), data)
            .map(function (res) { return res.json(); })
            .filter(this.filterStatus)
            .map(function (json) { return json.data; })
            .catch(this.handleError);
    };
    /**
     * delete请求方法
     * @param url 请求路径
     * @param options 请求参数(例如headers)
     */
    HttpService.prototype.delete = function (url, options) {
        return this.http.delete("" + this.api + url, options)
            .map(function (res) { return res.json(); })
            .filter(this.filterStatus)
            .map(function (json) { return json.data; })
            .catch(this.handleError);
    };
    /**
     * 文件下载方法
     * @param url 文件路径
     * @param name 文件名
     * @param download 是否直接弹出下载界面
     */
    HttpService.prototype.download = function (url, name, download) {
        if (download === void 0) { download = true; }
        var fileName = '';
        if (/\./.test(url)) {
            var arr = url.split('/');
            fileName = arr[arr.length - 1];
        }
        if (name) {
            fileName = name;
        }
        return this.http.get("" + this.api + url, { responseType: http_1.ResponseContentType.Blob })
            .map(function (res) {
            var blob = res.blob();
            if (download) {
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(link.href);
            }
            return { name: fileName, blob: blob };
        })
            .catch(this.handleError);
    };
    HttpService.prototype.getTimestampUrl = function (url) {
        var uri = new URI(url);
        uri.addQuery("timestamp=" + moment_1.moment().valueOf());
        return uri.valueOf();
    };
    HttpService = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Inject('api'))
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
