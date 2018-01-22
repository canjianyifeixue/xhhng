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
exports.CHIPS_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MhDynamicChipsComponent; }),
    multi: true,
};
var MhDynamicChipsComponent = /** @class */ (function (_super) {
    __extends(MhDynamicChipsComponent, _super);
    function MhDynamicChipsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = '';
        _this.selections = [];
        _this.items = [];
        _this.readonly = false;
        _this.required = false;
        _this._value = [];
        return _this;
    }
    Object.defineProperty(MhDynamicChipsComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (v !== this._value) {
                if (v === null) {
                    this._value = [];
                }
                else {
                    this._value = v;
                    this.onChange(v);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    MhDynamicChipsComponent.prototype.ngOnInit = function () {
        this.items = [];
        for (var _i = 0, _a = this.selections; _i < _a.length; _i++) {
            var selection = _a[_i];
            if (typeof selection === 'object') {
                this.items = this.items.concat([selection.value]);
            }
            else {
                this.items = this.items.concat([selection]);
            }
        }
    };
    MhDynamicChipsComponent.prototype.add = function (v) {
        for (var _i = 0, _a = this.selections; _i < _a.length; _i++) {
            var selection = _a[_i];
            if (typeof selection === 'object') {
                if (v === selection.value) {
                    this.control.setValue(this._value.concat([selection.key]));
                }
            }
            else {
                if (v === selection) {
                    this.control.setValue(this._value.concat([selection]));
                }
            }
        }
    };
    MhDynamicChipsComponent.prototype.remove = function (v) {
        for (var i = 0; i < this.selections.length; i++) {
            var selection = this.selections[i];
            if (typeof selection === 'object') {
                if (v === selection.value) {
                    this.control.setValue(this._value.slice(0, i).concat([this._value.slice(i + 1)]));
                }
            }
            else {
                if (v === selection) {
                    this.control.setValue(this._value.slice(0, i).concat([this._value.slice(i + 1)]));
                }
            }
        }
    };
    MhDynamicChipsComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-chips',
            templateUrl: './dynamic-chips.component.html',
            // changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [exports.CHIPS_INPUT_CONTROL_VALUE_ACCESSOR]
        })
    ], MhDynamicChipsComponent);
    return MhDynamicChipsComponent;
}(abstract_control_value_accesor_1.AbstractControlValueAccessor));
exports.MhDynamicChipsComponent = MhDynamicChipsComponent;
