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
export var /** @type {?} */ RADIO_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicRadioComponent; }),
    multi: true,
};
var MhDynamicRadioComponent = (function (_super) {
    __extends(MhDynamicRadioComponent, _super);
    function MhDynamicRadioComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = '';
        _this.required = false;
        _this.selections = undefined;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    MhDynamicRadioComponent.prototype.isObject = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'object';
    };
    MhDynamicRadioComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-radio',
                    template: "<div class=\"dynamic-radio-wrapper\"> <p>{{label}}</p> <mat-radio-group [name]=\"label\" [(ngModel)]=\"value\" layout=\"row\" layout-margin> <ng-template ngFor let-selection [ngForOf]=\"selections\"> <mat-radio-button *ngIf=\"isObject(selection)\" [value]=\"selection.key\" [name]=\"label\" flex> {{selection.value}} </mat-radio-button> <mat-radio-button *ngIf=\"!isObject(selection)\" [value]=\"selection\" [name]=\"label\" flex>{{selection}}</mat-radio-button> </ng-template> </mat-radio-group> </div> ",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [RADIO_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MhDynamicRadioComponent.ctorParameters = function () { return []; };
    return MhDynamicRadioComponent;
}(AbstractControlValueAccessor));
export { MhDynamicRadioComponent };
function MhDynamicRadioComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicRadioComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicRadioComponent.ctorParameters;
    /** @type {?} */
    MhDynamicRadioComponent.prototype.control;
    /** @type {?} */
    MhDynamicRadioComponent.prototype.label;
    /** @type {?} */
    MhDynamicRadioComponent.prototype.required;
    /** @type {?} */
    MhDynamicRadioComponent.prototype.default;
    /** @type {?} */
    MhDynamicRadioComponent.prototype.selections;
}
