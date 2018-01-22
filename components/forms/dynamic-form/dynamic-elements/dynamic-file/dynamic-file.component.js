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
import { Component, forwardRef, Inject } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { MhDynamicLoaderService } from "../../dynamic-loader.service";
import { AbstractControlValueAccessor } from "../abstract-control-value-accesor";
export var /** @type {?} */ FILE_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicFileComponent; }),
    multi: true,
};
var MhDynamicFileComponent = (function (_super) {
    __extends(MhDynamicFileComponent, _super);
    function MhDynamicFileComponent(notificationService, dynamicLoaderService) {
        var _this = _super.call(this) || this;
        _this.notificationService = notificationService;
        _this.dynamicLoaderService = dynamicLoaderService;
        _this.label = '';
        _this.maxlength = undefined;
        return _this;
    }
    Object.defineProperty(MhDynamicFileComponent.prototype, "value", {
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
            var _this = this;
            if (v === null) {
                this._value = null;
            }
            else if (typeof v === 'string') {
                this.dynamicLoaderService.loadFiles(v)
                    .subscribe(function (_) {
                    // const file = new File([_.blob], _.name)
                    // const file = new File([_.blob], _.name)
                    _this._value = _;
                    _this.onChange(_);
                });
            }
            else if (v instanceof File || v instanceof FileList || Array.isArray(v)) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} files
     * @return {?}
     */
    MhDynamicFileComponent.prototype.select = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        if (this.maxlength) {
            if (files instanceof FileList) {
                var /** @type {?} */ err = false;
                for (var /** @type {?} */ i = 0; i < files.length; i++) {
                    var /** @type {?} */ file = files.item(i);
                    if (file.size > this.maxlength) {
                        err = true;
                        break;
                    }
                }
                if (err) {
                    this.notificationService.error('文件太大！');
                    this.control.setValue(null);
                }
            }
            else if (files instanceof File) {
                if (files.size > this.maxlength) {
                    this.notificationService.error('文件太大！');
                    this.control.setValue(null);
                }
            }
        }
    };
    /**
     * @param {?} path
     * @return {?}
     */
    MhDynamicFileComponent.prototype.preview = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        this.dynamicLoaderService.download(path).subscribe();
    };
    // clearEvent(): void {
    //   this.files = null;
    // };
    MhDynamicFileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-file',
                    template: "<div class=\"dynamic-input-wrapper\" layout=\"row\"> <mat-form-field tdFileDrop [multiple]=\"multiple\" (fileDrop)=\"value = $event\" (click)=\"fileInput.inputElement.click()\" flex> <input matInput [placeholder]=\"label\" [value]=\"value?.length ? ('共 ' + value?.length + ' 个文件') : value?.name\" readonly [required]=\"required\" /> </mat-form-field> <button mat-icon-button *ngIf=\"value?.path\" (click)=\"preview(value.path)\"> <mat-icon color=\"accent\">file_download</mat-icon> </button> <button mat-icon-button *ngIf=\"value\" (click)=\"value=null\"> <mat-icon color=\"warn\">cancel</mat-icon> </button> <td-file-input class=\"push-left-xs push-right-xs\" #fileInput [(ngModel)]=\"value\" [multiple]=\"multiple\" [accept]=\"config?.accept\" (select)=\"select($event)\"> <mat-icon color=\"accent\">folder</mat-icon> <span class=\"text-upper\">选择文件</span> </td-file-input> </div> ",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [FILE_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MhDynamicFileComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['notify',] },] },
        { type: MhDynamicLoaderService, },
    ]; };
    return MhDynamicFileComponent;
}(AbstractControlValueAccessor));
export { MhDynamicFileComponent };
function MhDynamicFileComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicFileComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicFileComponent.ctorParameters;
    /** @type {?} */
    MhDynamicFileComponent.prototype.control;
    /** @type {?} */
    MhDynamicFileComponent.prototype.label;
    /** @type {?} */
    MhDynamicFileComponent.prototype.config;
    /** @type {?} */
    MhDynamicFileComponent.prototype.required;
    /** @type {?} */
    MhDynamicFileComponent.prototype.multiple;
    /** @type {?} */
    MhDynamicFileComponent.prototype.maxlength;
    /** @type {?} */
    MhDynamicFileComponent.prototype.notificationService;
    /** @type {?} */
    MhDynamicFileComponent.prototype.dynamicLoaderService;
}
