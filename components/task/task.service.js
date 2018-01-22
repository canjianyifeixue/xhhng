/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { HttpService } from "../../services/index";
var TaskService = (function () {
    function TaskService(httpService) {
        this.httpService = httpService;
        this.actUrl = '/platform/workflow/activiti';
        this.bizUrl = '/platform/workflow/act-biz';
    }
    /**
     * 根据key获取流程表单
     * @param {?} key
     * @return {?}
     */
    TaskService.prototype.getFormByProcessKey = /**
     * 根据key获取流程表单
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.httpService.get(this.bizUrl + "/model-form/" + key);
    };
    /**
     * 获取运行中流程数据
     * @param {?} instanceId
     * @return {?}
     */
    TaskService.prototype.getProcessInfo = /**
     * 获取运行中流程数据
     * @param {?} instanceId
     * @return {?}
     */
    function (instanceId) {
        return this.httpService.get(this.bizUrl + "/process/" + instanceId);
    };
    /**
     * 获取当前任务的动态表单
     * @param {?} taskId
     * @return {?}
     */
    TaskService.prototype.getDynamicField = /**
     * 获取当前任务的动态表单
     * @param {?} taskId
     * @return {?}
     */
    function (taskId) {
        return this.httpService.get(this.actUrl + "/form/dynamic/get-form/task/" + taskId);
    };
    /**
     * 完成任务
     * @param {?} data
     * @return {?}
     */
    TaskService.prototype.completeTask = /**
     * 完成任务
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return this.httpService.post(this.actUrl + "/runtime/task/find/complete", data);
    };
    /**
     * 更新流程并记录
     * @param {?} instanceId
     * @param {?} data
     * @return {?}
     */
    TaskService.prototype.updateProcess = /**
     * 更新流程并记录
     * @param {?} instanceId
     * @param {?} data
     * @return {?}
     */
    function (instanceId, data) {
        return this.httpService.patch(this.bizUrl + "/process/" + instanceId, data);
    };
    /**
     * 结束流程并记录
     * @param {?} instanceId
     * @param {?=} processVar
     * @return {?}
     */
    TaskService.prototype.finishProcess = /**
     * 结束流程并记录
     * @param {?} instanceId
     * @param {?=} processVar
     * @return {?}
     */
    function (instanceId, processVar) {
        return this.httpService.delete(this.bizUrl + "/process/" + instanceId, { params: processVar });
    };
    /**
     * 获取待办任务列表
     * @param {?} userId
     * @param {?=} key
     * @return {?}
     */
    TaskService.prototype.getTaskList = /**
     * 获取待办任务列表
     * @param {?} userId
     * @param {?=} key
     * @return {?}
     */
    function (userId, key) {
        return this.httpService.get(this.bizUrl + "/task/" + userId + "?key=" + key);
    };
    TaskService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TaskService.ctorParameters = function () { return [
        { type: HttpService, },
    ]; };
    return TaskService;
}());
export { TaskService };
function TaskService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TaskService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TaskService.ctorParameters;
    /** @type {?} */
    TaskService.prototype.actUrl;
    /** @type {?} */
    TaskService.prototype.bizUrl;
    /** @type {?} */
    TaskService.prototype.httpService;
}
