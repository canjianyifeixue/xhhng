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
export var /** @type {?} */ CHIPS_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicChipsComponent; }),
    multi: true,
};
var MhDynamicChipsComponent = (function (_super) {
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
    /**
     * @return {?}
     */
    MhDynamicChipsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    /**
     * @param {?} v
     * @return {?}
     */
    MhDynamicChipsComponent.prototype.add = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
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
    /**
     * @param {?} v
     * @return {?}
     */
    MhDynamicChipsComponent.prototype.remove = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        for (var /** @type {?} */ i = 0; i < this.selections.length; i++) {
            var /** @type {?} */ selection = this.selections[i];
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
    MhDynamicChipsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-chips',
                    template: "<div class=\"dynamic-chips-wrapper\" style=\"padding-bottom:24px\"> <td-chips [items]=\"items\" [(ngModel)]=\"value\" [placeholder]=\"label\" [disabled]=\"readonly\" requireMatch [required]=\"required\" (add)=\"add($event)\" (remove)=\"remove($event)\"> </td-chips> </div> ",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [CHIPS_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MhDynamicChipsComponent.ctorParameters = function () { return []; };
    return MhDynamicChipsComponent;
}(AbstractControlValueAccessor));
export { MhDynamicChipsComponent };
function MhDynamicChipsComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicChipsComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicChipsComponent.ctorParameters;
    /** @type {?} */
    MhDynamicChipsComponent.prototype.control;
    /** @type {?} */
    MhDynamicChipsComponent.prototype.label;
    /** @type {?} */
    MhDynamicChipsComponent.prototype.selections;
    /** @type {?} */
    MhDynamicChipsComponent.prototype.items;
    /** @type {?} */
    MhDynamicChipsComponent.prototype.readonly;
    /** @type {?} */
    MhDynamicChipsComponent.prototype.required;
    /** @type {?} */
    MhDynamicChipsComponent.prototype._value;
}
