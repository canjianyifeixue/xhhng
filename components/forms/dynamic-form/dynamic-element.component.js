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
import { Component, Directive, Input, HostBinding } from "@angular/core";
import { ViewChild, ViewContainerRef } from "@angular/core";
import { ComponentFactoryResolver, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, FormControl } from "@angular/forms";
import { MhDynamicFormService } from "./dynamic-form.service";
import { AbstractControlValueAccessor } from "./dynamic-elements/abstract-control-value-accesor";
var /** @type {?} */ noop = function () {
    // empty method
};
var ɵ0 = noop;
var MhDynamicElementDirective = (function () {
    function MhDynamicElementDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    MhDynamicElementDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mhDynamicContainer]',
                },] },
    ];
    /** @nocollapse */
    MhDynamicElementDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
    ]; };
    return MhDynamicElementDirective;
}());
export { MhDynamicElementDirective };
function MhDynamicElementDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicElementDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicElementDirective.ctorParameters;
    /** @type {?} */
    MhDynamicElementDirective.prototype.viewContainer;
}
export var /** @type {?} */ ELEMENT_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicElementComponent; }),
    multi: true,
};
var MhDynamicElementComponent = (function (_super) {
    __extends(MhDynamicElementComponent, _super);
    function MhDynamicElementComponent(_componentFactoryResolver, _dynamicFormsService) {
        var _this = _super.call(this) || this;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._dynamicFormsService = _dynamicFormsService;
        /**
         * 设置label.
         */
        _this.label = '';
        /**
         * 设置元素的值类型或元素类型.
         * 遇到不存在或不支持的会抛出异常.
         */
        _this.type = '';
        /**
         * 设置required校验器 (if supported by element).
         */
        _this.required = false;
        /**
         * 只读
         */
        _this.readonly = false;
        /**
         * 设置min校验器 (if supported by element).
         */
        _this.min = null;
        /**
         * 设置max校验器 (if supported by element).
         */
        _this.max = null;
        /**
         * 设置selections数据 (if supported by element).
         */
        _this.selections = undefined;
        /**
         * 设置正则验证数据 (if supported by element).
         */
        _this.pattern = '';
        /**
         * 设置config数据 (if supported by element).
         */
        _this.config = null;
        /**
         * 设置multiple数据 (if supported by element).
         */
        _this.multiple = false;
        /**
         * 设置maxlength数据 (if supported by element).
         */
        _this.maxlength = null;
        /**
         * 设置maxlength数据 (if supported by element).
         */
        _this.selectionParams = undefined;
        /**
         * 设置controls数据 (if supported by element).
         */
        _this.controls = undefined;
        _this.onModelChange = function (_) { return noop; };
        return _this;
    }
    Object.defineProperty(MhDynamicElementComponent.prototype, "value", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._value) {
                this._value = v;
                this.onChange(v);
                this.onModelChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhDynamicElementComponent.prototype, "flex", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._flex) {
                return this._flex;
            }
            else if (this.type) {
                return this._dynamicFormsService.getDefaultElementFlex(this.type);
            }
            return true;
        },
        set: /**
         * @param {?} flex
         * @return {?}
         */
        function (flex) {
            if (typeof flex === 'number') {
                this._flex = flex;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhDynamicElementComponent.prototype, "maxAttr", {
        get: /**
         * @return {?}
         */
        function () {
            return this.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhDynamicElementComponent.prototype, "minAttr", {
        get: /**
         * @return {?}
         */
        function () {
            return this.min;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MhDynamicElementComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ ref = this._componentFactoryResolver.
            resolveComponentFactory(this._dynamicFormsService.getDynamicElement(this.type))
            .create(this.childElement.viewContainer.injector);
        this.childElement.viewContainer.insert(ref.hostView);
        ref.instance.control = this.dynamicControl;
        ref.instance.label = this.label;
        ref.instance.type = this.type;
        ref.instance._value = this._value;
        ref.instance.required = this.required;
        ref.instance.min = this.min;
        ref.instance.max = this.max;
        ref.instance.multiple = this.multiple;
        ref.instance.controls = this.controls;
        ref.instance.selections = this.selections;
        ref.instance.pattern = this.pattern;
        ref.instance.config = this.config;
        ref.instance.maxlength = this.maxlength;
        ref.instance.readonly = this.readonly;
        ref.instance.registerOnChange(function (value) {
            _this.value = value;
        });
        this.registerOnModelChange(function (value) {
            // fix to check if value is NaN (type=number)
            if (!Number.isNaN(value)) {
                ref.instance.value = value;
            }
        });
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    MhDynamicElementComponent.prototype.registerOnModelChange = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelChange = fn;
    };
    MhDynamicElementComponent.decorators = [
        { type: Component, args: [{
                    providers: [MhDynamicFormService, ELEMENT_INPUT_CONTROL_VALUE_ACCESSOR],
                    selector: 'mh-dynamic-element',
                    template: '<div mhDynamicContainer></div>',
                },] },
    ];
    /** @nocollapse */
    MhDynamicElementComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
        { type: MhDynamicFormService, },
    ]; };
    MhDynamicElementComponent.propDecorators = {
        "dynamicControl": [{ type: Input },],
        "label": [{ type: Input },],
        "type": [{ type: Input },],
        "required": [{ type: Input },],
        "readonly": [{ type: Input },],
        "min": [{ type: Input },],
        "max": [{ type: Input },],
        "selections": [{ type: Input },],
        "pattern": [{ type: Input },],
        "config": [{ type: Input },],
        "multiple": [{ type: Input },],
        "maxlength": [{ type: Input },],
        "selectionParams": [{ type: Input },],
        "controls": [{ type: Input },],
        "childElement": [{ type: ViewChild, args: [MhDynamicElementDirective,] },],
        "flex": [{ type: Input }, { type: HostBinding, args: ['attr.flex',] },],
        "maxAttr": [{ type: HostBinding, args: ['attr.max',] },],
        "minAttr": [{ type: HostBinding, args: ['attr.min',] },],
    };
    return MhDynamicElementComponent;
}(AbstractControlValueAccessor));
export { MhDynamicElementComponent };
function MhDynamicElementComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicElementComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicElementComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MhDynamicElementComponent.propDecorators;
    /**
     * 设置元素的form control.
     * @type {?}
     */
    MhDynamicElementComponent.prototype.dynamicControl;
    /**
     * 设置label.
     * @type {?}
     */
    MhDynamicElementComponent.prototype.label;
    /**
     * 设置元素的值类型或元素类型.
     * 遇到不存在或不支持的会抛出异常.
     * @type {?}
     */
    MhDynamicElementComponent.prototype.type;
    /**
     * 设置required校验器 (if supported by element).
     * @type {?}
     */
    MhDynamicElementComponent.prototype.required;
    /**
     * 只读
     * @type {?}
     */
    MhDynamicElementComponent.prototype.readonly;
    /**
     * 设置min校验器 (if supported by element).
     * @type {?}
     */
    MhDynamicElementComponent.prototype.min;
    /**
     * 设置max校验器 (if supported by element).
     * @type {?}
     */
    MhDynamicElementComponent.prototype.max;
    /**
     * 设置selections数据 (if supported by element).
     * @type {?}
     */
    MhDynamicElementComponent.prototype.selections;
    /**
     * 设置正则验证数据 (if supported by element).
     * @type {?}
     */
    MhDynamicElementComponent.prototype.pattern;
    /**
     * 设置config数据 (if supported by element).
     * @type {?}
     */
    MhDynamicElementComponent.prototype.config;
    /**
     * 设置multiple数据 (if supported by element).
     * @type {?}
     */
    MhDynamicElementComponent.prototype.multiple;
    /**
     * 设置maxlength数据 (if supported by element).
     * @type {?}
     */
    MhDynamicElementComponent.prototype.maxlength;
    /**
     * 设置maxlength数据 (if supported by element).
     * @type {?}
     */
    MhDynamicElementComponent.prototype.selectionParams;
    /**
     * 设置controls数据 (if supported by element).
     * @type {?}
     */
    MhDynamicElementComponent.prototype.controls;
    /** @type {?} */
    MhDynamicElementComponent.prototype.childElement;
    /** @type {?} */
    MhDynamicElementComponent.prototype._flex;
    /** @type {?} */
    MhDynamicElementComponent.prototype.onModelChange;
    /** @type {?} */
    MhDynamicElementComponent.prototype._componentFactoryResolver;
    /** @type {?} */
    MhDynamicElementComponent.prototype._dynamicFormsService;
}
export { ɵ0 };
