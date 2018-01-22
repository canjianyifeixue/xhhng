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
export var /** @type {?} */ SLIDER_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicSliderComponent; }),
    multi: true,
};
var MhDynamicSliderComponent = (function (_super) {
    __extends(MhDynamicSliderComponent, _super);
    function MhDynamicSliderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = '';
        _this.required = false;
        _this.min = null;
        _this.max = null;
        return _this;
    }
    MhDynamicSliderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-slider',
                    template: "<div class=\"dynamic-slider-wrapper relative push-top\" flex layout=\"column\"> <label class=\"mat-input-placeholder mat-float td-slider-label\" [class.mat-focused]=\"slider._isActive\"> {{label}} <span *ngIf=\"required\" class=\"mat-placeholder-required\">*</span></label> <div layout=\"row\" layout-align=\"start center\" flex> <mat-slider #slider [(ngModel)]=\"value\" [min]=\"min\" [max]=\"max\" thumbLabel tickInterval=\"auto\" [required]=\"required\" flex> </mat-slider> </div>   </div>",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [SLIDER_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MhDynamicSliderComponent.ctorParameters = function () { return []; };
    return MhDynamicSliderComponent;
}(AbstractControlValueAccessor));
export { MhDynamicSliderComponent };
function MhDynamicSliderComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicSliderComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicSliderComponent.ctorParameters;
    /** @type {?} */
    MhDynamicSliderComponent.prototype.control;
    /** @type {?} */
    MhDynamicSliderComponent.prototype.label;
    /** @type {?} */
    MhDynamicSliderComponent.prototype.required;
    /** @type {?} */
    MhDynamicSliderComponent.prototype.min;
    /** @type {?} */
    MhDynamicSliderComponent.prototype.max;
}
