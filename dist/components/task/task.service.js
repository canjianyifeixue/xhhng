"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TaskService = /** @class */ (function () {
    function TaskService(httpService) {
        this.httpService = httpService;
        this.actUrl = '/platform/workflow/activiti';
        this.bizUrl = '/platform/workflow/act-biz';
    }
    /**
     * 根据key获取流程表单
     */
    TaskService.prototype.getFormByProcessKey = function (key) {
        return this.httpService.get(this.bizUrl + "/model-form/" + key);
    };
    /**
     * 获取运行中流程数据
     */
    TaskService.prototype.getProcessInfo = function (instanceId) {
        return this.httpService.get(this.bizUrl + "/process/" + instanceId);
    };
    /**
     * 获取当前任务的动态表单
     */
    TaskService.prototype.getDynamicField = function (taskId) {
        return this.httpService.get(this.actUrl + "/form/dynamic/get-form/task/" + taskId);
    };
    /**
     * 完成任务
     */
    TaskService.prototype.completeTask = function (data) {
        return this.httpService.post(this.actUrl + "/runtime/task/find/complete", data);
    };
    /**
     * 更新流程并记录
     */
    TaskService.prototype.updateProcess = function (instanceId, data) {
        return this.httpService.patch(this.bizUrl + "/process/" + instanceId, data);
    };
    /**
     * 结束流程并记录
     */
    TaskService.prototype.finishProcess = function (instanceId, processVar) {
        return this.httpService.delete(this.bizUrl + "/process/" + instanceId, { params: processVar });
    };
    /**
     * 获取待办任务列表
     */
    TaskService.prototype.getTaskList = function (userId, key) {
        return this.httpService.get(this.bizUrl + "/task/" + userId + "?key=" + key);
    };
    TaskService = __decorate([
        core_1.Injectable()
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
