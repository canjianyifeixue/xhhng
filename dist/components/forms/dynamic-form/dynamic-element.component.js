"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dynamic_form_service_1 = require("./dynamic-form.service");
var abstract_control_value_accesor_1 = require("./dynamic-elements/abstract-control-value-accesor");
var noop = function () {
    // empty method
};
var MhDynamicElementDirective = /** @class */ (function () {
    function MhDynamicElementDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    MhDynamicElementDirective = __decorate([
        core_1.Directive({
            selector: '[mhDynamicContainer]',
        })
    ], MhDynamicElementDirective);
    return MhDynamicElementDirective;
}());
exports.MhDynamicElementDirective = MhDynamicElementDirective;
exports.ELEMENT_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_3.forwardRef(function () { return MhDynamicElementComponent; }),
    multi: true,
};
var MhDynamicElementComponent = /** @class */ (function (_super) {
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
        set: function (v) {
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
        get: function () {
            if (this._flex) {
                return this._flex;
            }
            else if (this.type) {
                return this._dynamicFormsService.getDefaultElementFlex(this.type);
            }
            return true;
        },
        set: function (flex) {
            if (typeof flex === 'number') {
                this._flex = flex;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhDynamicElementComponent.prototype, "maxAttr", {
        get: function () {
            return this.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhDynamicElementComponent.prototype, "minAttr", {
        get: function () {
            return this.min;
        },
        enumerable: true,
        configurable: true
    });
    MhDynamicElementComponent.prototype.ngOnInit = function () {
        var _this = this;
        var ref = this._componentFactoryResolver.
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
     */
    MhDynamicElementComponent.prototype.registerOnModelChange = function (fn) {
        this.onModelChange = fn;
    };
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "dynamicControl", void 0);
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "selections", void 0);
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "pattern", void 0);
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "maxlength", void 0);
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "selectionParams", void 0);
    __decorate([
        core_1.Input()
    ], MhDynamicElementComponent.prototype, "controls", void 0);
    __decorate([
        core_2.ViewChild(MhDynamicElementDirective)
    ], MhDynamicElementComponent.prototype, "childElement", void 0);
    __decorate([
        core_1.Input(),
        core_1.HostBinding('attr.flex')
    ], MhDynamicElementComponent.prototype, "flex", null);
    __decorate([
        core_1.HostBinding('attr.max')
    ], MhDynamicElementComponent.prototype, "maxAttr", null);
    __decorate([
        core_1.HostBinding('attr.min')
    ], MhDynamicElementComponent.prototype, "minAttr", null);
    MhDynamicElementComponent = __decorate([
        core_1.Component({
            providers: [dynamic_form_service_1.MhDynamicFormService, exports.ELEMENT_INPUT_CONTROL_VALUE_ACCESSOR],
            selector: 'mh-dynamic-element',
            template: '<div mhDynamicContainer></div>',
        })
    ], MhDynamicElementComponent);
    return MhDynamicElementComponent;
}(abstract_control_value_accesor_1.AbstractControlValueAccessor));
exports.MhDynamicElementComponent = MhDynamicElementComponent;
