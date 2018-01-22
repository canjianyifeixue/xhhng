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
export var /** @type {?} */ TEXTAREA_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicTextareaComponent; }),
    multi: true,
};
var MhDynamicTextareaComponent = (function (_super) {
    __extends(MhDynamicTextareaComponent, _super);
    function MhDynamicTextareaComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = '';
        _this.required = false;
        _this.pattern = '';
        _this.maxlength = null;
        _this.readonly = false;
        return _this;
    }
    // _value: any;
    // get value(): any {
    //   return encodeURI(this._value);
    // }
    // set value(v: any) {
    //   if (v !== this._value) {
    //     this._value = decodeURI(v);
    //     this.onChange(v);
    //   }
    // }
    MhDynamicTextareaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-textarea',
                    template: "<div class=\"dynamic-textarea-wrapper\" layout=\"column\"> <mat-form-field> <textarea #elementInput matInput [(ngModel)]=\"value\" [placeholder]=\"label\" [required]=\"required\" rows=\"4\" [pattern]=\"pattern\" [maxlength]=\"maxlength\" [readonly]=\"readonly\" flex> </textarea> </mat-form-field> </div> ",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [TEXTAREA_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MhDynamicTextareaComponent.ctorParameters = function () { return []; };
    return MhDynamicTextareaComponent;
}(AbstractControlValueAccessor));
export { MhDynamicTextareaComponent };
function MhDynamicTextareaComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicTextareaComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicTextareaComponent.ctorParameters;
    /** @type {?} */
    MhDynamicTextareaComponent.prototype.control;
    /** @type {?} */
    MhDynamicTextareaComponent.prototype.label;
    /** @type {?} */
    MhDynamicTextareaComponent.prototype.required;
    /** @type {?} */
    MhDynamicTextareaComponent.prototype.pattern;
    /** @type {?} */
    MhDynamicTextareaComponent.prototype.maxlength;
    /** @type {?} */
    MhDynamicTextareaComponent.prototype.readonly;
}
