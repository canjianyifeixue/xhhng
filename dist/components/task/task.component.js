"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../table/index");
var fly_in_1 = require("../../animations/fly-in");
var core_2 = require("@covalent/core");
var jsesc_1 = require("../../util/jsesc");
var MhTaskComponent = /** @class */ (function (_super) {
    __extends(MhTaskComponent, _super);
    function MhTaskComponent(dataTableService, notificationService, taskService, cdr) {
        var _this = _super.call(this, dataTableService, cdr) || this;
        _this.notificationService = notificationService;
        _this.taskService = taskService;
        _this.columns = [
            { name: 'name', label: '任务名称', tooltip: '当前执行的节点名称' },
            { name: 'processName', label: '流程名称' },
            { name: 'createTime', label: '创建时间' },
            { name: 'operation', label: '操作' }
        ];
        _this.sortBy = '';
        _this.handleDialog = true;
        _this.customFilter = (function (data) { return data; });
        _this.userId = '';
        _this.data = [];
        _this.formMode = false;
        _this.formEditable = false;
        return _this;
    }
    MhTaskComponent.prototype.ngOnInit = function () {
        this.get();
    };
    MhTaskComponent.prototype.get = function () {
        var _this = this;
        this.taskService.getTaskList(this.userId, this.key).subscribe(function (data) {
            _this.data = _this.filterBizData(data.items);
            _this.filter();
        });
    };
    MhTaskComponent.prototype.trace = function (row) {
        window.open('/assets/activiti_modeler/diagram-viewer/index.html?' +
            ("processDefinitionId=" + row.processDefinitionId + "&processInstanceId=" + row.processInstanceId));
    };
    MhTaskComponent.prototype.handle = function (row) {
        // const form$ = this.taskService.getFormByProcessKey(row.processDefinitionId.split(':')[0]);
        // const data$ = this.taskService.getProcessInfo(row.processInstanceId);
        // const act$ = this.taskService.getDynamicField(row.id);
        // Observable.combineLatest(form$, data$, act$).subscribe(_ => {
        var _a = row._processData.slice() || [{}, {}, {}], forms = _a[0], data = _a[1], act = _a[2];
        if (Object.keys(forms).length <= 0 || Object.keys(data).length <= 0) {
            this.notificationService.error('数据异常！');
            return;
        }
        this.formControls = forms;
        var newData = Object.assign({}, data);
        var dataStr = newData.processData;
        newData.processData = JSON.parse(jsesc_1.jsesc(dataStr));
        this.formData = newData;
        this.selectedData = row;
        this.formEditable = this.canEdit(act);
        this.formMode = true;
        // })
    };
    MhTaskComponent.prototype.save = function (data) {
        var _this = this;
        if (!data) {
            this.cancel();
            return;
        }
        var processData = {};
        var bizFormData = null;
        if (data.formData) {
            for (var _i = 0, _a = Object.keys(data.formData); _i < _a.length; _i++) {
                var key = _a[_i];
                processData = Object.assign(processData, data.formData[key]);
            }
            bizFormData = data.formData;
            delete data['formData'];
        }
        else {
            for (var _b = 0, _c = Object.keys(this.formData.processData); _b < _c.length; _b++) {
                var key = _c[_b];
                processData = Object.assign(processData, this.formData.processData[key]);
            }
        }
        processData = Object.assign(processData, data);
        var formData = {
            userId: this.userId,
            taskId: this.selectedData.id,
            processInstanceId: this.selectedData.processInstanceId,
            formData: JSON.stringify(processData)
        };
        this.taskService.completeTask(formData)
            .flatMap(function (_) {
            var v = {
                taskId: _this.selectedData.id,
                state: _this.selectedData.name,
                processVar: JSON.stringify(data),
                processData: JSON.stringify(bizFormData ? bizFormData : _this.formData.processData)
            };
            var action$ = _this.taskService.updateProcess(_this.selectedData.processInstanceId, v);
            if (_.isFinish === true || _.isFinish === 'true') {
                action$ = action$.flatMap(function () { return _this.taskService.finishProcess(_this.selectedData.processInstanceId, JSON.parse(v.processVar)); });
            }
            return action$;
        })
            .subscribe(function (_) {
            _this.notificationService.success('提交成功');
            _this.get();
            _this.cancel();
        });
    };
    MhTaskComponent.prototype.cancel = function () {
        this.formMode = false;
        this.formData = undefined;
        this.formControls = undefined;
        this.selectedData = undefined;
        this.formEditable = false;
    };
    MhTaskComponent.prototype.canEdit = function (form) {
        if (!form.formData || !form.formData.formProperties) {
            return false;
        }
        for (var _i = 0, _a = form.formData.formProperties; _i < _a.length; _i++) {
            var field = _a[_i];
            if (field.id === 'editable' && field.writable === true) {
                return true;
            }
        }
        return false;
    };
    MhTaskComponent.prototype.filterBizData = function (data) {
        var tasks = [];
        // filter columns
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var row = data_1[_i];
            for (var _a = 0, _b = this.columns; _a < _b.length; _a++) {
                var col = _b[_a];
                if (col.get instanceof Function) {
                    row[col.name] = col.get(row);
                    break;
                }
            }
            tasks.push(row);
        }
        var newTasks = this.customFilter(tasks);
        if (!newTasks) {
            // throw new Error('customFilter必须有一个返回值, type: any[]');
            return tasks;
        }
        return newTasks;
    };
    MhTaskComponent.prototype.hasColumn = function (name) {
        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.name === name) {
                return true;
            }
        }
        return false;
    };
    __decorate([
        core_1.Input()
    ], MhTaskComponent.prototype, "key", void 0);
    __decorate([
        core_1.Input()
    ], MhTaskComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input()
    ], MhTaskComponent.prototype, "columns", void 0);
    __decorate([
        core_1.Input()
    ], MhTaskComponent.prototype, "sortBy", void 0);
    __decorate([
        core_1.Input()
    ], MhTaskComponent.prototype, "handleDialog", void 0);
    __decorate([
        core_1.Input()
    ], MhTaskComponent.prototype, "customFilter", void 0);
    __decorate([
        core_1.Input()
    ], MhTaskComponent.prototype, "userId", void 0);
    MhTaskComponent = __decorate([
        core_1.Component({
            selector: 'mh-task',
            templateUrl: './task.component.html',
            // changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [fly_in_1.flyIn, core_2.TdCollapseAnimation()]
        })
    ], MhTaskComponent);
    return MhTaskComponent;
}(index_1.BaseTable));
exports.MhTaskComponent = MhTaskComponent;
