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
exports.CHECKBOX_GROUP_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MhDynamicCheckboxGroupComponent; }),
    multi: true,
};
var MhDynamicCheckboxGroupComponent = /** @class */ (function (_super) {
    __extends(MhDynamicCheckboxGroupComponent, _super);
    function MhDynamicCheckboxGroupComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = '';
        _this.required = false;
        _this.selections = [];
        _this._value = [];
        return _this;
    }
    Object.defineProperty(MhDynamicCheckboxGroupComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (v === null) {
                v = [];
            }
            this._value = v;
            this.onChange(v);
        },
        enumerable: true,
        configurable: true
    });
    MhDynamicCheckboxGroupComponent.prototype.change = function (index) {
        var i = this._value.indexOf(this.selections[index]);
        if (i >= 0) {
            this.control.setValue(this._value.slice(0, i).concat(this._value.slice(i + 1)));
        }
        else {
            this.control.setValue(this._value.concat([
                this.selections[index]
            ]));
        }
    };
    MhDynamicCheckboxGroupComponent.prototype.isObject = function (value) {
        return typeof value === 'object';
    };
    MhDynamicCheckboxGroupComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-checkboxgroup',
            templateUrl: './dynamic-checkbox-group.component.html',
            // changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [exports.CHECKBOX_GROUP_INPUT_CONTROL_VALUE_ACCESSOR],
        })
    ], MhDynamicCheckboxGroupComponent);
    return MhDynamicCheckboxGroupComponent;
}(abstract_control_value_accesor_1.AbstractControlValueAccessor));
exports.MhDynamicCheckboxGroupComponent = MhDynamicCheckboxGroupComponent;
