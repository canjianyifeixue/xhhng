/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { jsesc } from "../util/jsesc";
var HttpUtilService = (function () {
    function HttpUtilService(httpService) {
        this.httpService = httpService;
        this.actUrl = '/platform/workflow/activiti';
        this.bizUrl = '/platform/workflow/act-biz';
    }
    /**
     * 根据数据源ID获取数据
     * @param {?} id ID
     * @param {?=} query 参数对象(查询参数)
     * @return {?}
     */
    HttpUtilService.prototype.getTableData = /**
     * 根据数据源ID获取数据
     * @param {?} id ID
     * @param {?=} query 参数对象(查询参数)
     * @return {?}
     */
    function (id, query) {
        return this.httpService.get("/platform/data/datasource/preview/" + id, { params: query });
    };
    /**
     * 根据数据字典ID获取数据
     * @param {?} id ID
     * @param {?=} query 参数对象(查询参数)
     * @return {?}
     */
    HttpUtilService.prototype.getDictionaryData = /**
     * 根据数据字典ID获取数据
     * @param {?} id ID
     * @param {?=} query 参数对象(查询参数)
     * @return {?}
     */
    function (id, query) {
        return this.httpService.get("/platform/data/data-dictionary/preview/" + id);
    };
    /**
     * 根据模板ID生成excel模板
     * @param {?} id ID(模板ID)
     * @return {?}
     */
    HttpUtilService.prototype.genTemplate = /**
     * 根据模板ID生成excel模板
     * @param {?} id ID(模板ID)
     * @return {?}
     */
    function (id) {
        var _this = this;
        return this.httpService.get("/public/file/template/" + id)
            .map(function (_) { return _.path; })
            .flatMap(function (_) { return _this.httpService.download(_); });
    };
    /**
     * 启动流程接口
     * @param {?} processKey
     * @param {?} data
     * @param {?=} bizId
     * @param {?=} processVar
     * @return {?}
     */
    HttpUtilService.prototype.startProcess = /**
     * 启动流程接口
     * @param {?} processKey
     * @param {?} data
     * @param {?=} bizId
     * @param {?=} processVar
     * @return {?}
     */
    function (processKey, data, bizId, processVar) {
        var _this = this;
        if (bizId === void 0) { bizId = ''; }
        if (processVar === void 0) { processVar = null; }
        var /** @type {?} */ userId = JSON.parse(localStorage.getItem('user') || "{id:null}").id;
        var /** @type {?} */ form = data;
        var /** @type {?} */ processData = {};
        var /** @type {?} */ returnData = {};
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            processData = Object.assign(processData, data[key]);
        }
        processData = Object.assign(processData, processVar);
        var /** @type {?} */ formData = {
            userId: userId,
            processDefinitionKey: processKey,
            businessKey: bizId,
            formData: JSON.stringify(processData)
        };
        return this.httpService.post(this.actUrl + "/runtime/start", formData)
            .flatMap(function (_) {
            returnData['instanceId'] = _.instanceId;
            return _this.httpService.post(_this.bizUrl + "/process", {
                key: processKey,
                instanceId: _.instanceId,
                bizId: bizId,
                description: null,
                state: '启动流程',
                processVar: JSON.stringify(processVar),
                processData: JSON.stringify(form)
            });
        }).map(function (_) { return returnData; });
    };
    /**
     * 完成任务接口
     * @param {?} row
     * @param {?} data
     * @return {?}
     */
    HttpUtilService.prototype.completeTask = /**
     * 完成任务接口
     * @param {?} row
     * @param {?} data
     * @return {?}
     */
    function (row, data) {
        var _this = this;
        var /** @type {?} */ userId = JSON.parse(localStorage.getItem('user') || "{id:null}").id;
        var /** @type {?} */ processData = {};
        var /** @type {?} */ bizFormData = {};
        return this.httpService.get(this.bizUrl + "/process/" + row.processInstanceId).flatMap(function (_) {
            _.processData = JSON.parse(jsesc(_.processData));
            if (data.formData) {
                for (var _i = 0, _a = Object.keys(data.formData); _i < _a.length; _i++) {
                    var key = _a[_i];
                    processData = Object.assign(processData, data.formData[key]);
                }
                bizFormData = data.formData;
                delete data['formData'];
            }
            else {
                for (var _b = 0, _c = Object.keys(_.processData); _b < _c.length; _b++) {
                    var key = _c[_b];
                    processData = Object.assign(processData, _.processData[key]);
                }
            }
            processData = Object.assign(processData, data);
            var /** @type {?} */ formData = {
                userId: userId,
                taskId: row.id,
                processInstanceId: row.processInstanceId,
                formData: JSON.stringify(processData)
            };
            return _this.httpService.post(_this.actUrl + "/runtime/task/find/complete", formData)
                .flatMap(function (__) {
                var /** @type {?} */ v = {
                    taskId: row.id,
                    state: row.name,
                    processVar: JSON.stringify(data),
                    processData: JSON.stringify(bizFormData ? bizFormData : _.processData)
                };
                var /** @type {?} */ action$ = _this.httpService.patch(_this.bizUrl + "/process/" + row.processInstanceId, v);
                if (__.isFinish === true || __.isFinish === 'true') {
                    action$ = action$.flatMap(function () {
                        return _this.httpService.delete(_this.bizUrl + "/process/" + row.processInstanceId, { params: JSON.parse(v.processVar) });
                    });
                }
                return action$;
            });
        });
    };
    /**
     * 创建子组织架构
     * @param {?} userId 用户id
     * @param {?} data 组织架构信息
     * @return {?}
     */
    HttpUtilService.prototype.addSubOrganization = /**
     * 创建子组织架构
     * @param {?} userId 用户id
     * @param {?} data 组织架构信息
     * @return {?}
     */
    function (userId, data) {
        return this.httpService.post("/platform/system/organization/sub/" + userId, data);
    };
    HttpUtilService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HttpUtilService.ctorParameters = function () { return [
        { type: HttpService, },
    ]; };
    return HttpUtilService;
}());
export { HttpUtilService };
function HttpUtilService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HttpUtilService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HttpUtilService.ctorParameters;
    /** @type {?} */
    HttpUtilService.prototype.actUrl;
    /** @type {?} */
    HttpUtilService.prototype.bizUrl;
    /** @type {?} */
    HttpUtilService.prototype.httpService;
}
