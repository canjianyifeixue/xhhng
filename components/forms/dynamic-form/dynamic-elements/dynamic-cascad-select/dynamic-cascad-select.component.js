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
var cascad_select_entry_component_1 = require("./cascad-select-entry.component");
var cascad_select_service_1 = require("./cascad-select.service");
exports.CASCAD_SELECT_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MhDynamicCascadSelectComponent; }),
    multi: true,
};
var MhDynamicCascadSelectComponent = /** @class */ (function (_super) {
    __extends(MhDynamicCascadSelectComponent, _super);
    function MhDynamicCascadSelectComponent(cascadSelectService, dialog) {
        var _this = _super.call(this) || this;
        _this.cascadSelectService = cascadSelectService;
        _this.dialog = dialog;
        _this.label = '';
        _this.required = false;
        _this.selections = [];
        _this.config = {};
        return _this;
        // this.cascadSelectService = new CascadSelectService(http)
    }
    Object.defineProperty(MhDynamicCascadSelectComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            this._value = v;
            this.onChange(v);
            this.change();
        },
        enumerable: true,
        configurable: true
    });
    MhDynamicCascadSelectComponent.prototype.ngOnInit = function () {
        this.change();
    };
    MhDynamicCascadSelectComponent.prototype.change = function () {
        var _this = this;
        var options = {
            selections: this.config.depth && this.config.depth.length > 0 ? this.config.depth : this.selections,
            async: this.config.depth && this.config.depth.length > 0 ? true : false,
            title: this.label,
            default: this.value || [],
            keyField: this.config.valueField || 'key',
            valueField: this.config.showField || 'value',
        };
        if (options.async) {
            var selectDepth = 0;
            this.cascadSelectService.initAsyncSelection(options.default, options.selections, [], selectDepth, options.keyField, options.valueField).subscribe(function (_) { return _this.init(_); });
        }
        else {
            this.cascadSelectService.initSelection(options.selections, options.default, options.keyField).filter(function (_) { return _; }).subscribe(function (_) { return _this.init(_); });
        }
    };
    MhDynamicCascadSelectComponent.prototype.init = function (data) {
        var arr = [];
        for (var _i = 0, _a = data.selectedData; _i < _a.length; _i++) {
            var item = _a[_i];
            arr.push(item.value);
        }
        if (this.value && this.value.length > 0) {
            for (var _b = 0, _c = data.selections; _b < _c.length; _b++) {
                var selection = _c[_b];
                if (selection.key === this.value[this.value.length - 1]) {
                    arr.push(selection.value);
                    break;
                }
            }
        }
        this.showValue = arr.join('>>');
    };
    MhDynamicCascadSelectComponent.prototype.open = function () {
        var _this = this;
        var dialogRef = this.dialog.open(cascad_select_entry_component_1.MhCascadSelectEntryComponent, {
            width: '64vh',
            height: '80vh',
            data: {
                selections: this.config.depth && this.config.depth.length > 0 ? this.config.depth : this.selections,
                async: this.config.depth && this.config.depth.length > 0 ? true : false,
                title: this.label,
                default: this.value || [],
                keyField: this.config.valueField || 'key',
                valueField: this.config.showField || 'value',
            }
        });
        dialogRef.afterClosed().filter(function (data) { return data; }).subscribe(function (data) {
            var keyArr = [];
            var valueArr = [];
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                keyArr.push(item.key);
                valueArr.push(item.value);
            }
            _this.control.setValue(keyArr);
            _this.showValue = valueArr.join('>>');
        });
    };
    MhDynamicCascadSelectComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-cascad-select',
            templateUrl: './dynamic-cascad-select.component.html',
            // changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [exports.CASCAD_SELECT_INPUT_CONTROL_VALUE_ACCESSOR, cascad_select_service_1.CascadSelectService]
        })
    ], MhDynamicCascadSelectComponent);
    return MhDynamicCascadSelectComponent;
}(abstract_control_value_accesor_1.AbstractControlValueAccessor));
exports.MhDynamicCascadSelectComponent = MhDynamicCascadSelectComponent;
