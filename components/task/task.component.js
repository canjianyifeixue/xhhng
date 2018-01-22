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
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { TdDataTableService } from "@covalent/core";
import { BaseTable } from "../table/index";
import { flyIn } from "../../animations/fly-in";
import { TdCollapseAnimation } from "@covalent/core";
import { NotificationService } from "../../services/index";
import { jsesc } from "../../util/jsesc";
import { TaskService } from "./task.service";
var MhTaskComponent = (function (_super) {
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
        _this.data = [];
        _this.formMode = false;
        _this.formEditable = false;
        return _this;
    }
    /**
     * @return {?}
     */
    MhTaskComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.userId = JSON.parse(localStorage.getItem('user') || "{id:null}").id;
        this.get();
    };
    /**
     * @return {?}
     */
    MhTaskComponent.prototype.get = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.taskService.getTaskList(this.userId, this.key).subscribe(function (data) {
            _this.data = _this.filterBizData(data.items);
            _this.filter();
        });
    };
    /**
     * @param {?} row
     * @return {?}
     */
    MhTaskComponent.prototype.trace = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        window.open('/assets/activiti_modeler/diagram-viewer/index.html?' +
            ("processDefinitionId=" + row.processDefinitionId + "&processInstanceId=" + row.processInstanceId));
    };
    /**
     * @param {?} row
     * @return {?}
     */
    MhTaskComponent.prototype.handle = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
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
        var /** @type {?} */ newData = Object.assign({}, data);
        var /** @type {?} */ dataStr = newData.processData;
        newData.processData = JSON.parse(jsesc(dataStr));
        this.formData = newData;
        this.selectedData = row;
        this.formEditable = this.canEdit(act);
        this.formMode = true;
        // })
    };
    /**
     * @param {?} data
     * @return {?}
     */
    MhTaskComponent.prototype.save = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (!data) {
            this.cancel();
            return;
        }
        var /** @type {?} */ processData = {};
        var /** @type {?} */ bizFormData = null;
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
        var /** @type {?} */ formData = {
            userId: this.userId,
            taskId: this.selectedData.id,
            processInstanceId: this.selectedData.processInstanceId,
            formData: JSON.stringify(processData)
        };
        this.taskService.completeTask(formData)
            .flatMap(function (_) {
            var /** @type {?} */ v = {
                taskId: _this.selectedData.id,
                state: _this.selectedData.name,
                processVar: JSON.stringify(data),
                processData: JSON.stringify(bizFormData ? bizFormData : _this.formData.processData)
            };
            var /** @type {?} */ action$ = _this.taskService.updateProcess(_this.selectedData.processInstanceId, v);
            if (_.isFinish === true || _.isFinish === 'true') {
                action$ = action$.flatMap(function () {
                    return _this.taskService.finishProcess(_this.selectedData.processInstanceId, JSON.parse(v.processVar));
                });
            }
            return action$;
        })
            .subscribe(function (_) {
            _this.notificationService.success('提交成功');
            _this.get();
            _this.cancel();
        });
    };
    /**
     * @return {?}
     */
    MhTaskComponent.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.formMode = false;
        this.formData = undefined;
        this.formControls = undefined;
        this.selectedData = undefined;
        this.formEditable = false;
    };
    /**
     * @param {?} form
     * @return {?}
     */
    MhTaskComponent.prototype.canEdit = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
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
    /**
     * @param {?} data
     * @return {?}
     */
    MhTaskComponent.prototype.filterBizData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ tasks = [];
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
        var /** @type {?} */ newTasks = this.customFilter(tasks);
        if (!newTasks) {
            // throw new Error('customFilter必须有一个返回值, type: any[]');
            return tasks;
        }
        return newTasks;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    MhTaskComponent.prototype.hasColumn = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.name === name) {
                return true;
            }
        }
        return false;
    };
    MhTaskComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-task',
                    template: "<div class=\"mat-content\" class=\"inset\"> <div *ngIf=\"!formMode\" layout=\"column\" layout-gt-sm=\"row\"> <div flex-gt-sm=\"100\"> <mat-card> <div layout=\"row\" layout-align=\"start center\" class=\"pad-left-sm pad-right-sm\"> <span *ngIf=\"!searchBox.searchVisible\" class=\"push-left-sm\"> <span class=\"mat-title\">{{title?title + ' - ':''}}任务列表</span> </span> <td-search-box #searchBox backIcon=\"arrow_back\" class=\"push-right-sm\" placeholder=\"在此输入搜索信息\" (searchDebounce)=\"search($event)\" flex> </td-search-box> </div> <mat-divider></mat-divider> <td-data-table #dataTable [data]=\"filteredData\" [columns]=\"columns\" [sortable]=\"true\" [sortBy]=\"sortBy\" [sortOrder]=\"sortOrder\" (sortChange)=\"sort($event)\"> <ng-template *ngIf=\"hasColumn('name')\" tdDataTableTemplate=\"name\" let-row=\"row\" let-value=\"value\"> <div layout=\"row\"> <button mat-button (click)=\"trace(row)\" matTooltip=\"流程跟踪\" matTooltipPosition=\"above\">{{value}}</button> </div> </ng-template> <ng-template *ngIf=\"hasColumn('operation')\" tdDataTableTemplate=\"operation\" let-row=\"row\"> <div layout=\"row\"> <button mat-icon-button matTooltip=\"办理\" (click)=\"handle(row)\"><mat-icon color=\"accent\">assignment</mat-icon></button> </div> </ng-template> <ng-template *ngIf=\"hasColumn('createTime')\" tdDataTableTemplate=\"createTime\" let-value=\"value\"> <div layout=\"row\"> {{value | date:\"yyyy-MM-dd HH:mm:ss\"}} </div> </ng-template> <ng-content></ng-content> </td-data-table> <div class=\"mat-padding\" *ngIf=\"!dataTable.hasData\" layout=\"row\" layout-align=\"center center\"> <h3>暂无数据！</h3> </div> <td-paging-bar #pagingBar [total]=\"filteredTotal\" [pageSize]=\"pageSize\" (change)=\"page($event)\"> <span td-paging-bar-label hide-xs>每行显示:</span> <mat-select [style.width.px]=\"50\" [(ngModel)]=\"pageSize\"> <mat-option *ngFor=\"let size of [5,10,15,20,50]\" [value]=\"size\"> {{size}} </mat-option> </mat-select> <span>{{'第 '+pagingBar.range+' 条   共 '+pagingBar.total+' 条'}}</span> </td-paging-bar> </mat-card> </div> </div> <div *ngIf=\"formMode\" [@flyIn]=\"'in'\"> <mh-task-form [forms]=\"formControls\" [data]=\"formData\" [editable]=\"formEditable\" (close)=\"save($event)\" [showDialog]=\"handleDialog\"></mh-task-form> </div> </div> ",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [flyIn, TdCollapseAnimation()]
                },] },
    ];
    /** @nocollapse */
    MhTaskComponent.ctorParameters = function () { return [
        { type: TdDataTableService, },
        { type: NotificationService, },
        { type: TaskService, },
        { type: ChangeDetectorRef, },
    ]; };
    MhTaskComponent.propDecorators = {
        "key": [{ type: Input },],
        "title": [{ type: Input },],
        "columns": [{ type: Input },],
        "sortBy": [{ type: Input },],
        "handleDialog": [{ type: Input },],
        "customFilter": [{ type: Input },],
    };
    return MhTaskComponent;
}(BaseTable));
export { MhTaskComponent };
function MhTaskComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhTaskComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhTaskComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MhTaskComponent.propDecorators;
    /** @type {?} */
    MhTaskComponent.prototype.key;
    /** @type {?} */
    MhTaskComponent.prototype.title;
    /** @type {?} */
    MhTaskComponent.prototype.columns;
    /** @type {?} */
    MhTaskComponent.prototype.sortBy;
    /** @type {?} */
    MhTaskComponent.prototype.handleDialog;
    /** @type {?} */
    MhTaskComponent.prototype.customFilter;
    /** @type {?} */
    MhTaskComponent.prototype.data;
    /** @type {?} */
    MhTaskComponent.prototype.userId;
    /** @type {?} */
    MhTaskComponent.prototype.formMode;
    /** @type {?} */
    MhTaskComponent.prototype.formControls;
    /** @type {?} */
    MhTaskComponent.prototype.formData;
    /** @type {?} */
    MhTaskComponent.prototype.formEditable;
    /** @type {?} */
    MhTaskComponent.prototype.selectedData;
    /** @type {?} */
    MhTaskComponent.prototype.notificationService;
    /** @type {?} */
    MhTaskComponent.prototype.taskService;
}
