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
import { MatDialog } from "@angular/material";
import { MhCascadSelectEntryComponent } from "./cascad-select-entry.component";
import { CascadSelectService } from "./cascad-select.service";
export var /** @type {?} */ CASCAD_SELECT_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicCascadSelectComponent; }),
    multi: true,
};
var MhDynamicCascadSelectComponent = (function (_super) {
    __extends(MhDynamicCascadSelectComponent, _super);
    function MhDynamicCascadSelectComponent(cascadSelectService, dialog) {
        var _this = _super.call(this) || this;
        _this.cascadSelectService = cascadSelectService;
        _this.dialog = dialog;
        _this.label = '';
        _this.required = false;
        _this.selections = [];
        _this.config = {};
        // this.cascadSelectService = new CascadSelectService(http)
        return _this;
    }
    Object.defineProperty(MhDynamicCascadSelectComponent.prototype, "value", {
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
            this._value = v;
            this.onChange(v);
            this.change();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MhDynamicCascadSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.change();
    };
    /**
     * @return {?}
     */
    MhDynamicCascadSelectComponent.prototype.change = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ options = {
            selections: this.config.depth && this.config.depth.length > 0 ? this.config.depth : this.selections,
            async: this.config.depth && this.config.depth.length > 0 ? true : false,
            title: this.label,
            default: this.value || [],
            keyField: this.config.valueField || 'key',
            valueField: this.config.showField || 'value',
        };
        if (options.async) {
            var /** @type {?} */ selectDepth = 0;
            this.cascadSelectService.initAsyncSelection(options.default, options.selections, [], selectDepth, options.keyField, options.valueField).subscribe(function (_) { return _this.init(_); });
        }
        else {
            this.cascadSelectService.initSelection(options.selections, options.default, options.keyField).filter(function (_) { return _; }).subscribe(function (_) { return _this.init(_); });
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    MhDynamicCascadSelectComponent.prototype.init = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ arr = [];
        for (var _i = 0, _a = data.selectedData; _i < _a.length; _i++) {
            var item = _a[_i];
            arr.push(item.value);
        }
        if (this.value && this.value.length > 0) {
            for (var _b = 0, _c = data.selections; _b < _c.length; _b++) {
                var selection = _c[_b];
                if (selection.key === this.value[this.value.length - 1]) {
                    arr.push(selection.value);
                    break;
                }
            }
        }
        this.showValue = arr.join('>>');
    };
    /**
     * @return {?}
     */
    MhDynamicCascadSelectComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ dialogRef = this.dialog.open(MhCascadSelectEntryComponent, {
            width: '64vh',
            height: '80vh',
            data: {
                selections: this.config.depth && this.config.depth.length > 0 ? this.config.depth : this.selections,
                async: this.config.depth && this.config.depth.length > 0 ? true : false,
                title: this.label,
                default: this.value || [],
                keyField: this.config.valueField || 'key',
                valueField: this.config.showField || 'value',
            }
        });
        dialogRef.afterClosed().filter(function (data) { return data; }).subscribe(function (data) {
            var /** @type {?} */ keyArr = [];
            var /** @type {?} */ valueArr = [];
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                keyArr.push(item.key);
                valueArr.push(item.value);
            }
            _this.control.setValue(keyArr);
            _this.showValue = valueArr.join('>>');
        });
    };
    // setValue(data: string) {
    //   for (const selection of this.selections) {
    //     if (selection.key === data) {
    //       this.data[0] = data
    //     } else {
    //       const arr = []
    //       this.findChildren(data, 0, selection.children || [], arr)
    //       for (const d of arr) {
    //         this.data[d.index] = d.key
    //         this.models[d.index] = d.selectoions
    //       }
    //       if (arr.length > 0) { this.data[0] = selection.key }
    //     }
    //   }
    // }
    // findChildren(data: string, index: number, selections: any, arr: any[]) {
    //   index++
    //   for (const s of selections) {
    //     if (s.key === data) {
    //       arr.push({ index: index, key: s.key, selectoions: selections })
    //       return true
    //     } else {
    //       const find = this.findChildren(data, index, s.children || [], arr)
    //       if (find) { arr.push({ index: index, key: s.key, selectoions: selections }) }
    //     }
    //   }
    //   return false
    // }
    // change(data: any, index: number) {
    //   let selection
    //   for (const model of this.models[index]) {
    //     if (data.value === model.key) { selection = model }
    //   }
    //   this.models[index + 1] = selection.children
    //   this.control.setValue(selection.children ? null : data.value)
    //   for (let i = index + 2; i < this.models.length; i++) {
    //     this.models[i] = undefined
    //   }
    //   for (let i = index + 1; i < this.models.length; i++) {
    //     this.data[i] = undefined
    //   }
    // }
    // getWidth(): string {
    //   return '25%'
    // }
    MhDynamicCascadSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-cascad-select',
                    template: "<div class=\"dynamic-cascad-select-wrapper\" layout=\"column\"> <mat-form-field> <input matInput type=\"text\" [(ngModel)]=\"showValue\" [placeholder]=\"label\" [required]=\"required\" readonly flex (click)=\"open()\"> <mat-icon matSuffix>arrow_drop_down</mat-icon> </mat-form-field> </div> ",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [CASCAD_SELECT_INPUT_CONTROL_VALUE_ACCESSOR, CascadSelectService]
                },] },
    ];
    /** @nocollapse */
    MhDynamicCascadSelectComponent.ctorParameters = function () { return [
        { type: CascadSelectService, },
        { type: MatDialog, },
    ]; };
    return MhDynamicCascadSelectComponent;
}(AbstractControlValueAccessor));
export { MhDynamicCascadSelectComponent };
function MhDynamicCascadSelectComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicCascadSelectComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicCascadSelectComponent.ctorParameters;
    /** @type {?} */
    MhDynamicCascadSelectComponent.prototype.control;
    /** @type {?} */
    MhDynamicCascadSelectComponent.prototype.label;
    /** @type {?} */
    MhDynamicCascadSelectComponent.prototype.required;
    /** @type {?} */
    MhDynamicCascadSelectComponent.prototype.selections;
    /** @type {?} */
    MhDynamicCascadSelectComponent.prototype.showValue;
    /** @type {?} */
    MhDynamicCascadSelectComponent.prototype.config;
    /** @type {?} */
    MhDynamicCascadSelectComponent.prototype._value;
    /** @type {?} */
    MhDynamicCascadSelectComponent.prototype.cascadSelectService;
    /** @type {?} */
    MhDynamicCascadSelectComponent.prototype.dialog;
}
