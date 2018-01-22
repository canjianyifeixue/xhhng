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
var dynamic_select_entry_component_1 = require("../dynamic-select-entry.component");
exports.SELECT_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MhDynamicSelectComponent; }),
    multi: true,
};
var MhDynamicSelectComponent = /** @class */ (function (_super) {
    __extends(MhDynamicSelectComponent, _super);
    function MhDynamicSelectComponent(dialog) {
        var _this = _super.call(this) || this;
        _this.dialog = dialog;
        _this.label = '';
        _this.showValue = '';
        _this.required = false;
        _this.multiple = false;
        _this.selections = [];
        return _this;
    }
    Object.defineProperty(MhDynamicSelectComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (Array.isArray(v)) {
                var valueArr = [];
                for (var _i = 0, v_1 = v; _i < v_1.length; _i++) {
                    var row = v_1[_i];
                    if (row && row.key) {
                        valueArr.push(row.value);
                    }
                    else {
                        valueArr.push(this.getValue(row));
                    }
                }
                this.showValue = valueArr.join(',');
                this._value = v;
                this.onChange(v);
            }
            else if (v && v.value && v.key) {
                this.showValue = v.value;
                this._value = v.key;
                this.onChange(v.key);
            }
            else {
                this.showValue = this.getValue(v);
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    MhDynamicSelectComponent.prototype.getValue = function (key) {
        if (!key) {
            return '';
        }
        for (var _i = 0, _a = this.selections; _i < _a.length; _i++) {
            var selection = _a[_i];
            if (typeof selection === 'string') {
                return key;
            }
            if (selection.key === key) {
                return selection.value;
            }
        }
        return '';
    };
    MhDynamicSelectComponent.prototype.genSelections = function () {
        var arr = [];
        for (var _i = 0, _a = this.selections; _i < _a.length; _i++) {
            var selection = _a[_i];
            if (typeof selection === 'string') {
                arr.push({ key: selection, value: selection });
            }
            else {
                arr.push({ key: selection.key, value: selection.value });
            }
        }
        return arr;
    };
    MhDynamicSelectComponent.prototype.open = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dynamic_select_entry_component_1.MhDynamicSelectEntryComponent, {
            width: '64vh',
            height: '80vh',
            data: {
                selections: this.genSelections(),
                multiple: this.multiple || false,
                title: this.label,
                default: this.value,
            }
        });
        dialogRef.afterClosed().filter(function (data) { return data; }).subscribe(function (data) {
            if (_this.multiple) {
                var keyArr = [];
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    keyArr.push(item.key);
                }
                _this.control.setValue(keyArr);
            }
            else {
                _this.control.setValue(data.key);
            }
        });
    };
    MhDynamicSelectComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-select',
            templateUrl: './dynamic-select.component.html',
            // changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [exports.SELECT_INPUT_CONTROL_VALUE_ACCESSOR]
        })
    ], MhDynamicSelectComponent);
    return MhDynamicSelectComponent;
}(abstract_control_value_accesor_1.AbstractControlValueAccessor));
exports.MhDynamicSelectComponent = MhDynamicSelectComponent;
