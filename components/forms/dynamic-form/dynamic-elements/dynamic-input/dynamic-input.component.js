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
export var /** @type {?} */ INPUT_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicInputComponent; }),
    multi: true,
};
var MhDynamicInputComponent = (function (_super) {
    __extends(MhDynamicInputComponent, _super);
    function MhDynamicInputComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = '';
        _this.type = '';
        _this.readonly = false;
        _this.required = false;
        _this.min = null;
        _this.max = null;
        _this.pattern = '';
        _this.maxlength = null;
        return _this;
    }
    /**
     * @return {?}
     */
    MhDynamicInputComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ change$ = this.control.valueChanges;
        change$.map(function (v) { return _this.control.errors; })
            .subscribe(function (v) {
            if (v === null) {
                _this.tooltip = '';
            }
            else if (v.pattern && _this.config && _this.config.patternErrors) {
                _this.tooltip = _this.config.patternErrors;
            }
        });
    };
    MhDynamicInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-input',
                    template: "<div class=\"dynamic-input-wrapper\" layout=\"column\"> <mat-form-field> <input #elementInput matInput [(ngModel)]=\"value\" [placeholder]=\"label\" [type]=\"type\" [required]=\"required\" [min]=\"min\" [max]=\"max\" [pattern]=\"pattern\" [maxlength]=\"maxlength\" [matTooltip]=\"tooltip\" [readonly]=\"readonly\" matTooltipPosition=\"above\" flex> <mat-icon *ngIf=\"config?.icon\" matPrefix [color]=\"config?.iconColor\">{{config.icon}}</mat-icon> <span *ngIf=\"config?.suffix\" matSuffix>{{config.suffix}}</span> <mat-hint *ngIf=\"maxlength\" align=\"end\">{{elementInput.value.length}} / {{maxlength}}</mat-hint> </mat-form-field> </div> ",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [INPUT_INPUT_CONTROL_VALUE_ACCESSOR],
                },] },
    ];
    /** @nocollapse */
    MhDynamicInputComponent.ctorParameters = function () { return []; };
    return MhDynamicInputComponent;
}(AbstractControlValueAccessor));
export { MhDynamicInputComponent };
function MhDynamicInputComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicInputComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicInputComponent.ctorParameters;
    /** @type {?} */
    MhDynamicInputComponent.prototype.control;
    /** @type {?} */
    MhDynamicInputComponent.prototype.label;
    /** @type {?} */
    MhDynamicInputComponent.prototype.type;
    /** @type {?} */
    MhDynamicInputComponent.prototype.readonly;
    /** @type {?} */
    MhDynamicInputComponent.prototype.required;
    /** @type {?} */
    MhDynamicInputComponent.prototype.min;
    /** @type {?} */
    MhDynamicInputComponent.prototype.max;
    /** @type {?} */
    MhDynamicInputComponent.prototype.pattern;
    /** @type {?} */
    MhDynamicInputComponent.prototype.maxlength;
    /** @type {?} */
    MhDynamicInputComponent.prototype.tooltip;
    /** @type {?} */
    MhDynamicInputComponent.prototype.config;
}
