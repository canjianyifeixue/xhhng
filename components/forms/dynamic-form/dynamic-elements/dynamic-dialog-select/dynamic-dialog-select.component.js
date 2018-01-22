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
exports.DIALOG_SELECT_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MhDynamicDialogSelectComponent; }),
    multi: true,
};
var MhDynamicDialogSelectComponent = /** @class */ (function (_super) {
    __extends(MhDynamicDialogSelectComponent, _super);
    function MhDynamicDialogSelectComponent(dialog) {
        var _this = _super.call(this) || this;
        _this.dialog = dialog;
        _this.label = '';
        _this.required = false;
        _this.selections = undefined;
        _this.multiple = false;
        _this.showValue = '';
        return _this;
    }
    MhDynamicDialogSelectComponent.prototype.ngOnInit = function () {
        var data = this.value;
        if (data) {
            if (!this.multiple || data.length <= 1) {
                if (this.config
                    && this.config.showField
                    && this.config.showField.length > 0
                    && data[this.config.showField]
                    && this.config.valueField
                    && this.config.valueField.length > 0
                    && data[this.config.valueField]) {
                    this.control.setValue(data[this.config.valueField]);
                    this.showValue = data[this.config.showField];
                }
                else if (this.config
                    && this.config.showField
                    && this.config.showField.length > 0
                    && this.config.valueField
                    && this.config.valueField.length > 0) {
                    var selections = this.selections.items || this.selections;
                    for (var _i = 0, selections_1 = selections; _i < selections_1.length; _i++) {
                        var selection = selections_1[_i];
                        if (selection[this.config.valueField] === data) {
                            data = selection;
                            this.control.setValue(data[this.config.valueField]);
                            this.showValue = data[this.config.showField];
                            return;
                        }
                    }
                    this.control.setValue(data);
                    this.showValue = data;
                }
                else {
                    this.control.setValue(data);
                    this.showValue = data;
                }
            }
            else {
                this.control.setValue(data);
                this.showValue = "\u5DF2\u9009\u62E9 " + data.length + " \u6761\u6570\u636E";
            }
        }
    };
    MhDynamicDialogSelectComponent.prototype.open = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dynamic_dialog_entry_component_1.MhDynamicDialogEntryComponent, {
            width: (this.config && this.config.width) || '70%',
            data: {
                label: this.label,
                data: this.selections.items || this.selections,
                columns: this.selections.columns || [],
                multiple: this.multiple || false,
            }
        });
        dialogRef.afterClosed().filter(function (data) { return data; }).subscribe(function (data) {
            if (!_this.multiple || data.length <= 1) {
                if (_this.config
                    && _this.config.showField
                    && _this.config.showField.length > 0
                    && data[_this.config.showField]
                    && _this.config.valueField
                    && _this.config.valueField.length > 0
                    && data[_this.config.valueField]) {
                    _this.control.setValue(data[_this.config.valueField]);
                    _this.showValue = data[_this.config.showField];
                }
                else {
                    _this.control.setValue(JSON.stringify(data));
                    _this.showValue = JSON.stringify(data);
                }
            }
            else {
                _this.control.setValue(data);
                _this.showValue = "\u5DF2\u9009\u62E9 " + data.length + " \u6761\u6570\u636E";
            }
        });
    };
    MhDynamicDialogSelectComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-dialog-select',
            templateUrl: './dynamic-dialog-select.component.html',
            // changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [exports.DIALOG_SELECT_INPUT_CONTROL_VALUE_ACCESSOR]
        })
    ], MhDynamicDialogSelectComponent);
    return MhDynamicDialogSelectComponent;
}(abstract_control_value_accesor_1.AbstractControlValueAccessor));
exports.MhDynamicDialogSelectComponent = MhDynamicDialogSelectComponent;
