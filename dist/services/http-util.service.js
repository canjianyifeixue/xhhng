"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var jsesc_1 = require("../util/jsesc");
var HttpUtilService = /** @class */ (function () {
    function HttpUtilService(httpService) {
        this.httpService = httpService;
        this.actUrl = '/platform/workflow/activiti';
        this.bizUrl = '/platform/workflow/act-biz';
    }
    /**
     * 根据数据源ID获取数据
     * @param id ID
     * @param query 参数对象(查询参数)
     */
    HttpUtilService.prototype.getTableData = function (id, query) {
        return this.httpService.get("/platform/data/datasource/preview/" + id, { params: query });
    };
    /**
     * 根据数据字典ID获取数据
     * @param id ID
     * @param query 参数对象(查询参数)
     */
    HttpUtilService.prototype.getDictionaryData = function (id, query) {
        return this.httpService.get("/platform/data/data-dictionary/preview/" + id);
    };
    /**
     * 根据模板ID生成excel模板
     * @param id ID(模板ID)
     */
    HttpUtilService.prototype.genTemplate = function (id) {
        var _this = this;
        return this.httpService.get("/public/file/template/" + id)
            .map(function (_) { return _.path; })
            .flatMap(function (_) { return _this.httpService.download(_); });
    };
    /**
     * 启动流程接口
     */
    HttpUtilService.prototype.startProcess = function (processKey, data, bizId, processVar) {
        var _this = this;
        if (bizId === void 0) { bizId = ''; }
        if (processVar === void 0) { processVar = null; }
        var userId = JSON.parse(localStorage.getItem('user') || "{id:null}").id;
        var form = data;
        var processData = {};
        var returnData = {};
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            processData = Object.assign(processData, data[key]);
        }
        processData = Object.assign(processData, processVar);
        var formData = {
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
     */
    HttpUtilService.prototype.completeTask = function (row, data) {
        var _this = this;
        var userId = JSON.parse(localStorage.getItem('user') || "{id:null}").id;
        var processData = {};
        var bizFormData = {};
        return this.httpService.get(this.bizUrl + "/process/" + row.processInstanceId).flatMap(function (_) {
            _.processData = JSON.parse(jsesc_1.jsesc(_.processData));
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
            var formData = {
                userId: userId,
                taskId: row.id,
                processInstanceId: row.processInstanceId,
                formData: JSON.stringify(processData)
            };
            return _this.httpService.post(_this.actUrl + "/runtime/task/find/complete", formData)
                .flatMap(function (__) {
                var v = {
                    taskId: row.id,
                    state: row.name,
                    processVar: JSON.stringify(data),
                    processData: JSON.stringify(bizFormData ? bizFormData : _.processData)
                };
                var action$ = _this.httpService.patch(_this.bizUrl + "/process/" + row.processInstanceId, v);
                if (__.isFinish === true || __.isFinish === 'true') {
                    action$ = action$.flatMap(function () { return _this.httpService.delete(_this.bizUrl + "/process/" + row.processInstanceId, { params: JSON.parse(v.processVar) }); });
                }
                return action$;
            });
        });
    };
    /**
     * 创建子组织架构
     * @param userId 用户id
     * @param data 组织架构信息
     */
    HttpUtilService.prototype.addSubOrganization = function (userId, data) {
        return this.httpService.post("/platform/system/organization/sub/" + userId, data);
    };
    HttpUtilService = __decorate([
        core_1.Injectable()
    ], HttpUtilService);
    return HttpUtilService;
}());
exports.HttpUtilService = HttpUtilService;
