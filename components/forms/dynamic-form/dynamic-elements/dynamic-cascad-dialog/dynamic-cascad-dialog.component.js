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
export var /** @type {?} */ CASCAD_DIALOG_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicCascadDialogComponent; }),
    multi: true,
};
var MhDynamicCascadDialogComponent = (function (_super) {
    __extends(MhDynamicCascadDialogComponent, _super);
    function MhDynamicCascadDialogComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MhDynamicCascadDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-cascad-dialog',
                    template: "<p> dynamic-cascad-dialog works! </p>",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [CASCAD_DIALOG_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MhDynamicCascadDialogComponent.ctorParameters = function () { return []; };
    return MhDynamicCascadDialogComponent;
}(AbstractControlValueAccessor));
export { MhDynamicCascadDialogComponent };
function MhDynamicCascadDialogComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicCascadDialogComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicCascadDialogComponent.ctorParameters;
}
