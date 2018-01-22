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
export var /** @type {?} */ CHECKBOX_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicCheckboxComponent; }),
    multi: true,
};
var MhDynamicCheckboxComponent = (function (_super) {
    __extends(MhDynamicCheckboxComponent, _super);
    function MhDynamicCheckboxComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = '';
        _this.required = false;
        return _this;
    }
    /**
     * @return {?}
     */
    MhDynamicCheckboxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this._value === null) {
            this.control.setValue(false);
        }
    };
    MhDynamicCheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-checkbox',
                    template: "<div class=\"dynamic-checkbox-wrapper\"> <mat-checkbox [(ngModel)]=\"value\" [required]=\"required\" flex> {{label}} </mat-checkbox> </div> ",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [CHECKBOX_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MhDynamicCheckboxComponent.ctorParameters = function () { return []; };
    return MhDynamicCheckboxComponent;
}(AbstractControlValueAccessor));
export { MhDynamicCheckboxComponent };
function MhDynamicCheckboxComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicCheckboxComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicCheckboxComponent.ctorParameters;
    /** @type {?} */
    MhDynamicCheckboxComponent.prototype.control;
    /** @type {?} */
    MhDynamicCheckboxComponent.prototype.label;
    /** @type {?} */
    MhDynamicCheckboxComponent.prototype.required;
}
