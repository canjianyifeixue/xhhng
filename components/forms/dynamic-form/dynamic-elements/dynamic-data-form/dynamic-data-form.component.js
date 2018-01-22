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
import { Component, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { AbstractControlValueAccessor } from "../abstract-control-value-accesor";
import { MhDynamicDialogEntryComponent } from "../dynamic-dialog-entry.component";
export var /** @type {?} */ DATA_FORM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicDataFormComponent; }),
    multi: true,
};
var MhDynamicDataFormComponent = (function (_super) {
    __extends(MhDynamicDataFormComponent, _super);
    function MhDynamicDataFormComponent(dialog) {
        var _this = _super.call(this) || this;
        _this.dialog = dialog;
        _this.length = 0;
        _this.idField = '_$id_';
        _this.stateField = '_$state_';
        _this.label = '';
        _this.required = false;
        _this.selections = undefined;
        _this.controls = [];
        _this._value = [];
        return _this;
    }
    Object.defineProperty(MhDynamicDataFormComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._value) {
                if (v !== null && this.config && this.config.stateMode) {
                    for (var _i = 0, v_1 = v; _i < v_1.length; _i++) {
                        var vl = v_1[_i];
                        if (vl[this.stateField] === undefined) {
                            vl[this.stateField] = 0;
                            vl[this.idField] = this.length += 1;
                        }
                    }
                }
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MhDynamicDataFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this._value === null) {
            this.control.setValue([]);
        }
        else {
            var /** @type {?} */ value = [];
            for (var /** @type {?} */ i = 0; i < this._value.length; i++) {
                var /** @type {?} */ v = this._value[i];
                if (this.config && this.config.stateMode) {
                    v[this.idField] = i + 1;
                    v[this.stateField] = 0;
                }
                value = value.concat([v]);
                this.length = i + 1;
            }
            this.control.setValue(value);
        }
    };
    /**
     * 获取表单模型
     * @return {?}
     */
    MhDynamicDataFormComponent.prototype.getModel = /**
     * 获取表单模型
     * @return {?}
     */
    function () {
        var /** @type {?} */ obj = {};
        for (var _i = 0, _a = this.controls; _i < _a.length; _i++) {
            var control = _a[_i];
            if (control.type === 'boolean') {
                control.default = control.default ? control.default : false;
            }
            obj[control.name] = control.default === undefined ? null : control.default;
        }
        return obj;
    };
    /**
     * 增加新的一条数据
     * @return {?}
     */
    MhDynamicDataFormComponent.prototype.add = /**
     * 增加新的一条数据
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.selections || this.selections === null || this.selections.length <= 0) {
            var /** @type {?} */ model = this.getModel();
            this.insertData(model);
            return;
        }
        var /** @type {?} */ dialogRef = this.dialog.open(MhDynamicDialogEntryComponent, {
            width: '70%',
            data: { label: this.label, data: this.selections.items || this.selections, columns: this.selections.columns || [] }
        });
        dialogRef.afterClosed().filter(function (data) { return data; }).subscribe(function (data) {
            for (var _i = 0, _a = _this._value; _i < _a.length; _i++) {
                var row = _a[_i];
                if (row.id && row.id === data.id) {
                    return;
                }
            }
            _this.insertData(data);
        });
    };
    /**
     * 插入数据的实现
     * @param {?} data
     * @return {?}
     */
    MhDynamicDataFormComponent.prototype.insertData = /**
     * 插入数据的实现
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (this.config && this.config.stateMode) {
            data[this.idField] = this.length += 1;
            data[this.stateField] = 1;
        }
        this.control.setValue(this._value.concat([
            data
        ]));
    };
    /**
     * 删除一条数据
     * @param {?} index
     * @return {?}
     */
    MhDynamicDataFormComponent.prototype.remove = /**
     * 删除一条数据
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.config && this.config.stateMode) {
            var /** @type {?} */ value = this._value;
            if (value[index][this.stateField] === 1) {
                value = value.slice(0, index).concat(value.slice(index + 1));
            }
            else {
                value[index][this.stateField] = 3;
            }
            this.control.setValue(value);
        }
        else {
            this.control.setValue(this._value.slice(0, index).concat(this._value.slice(index + 1)));
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MhDynamicDataFormComponent.prototype.isObject = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'object';
    };
    /**
     * @param {?} index
     * @return {?}
     */
    MhDynamicDataFormComponent.prototype.change = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.config && this.config.stateMode && this._value[index][this.stateField] === 0) {
            var /** @type {?} */ value = this._value;
            value[index][this.stateField] = 2;
            this.control.setValue(value);
        }
    };
    /**
     * @param {?} pagingEvent
     * @return {?}
     */
    MhDynamicDataFormComponent.prototype.page = /**
     * @param {?} pagingEvent
     * @return {?}
     */
    function (pagingEvent) {
        // const fromRow = pagingEvent.fromRow;
        // const currentPage = pagingEvent.page;
        // const pageSize = pagingEvent.pageSize;
    };
    MhDynamicDataFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-data-form',
                    template: "<div class=\"dynamic-data-form-wrapper\"> <label>{{label}}</label> <button mat-icon-button color=\"accent\" (click)=\"add()\"> <mat-icon>add</mat-icon> </button> <td-virtual-scroll-container #virtualScroll [style.height.px]=\"410\" [data]=\"value\"> <ng-template let-index=\"index\" let-last=\"last\" tdVirtualScrollRow> <div layout=\"row\" *ngIf=\"value[index]._$state_ !== 3\"> <button flex=\"10\" mat-icon-button (click)=\"remove(index)\"> <mat-icon color=\"warn\">remove</mat-icon> </button> <div flex=\"90\" layout=\"row\" layout-wrap layout-margin layout-align=\"start center\"> <div flex-xs=\"50\" flex-gt-xs=\"25\" *ngFor=\"let control of controls\" [ngSwitch]=\"control.type\"> <mat-checkbox (change)=\"change(index)\" *ngSwitchCase=\"'boolean'\" [(ngModel)]=\"value[index][control.name]\" [name]=\"control.name\" [required]=\"control.required\"> {{control.label}} </mat-checkbox> <mat-form-field *ngSwitchCase=\"'enum'\"> <mat-select (change)=\"change(index)\" [(ngModel)]=\"value[index][control.name]\" [placeholder]=\"control.label\" [required]=\"control.required\"> <ng-template ngFor let-opt [ngForOf]=\"control.selections\"> <mat-option *ngIf=\"isObject(opt)\" [value]=\"opt.key\">{{opt.value}}</mat-option> <mat-option *ngIf=\"!isObject(opt)\" [value]=\"opt\">{{opt}}</mat-option> </ng-template> </mat-select> </mat-form-field> <mat-form-field flex=\"95\" *ngSwitchCase=\"'date'\" (click)=\"picker.open()\"> <input matInput [matDatepicker]=\"picker\" [name]=\"control.name\" [(ngModel)]=\"value[index][control.name]\" [placeholder]=\"control.label\" readonly> <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle> </mat-form-field> <mat-datepicker #picker></mat-datepicker> <mat-form-field *ngSwitchDefault> <input (change)=\"change(index)\" matInput [(ngModel)]=\"value[index][control.name]\" [name]=\"control.name\" [placeholder]=\"control.label\" [type]=\"control.type\" [required]=\"control.required\" [readonly]=\"control.readonly\"> </mat-form-field> </div> </div> </div> </ng-template> </td-virtual-scroll-container> <!--           <td-paging-bar #pagingBar [total]=\"filteredTotal\" [pageSize]=\"pageSize\" (change)=\"page($event)\"> <span td-paging-bar-label hide-xs>每行显示:</span> <mat-select [style.width.px]=\"50\" [(ngModel)]=\"pageSize\"> <mat-option *ngFor=\"let size of [5,10,15,20,50]\" [value]=\"size\"> {{size}} </mat-option> </mat-select> <span>{{'第 '+pagingBar.range+' 条   共 '+pagingBar.total+' 条'}}</span> </td-paging-bar> --> </div> ",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [DATA_FORM_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MhDynamicDataFormComponent.ctorParameters = function () { return [
        { type: MatDialog, },
    ]; };
    return MhDynamicDataFormComponent;
}(AbstractControlValueAccessor));
export { MhDynamicDataFormComponent };
function MhDynamicDataFormComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicDataFormComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicDataFormComponent.ctorParameters;
    /** @type {?} */
    MhDynamicDataFormComponent.prototype.length;
    /** @type {?} */
    MhDynamicDataFormComponent.prototype.idField;
    /** @type {?} */
    MhDynamicDataFormComponent.prototype.stateField;
    /** @type {?} */
    MhDynamicDataFormComponent.prototype.control;
    /** @type {?} */
    MhDynamicDataFormComponent.prototype.label;
    /** @type {?} */
    MhDynamicDataFormComponent.prototype.required;
    /** @type {?} */
    MhDynamicDataFormComponent.prototype.selections;
    /** @type {?} */
    MhDynamicDataFormComponent.prototype.controls;
    /** @type {?} */
    MhDynamicDataFormComponent.prototype.config;
    /** @type {?} */
    MhDynamicDataFormComponent.prototype._value;
    /** @type {?} */
    MhDynamicDataFormComponent.prototype.dialog;
}
