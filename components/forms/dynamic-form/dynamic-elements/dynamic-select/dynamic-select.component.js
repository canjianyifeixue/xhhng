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
import { MhDynamicSelectEntryComponent } from "../dynamic-select-entry.component";
export var /** @type {?} */ SELECT_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicSelectComponent; }),
    multi: true,
};
var MhDynamicSelectComponent = (function (_super) {
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
            if (Array.isArray(v)) {
                var /** @type {?} */ valueArr = [];
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
    /**
     * @param {?} key
     * @return {?}
     */
    MhDynamicSelectComponent.prototype.getValue = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
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
    /**
     * @return {?}
     */
    MhDynamicSelectComponent.prototype.genSelections = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ arr = [];
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
    /**
     * @return {?}
     */
    MhDynamicSelectComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ dialogRef = this.dialog.open(MhDynamicSelectEntryComponent, {
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
                var /** @type {?} */ keyArr = [];
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
    MhDynamicSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-select',
                    template: "<div class=\"dynamic-input-wrapper\"> <mat-form-field> <!-- <mat-select #selectRef [(ngModel)]=\"value\" [multiple]=\"multiple\" [placeholder]=\"label\" [required]=\"required\"> <div layout=\"row\"> <mat-form-field flex=\"85\"> <input matInput flex> </mat-form-field> <button flex=\"15\" mat-icon-button (click)=\"control.reset();selectRef.close()\" matTooltip=\"清空所有选项\" matTooltipPosition=\"above\"> <mat-icon>close</mat-icon> </button> </div> <ng-template ngFor let-selection [ngForOf]=\"selections\"> <mat-option *ngIf=\"isObject(selection)\" [value]=\"selection.key\">{{selection.value}}</mat-option> <mat-option *ngIf=\"!isObject(selection)\" [value]=\"selection\">{{selection}}</mat-option> </ng-template> </mat-select> --> <input matInput type=\"text\" [(ngModel)]=\"showValue\" [placeholder]=\"label\" [required]=\"required\" readonly flex (click)=\"open()\"> <mat-icon matSuffix>arrow_drop_down</mat-icon> </mat-form-field> </div> ",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [SELECT_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MhDynamicSelectComponent.ctorParameters = function () { return [
        { type: MatDialog, },
    ]; };
    return MhDynamicSelectComponent;
}(AbstractControlValueAccessor));
export { MhDynamicSelectComponent };
function MhDynamicSelectComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicSelectComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicSelectComponent.ctorParameters;
    /** @type {?} */
    MhDynamicSelectComponent.prototype.control;
    /** @type {?} */
    MhDynamicSelectComponent.prototype.label;
    /** @type {?} */
    MhDynamicSelectComponent.prototype.showValue;
    /** @type {?} */
    MhDynamicSelectComponent.prototype.required;
    /** @type {?} */
    MhDynamicSelectComponent.prototype.multiple;
    /** @type {?} */
    MhDynamicSelectComponent.prototype.selections;
    /** @type {?} */
    MhDynamicSelectComponent.prototype._value;
    /** @type {?} */
    MhDynamicSelectComponent.prototype.dialog;
}
