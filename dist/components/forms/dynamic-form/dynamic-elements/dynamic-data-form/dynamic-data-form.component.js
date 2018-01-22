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
var forms_1 = require("@angular/forms");
var abstract_control_value_accesor_1 = require("../abstract-control-value-accesor");
var dynamic_dialog_entry_component_1 = require("../dynamic-dialog-entry.component");
exports.DATA_FORM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MhDynamicDataFormComponent; }),
    multi: true,
};
var MhDynamicDataFormComponent = /** @class */ (function (_super) {
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
        get: function () {
            return this._value;
        },
        set: function (v) {
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
    MhDynamicDataFormComponent.prototype.ngOnInit = function () {
        if (this._value === null) {
            this.control.setValue([]);
        }
        else {
            var value = [];
            for (var i = 0; i < this._value.length; i++) {
                var v = this._value[i];
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
     */
    MhDynamicDataFormComponent.prototype.getModel = function () {
        var obj = {};
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
     */
    MhDynamicDataFormComponent.prototype.add = function () {
        var _this = this;
        if (!this.selections || this.selections === null || this.selections.length <= 0) {
            var model = this.getModel();
            this.insertData(model);
            return;
        }
        var dialogRef = this.dialog.open(dynamic_dialog_entry_component_1.MhDynamicDialogEntryComponent, {
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
     */
    MhDynamicDataFormComponent.prototype.insertData = function (data) {
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
     */
    MhDynamicDataFormComponent.prototype.remove = function (index) {
        if (this.config && this.config.stateMode) {
            var value = this._value;
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
    MhDynamicDataFormComponent.prototype.isObject = function (value) {
        return typeof value === 'object';
    };
    MhDynamicDataFormComponent.prototype.change = function (index) {
        if (this.config && this.config.stateMode && this._value[index][this.stateField] === 0) {
            var value = this._value;
            value[index][this.stateField] = 2;
            this.control.setValue(value);
        }
    };
    MhDynamicDataFormComponent.prototype.page = function (pagingEvent) {
        // const fromRow = pagingEvent.fromRow;
        // const currentPage = pagingEvent.page;
        // const pageSize = pagingEvent.pageSize;
    };
    MhDynamicDataFormComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-data-form',
            templateUrl: './dynamic-data-form.component.html',
            // changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [exports.DATA_FORM_INPUT_CONTROL_VALUE_ACCESSOR]
        })
    ], MhDynamicDataFormComponent);
    return MhDynamicDataFormComponent;
}(abstract_control_value_accesor_1.AbstractControlValueAccessor));
exports.MhDynamicDataFormComponent = MhDynamicDataFormComponent;
