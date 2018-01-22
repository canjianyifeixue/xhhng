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
import { DateAdapter } from "@angular/material";
import { AbstractControlValueAccessor } from "../abstract-control-value-accesor";
export var /** @type {?} */ DATE_PICKER_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicDatepickerComponent; }),
    multi: true,
};
var MhDynamicDatepickerComponent = (function (_super) {
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
            if (!(v instanceof Date) && v !== null) {
                v = new Date(v);
            }
            this._value = v;
            this.onChange(v);
        },
        enumerable: true,
        configurable: true
    });
    MhDynamicDatepickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-datepicker',
                    template: "<div class=\"dynamic-input-wrapper\" layout=\"column\"> <!--<mat-form-field> <input matInput [(ngModel)]=\"value\" [placeholder]=\"label\" type=\"date\" [required]=\"required\" flex> </mat-form-field>--> <mat-form-field (click)=\"picker.open()\"> <input matInput [matDatepicker]=\"picker\" [(ngModel)]=\"value\" [placeholder]=\"label\" [required]=\"required\" flex readonly> <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle> </mat-form-field> <mat-datepicker #picker touchUi=\"true\"></mat-datepicker> </div> ",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [DATE_PICKER_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MhDynamicDatepickerComponent.ctorParameters = function () { return [
        { type: DateAdapter, },
    ]; };
    return MhDynamicDatepickerComponent;
}(AbstractControlValueAccessor));
export { MhDynamicDatepickerComponent };
function MhDynamicDatepickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicDatepickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicDatepickerComponent.ctorParameters;
    /** @type {?} */
    MhDynamicDatepickerComponent.prototype.control;
    /** @type {?} */
    MhDynamicDatepickerComponent.prototype.label;
    /** @type {?} */
    MhDynamicDatepickerComponent.prototype.type;
    /** @type {?} */
    MhDynamicDatepickerComponent.prototype.required;
    /** @type {?} */
    MhDynamicDatepickerComponent.prototype._value;
}
