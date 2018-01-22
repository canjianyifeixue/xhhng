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
exports.DATE_PICKER_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MhDynamicDatepickerComponent; }),
    multi: true,
};
var MhDynamicDatepickerComponent = /** @class */ (function (_super) {
    __extends(MhDynamicDatepickerComponent, _super);
    function MhDynamicDatepickerComponent(dateAdapter) {
        var _this = _super.call(this) || this;
        _this.label = '';
        _this.type = '';
        _this.required = false;
        dateAdapter.setLocale('zh-CN');
        return _this;
    }
    Object.defineProperty(MhDynamicDatepickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (!(v instanceof Date) && v !== null) {
                v = new Date(v);
            }
            this._value = v;
            this.onChange(v);
        },
        enumerable: true,
        configurable: true
    });
    MhDynamicDatepickerComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-datepicker',
            templateUrl: './dynamic-datepicker.component.html',
            // changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [exports.DATE_PICKER_INPUT_CONTROL_VALUE_ACCESSOR]
        })
    ], MhDynamicDatepickerComponent);
    return MhDynamicDatepickerComponent;
}(abstract_control_value_accesor_1.AbstractControlValueAccessor));
exports.MhDynamicDatepickerComponent = MhDynamicDatepickerComponent;
