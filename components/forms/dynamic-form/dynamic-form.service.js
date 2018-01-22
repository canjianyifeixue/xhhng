/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { Validators, FormControl } from "@angular/forms";
import { MhDynamicFormElement, MhDynamicFormType } from "./dynamic-form.entity";
import { CovalentValidators } from "@covalent/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { MhDynamicLoaderService } from "./dynamic-loader.service";
import { MhDynamicInputComponent } from "./dynamic-elements/dynamic-input/dynamic-input.component";
import { MhDynamicTextareaComponent } from "./dynamic-elements/dynamic-textarea/dynamic-textarea.component";
import { MhDynamicSlideToggleComponent } from "./dynamic-elements/dynamic-slide-toggle/dynamic-slide-toggle.component";
import { MhDynamicCheckboxComponent } from "./dynamic-elements/dynamic-checkbox/dynamic-checkbox.component";
import { MhDynamicSliderComponent } from "./dynamic-elements/dynamic-slider/dynamic-slider.component";
import { MhDynamicSelectComponent } from "./dynamic-elements/dynamic-select/dynamic-select.component";
import { MhDynamicDatepickerComponent } from "./dynamic-elements/dynamic-datepicker/dynamic-datepicker.component";
import { MhDynamicCheckboxGroupComponent } from "./dynamic-elements/dynamic-checkbox-group/dynamic-checkbox-group.component";
import { MhDynamicChipsComponent } from "./dynamic-elements/dynamic-chips/dynamic-chips.component";
import { MhDynamicRadioComponent } from "./dynamic-elements/dynamic-radio/dynamic-radio.component";
import { MhDynamicDialogSelectComponent } from "./dynamic-elements/dynamic-dialog-select/dynamic-dialog-select.component";
import { MhDynamicDataFormComponent } from "./dynamic-elements/dynamic-data-form/dynamic-data-form.component";
import { MhDynamicFileComponent } from "./dynamic-elements/dynamic-file/dynamic-file.component";
import { MhDynamicRichEditorComponent } from "./dynamic-elements/dynamic-rich-editor/dynamic-rich-editor.component";
import { MhDynamicCodeEditorComponent } from "./dynamic-elements/dynamic-code-editor/dynamic-code-editor.component";
import { MhDynamicCascadSelectComponent } from "./dynamic-elements/dynamic-cascad-select/dynamic-cascad-select.component";
import { MhDynamicCascadDialogComponent } from "./dynamic-elements/dynamic-cascad-dialog/dynamic-cascad-dialog.component";
export var /** @type {?} */ DYNAMIC_ELEMENT_NAME_REGEX = /^[a-zA-Z]+[a-zA-Z0-9-_]*$/;
var MhDynamicFormService = (function () {
    function MhDynamicFormService(dynamicLoaderService) {
        this.dynamicLoaderService = dynamicLoaderService;
        this.subject = new Subject();
    }
    /**
     * @return {?}
     */
    MhDynamicFormService.prototype.registerChange = /**
     * @return {?}
     */
    function () {
        return this.subject.asObservable();
    };
    /**
     * 此方法会验证动态表单元素 [name] 是否有效.
     * 如果验证不通过将会抛出异常.
     * @param {?} name
     * @return {?}
     */
    MhDynamicFormService.prototype.validateDynamicElementName = /**
     * 此方法会验证动态表单元素 [name] 是否有效.
     * 如果验证不通过将会抛出异常.
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (!DYNAMIC_ELEMENT_NAME_REGEX.test(name)) {
            throw new Error("\u52A8\u6001\u8868\u5355\u5143\u7D20name\u5C5E\u6027: \"" + name + "\" \u9A8C\u8BC1\u65E0\u6548.");
        }
    };
    /**
     * 从 [type] 中获取渲染的动态表单元素
     * [MhDynamicFormElement | MhDynamicFormType]
     * 如果遇到不存在或者不支持的类型将会抛出异常.
     * @param {?} element
     * @return {?}
     */
    MhDynamicFormService.prototype.getDynamicElement = /**
     * 从 [type] 中获取渲染的动态表单元素
     * [MhDynamicFormElement | MhDynamicFormType]
     * 如果遇到不存在或者不支持的类型将会抛出异常.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        switch (element) {
            case MhDynamicFormType.Text:
            case MhDynamicFormType.Number:
            case MhDynamicFormElement.Input:
            case MhDynamicFormElement.Time:
            case MhDynamicFormElement.Password:
                return MhDynamicInputComponent;
            case MhDynamicFormElement.Textarea:
                return MhDynamicTextareaComponent;
            case MhDynamicFormType.Boolean:
            case MhDynamicFormElement.SlideToggle:
                return MhDynamicSlideToggleComponent;
            case MhDynamicFormElement.Checkbox:
                return MhDynamicCheckboxComponent;
            case MhDynamicFormElement.Slider:
                return MhDynamicSliderComponent;
            case MhDynamicFormType.Date:
            case MhDynamicFormElement.DatePicker:
                return MhDynamicDatepickerComponent;
            case MhDynamicFormType.ENUM:
            case MhDynamicFormElement.Select:
                return MhDynamicSelectComponent;
            case MhDynamicFormElement.CheckboxGroup:
                return MhDynamicCheckboxGroupComponent;
            case MhDynamicFormElement.Chips:
                return MhDynamicChipsComponent;
            case MhDynamicFormElement.Radio:
                return MhDynamicRadioComponent;
            case MhDynamicFormElement.DialogSelect:
                return MhDynamicDialogSelectComponent;
            case MhDynamicFormElement.DataForm:
                return MhDynamicDataFormComponent;
            case MhDynamicFormElement.File:
                return MhDynamicFileComponent;
            case MhDynamicFormElement.RichEditor:
                return MhDynamicRichEditorComponent;
            case MhDynamicFormElement.CodeEditor:
                return MhDynamicCodeEditorComponent;
            case MhDynamicFormElement.CascadSelect:
                return MhDynamicCascadSelectComponent;
            case MhDynamicFormElement.CascadDialog:
                return MhDynamicCascadDialogComponent;
            default:
                throw new Error("\u9519\u8BEF: \u7C7B\u578B " + element + " \u4E0D\u5B58\u5728\u6216\u4E0D\u662F\u652F\u6301\u7684\u7C7B\u578B.");
        }
    };
    /**
     * 获取表单元素默认的flex属性
     * [MhDynamicFormElement | MhDynamicFormType].
     * 如果遇到不存在或者不支持的类型将会抛出异常.
     * @param {?} element
     * @return {?}
     */
    MhDynamicFormService.prototype.getDefaultElementFlex = /**
     * 获取表单元素默认的flex属性
     * [MhDynamicFormElement | MhDynamicFormType].
     * 如果遇到不存在或者不支持的类型将会抛出异常.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        switch (element) {
            case MhDynamicFormType.Text:
            case MhDynamicFormType.Number:
            case MhDynamicFormElement.Slider:
            case MhDynamicFormElement.Time:
            case MhDynamicFormElement.Input:
            case MhDynamicFormElement.Password:
            case MhDynamicFormType.ENUM:
            case MhDynamicFormElement.Select:
            case MhDynamicFormElement.File:
            case MhDynamicFormType.Date:
            case MhDynamicFormElement.DatePicker:
            case MhDynamicFormElement.Chips:
            case MhDynamicFormElement.CheckboxGroup:
            case MhDynamicFormElement.Radio:
            case MhDynamicFormElement.DialogSelect:
                return 45;
            case MhDynamicFormElement.Textarea:
            case MhDynamicFormElement.DataForm:
            case MhDynamicFormElement.RichEditor:
            case MhDynamicFormElement.CodeEditor:
            case MhDynamicFormElement.CascadSelect:
            case MhDynamicFormElement.CascadDialog:
                return 95;
            case MhDynamicFormType.Boolean:
            case MhDynamicFormElement.Checkbox:
            case MhDynamicFormElement.SlideToggle:
                return 20;
            default:
                throw new Error("\u9519\u8BEF: \u7C7B\u578B " + element + " \u4E0D\u5B58\u5728\u6216\u4E0D\u662F\u652F\u6301\u7684\u7C7B\u578B.");
        }
    };
    /**
     * 从 [MhDynamicFormElementConfig] 创建动态表单元素.
     * @param {?} config
     * @return {?}
     */
    MhDynamicFormService.prototype.createFormControl = /**
     * 从 [MhDynamicFormElementConfig] 创建动态表单元素.
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var /** @type {?} */ validator = this.createValidators(config);
        return new FormControl(config.default, validator, this.asyncValidator(config));
        // return new FormControl(config.default, validator);
    };
    /**
     * 从 [MhDynamicFormElementConfig] 创建动态表单校验器.
     * @param {?} config
     * @return {?}
     */
    MhDynamicFormService.prototype.createValidators = /**
     * 从 [MhDynamicFormElementConfig] 创建动态表单校验器.
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var /** @type {?} */ validator = null;
        if (config.required) {
            validator = Validators.required;
        }
        if (config.max || config.max === 0) {
            validator = Validators.compose([validator, CovalentValidators.max(config.max)]);
        }
        if (config.min || config.min === 0) {
            validator = Validators.compose([validator, CovalentValidators.min(config.min)]);
        }
        return validator;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    MhDynamicFormService.prototype.asyncValidator = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        return function (control) {
            var /** @type {?} */ value = control.value;
            var /** @type {?} */ obj = {};
            obj[config.name] = value;
            var /** @type {?} */ formData = Object.assign({}, (control.parent || { value: undefined }).value, obj);
            if (config.validateUrl && (value || value === false)) {
                return _this.dynamicLoaderService.validate(config.validateUrl, value)
                    .map(function (_) {
                    setTimeout(function () { _this.subject.next({ value: formData, control: config }); });
                    return _ === true ? null : { async: _ };
                });
            }
            else {
                _this.subject.next({ value: formData, control: config });
                return Observable.of(null);
            }
        };
    };
    MhDynamicFormService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MhDynamicFormService.ctorParameters = function () { return [
        { type: MhDynamicLoaderService, },
    ]; };
    return MhDynamicFormService;
}());
export { MhDynamicFormService };
function MhDynamicFormService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicFormService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicFormService.ctorParameters;
    /** @type {?} */
    MhDynamicFormService.prototype.subject;
    /** @type {?} */
    MhDynamicFormService.prototype.dynamicLoaderService;
}
