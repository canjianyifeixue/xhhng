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
export var /** @type {?} */ DIALOG_SELECT_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicDialogSelectComponent; }),
    multi: true,
};
var MhDynamicDialogSelectComponent = (function (_super) {
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
    /**
     * @return {?}
     */
    MhDynamicDialogSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ data = this.value;
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
                    var /** @type {?} */ selections = this.selections.items || this.selections;
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
    /**
     * @return {?}
     */
    MhDynamicDialogSelectComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ dialogRef = this.dialog.open(MhDynamicDialogEntryComponent, {
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
    MhDynamicDialogSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-dialog-select',
                    template: "<div class=\"dynamic-dialog-select-wrapper\" layout=\"column\"> <mat-form-field (click)=\"open()\"> <input  matInput [(ngModel)]=\"showValue\" [placeholder]=\"label\" [required]=\"required\" readonly=\"true\" flex> </mat-form-field> </div> ",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [DIALOG_SELECT_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MhDynamicDialogSelectComponent.ctorParameters = function () { return [
        { type: MatDialog, },
    ]; };
    return MhDynamicDialogSelectComponent;
}(AbstractControlValueAccessor));
export { MhDynamicDialogSelectComponent };
function MhDynamicDialogSelectComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicDialogSelectComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicDialogSelectComponent.ctorParameters;
    /** @type {?} */
    MhDynamicDialogSelectComponent.prototype.control;
    /** @type {?} */
    MhDynamicDialogSelectComponent.prototype.label;
    /** @type {?} */
    MhDynamicDialogSelectComponent.prototype.required;
    /** @type {?} */
    MhDynamicDialogSelectComponent.prototype.selections;
    /** @type {?} */
    MhDynamicDialogSelectComponent.prototype.multiple;
    /** @type {?} */
    MhDynamicDialogSelectComponent.prototype.showValue;
    /** @type {?} */
    MhDynamicDialogSelectComponent.prototype.config;
    /** @type {?} */
    MhDynamicDialogSelectComponent.prototype.dialog;
}
