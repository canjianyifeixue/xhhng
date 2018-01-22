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
import { AbstractControlValueAccessor } from "../abstract-control-value-accesor";
export var /** @type {?} */ CHECKBOX_GROUP_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicCheckboxGroupComponent; }),
    multi: true,
};
var MhDynamicCheckboxGroupComponent = (function (_super) {
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
            if (v === null) {
                v = [];
            }
            this._value = v;
            this.onChange(v);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} index
     * @return {?}
     */
    MhDynamicCheckboxGroupComponent.prototype.change = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var /** @type {?} */ i = this._value.indexOf(this.selections[index]);
        if (i >= 0) {
            this.control.setValue(this._value.slice(0, i).concat(this._value.slice(i + 1)));
        }
        else {
            this.control.setValue(this._value.concat([
                this.selections[index]
            ]));
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MhDynamicCheckboxGroupComponent.prototype.isObject = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'object';
    };
    MhDynamicCheckboxGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-checkboxgroup',
                    template: "<div class=\"dynamic-checkbox-group-wrapper\"> <label>{{label}}</label> <div layout-margin> <ng-template ngFor let-selection [ngForOf]=\"selections\" let-index=\"index\"> <mat-checkbox *ngIf=\"isObject(selection)\" (change)=\"change(index)\" [ngModel]=\"value.indexOf(selection) >= 0\" flex> {{selection.value}} </mat-checkbox> <mat-checkbox *ngIf=\"!isObject(selection)\" (change)=\"change(index)\" [ngModel]=\"value.indexOf(selection) >= 0\" flex> {{selection}} </mat-checkbox> </ng-template> </div> </div> ",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [CHECKBOX_GROUP_INPUT_CONTROL_VALUE_ACCESSOR],
                },] },
    ];
    /** @nocollapse */
    MhDynamicCheckboxGroupComponent.ctorParameters = function () { return []; };
    return MhDynamicCheckboxGroupComponent;
}(AbstractControlValueAccessor));
export { MhDynamicCheckboxGroupComponent };
function MhDynamicCheckboxGroupComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicCheckboxGroupComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicCheckboxGroupComponent.ctorParameters;
    /** @type {?} */
    MhDynamicCheckboxGroupComponent.prototype.control;
    /** @type {?} */
    MhDynamicCheckboxGroupComponent.prototype.label;
    /** @type {?} */
    MhDynamicCheckboxGroupComponent.prototype.required;
    /** @type {?} */
    MhDynamicCheckboxGroupComponent.prototype.selections;
    /** @type {?} */
    MhDynamicCheckboxGroupComponent.prototype._value;
}
