"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dynamic_form_entity_1 = require("./dynamic-form.entity");
var core_2 = require("@covalent/core");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var dynamic_input_component_1 = require("./dynamic-elements/dynamic-input/dynamic-input.component");
var dynamic_textarea_component_1 = require("./dynamic-elements/dynamic-textarea/dynamic-textarea.component");
var dynamic_slide_toggle_component_1 = require("./dynamic-elements/dynamic-slide-toggle/dynamic-slide-toggle.component");
var dynamic_checkbox_component_1 = require("./dynamic-elements/dynamic-checkbox/dynamic-checkbox.component");
var dynamic_slider_component_1 = require("./dynamic-elements/dynamic-slider/dynamic-slider.component");
var dynamic_select_component_1 = require("./dynamic-elements/dynamic-select/dynamic-select.component");
var dynamic_datepicker_component_1 = require("./dynamic-elements/dynamic-datepicker/dynamic-datepicker.component");
var dynamic_checkbox_group_component_1 = require("./dynamic-elements/dynamic-checkbox-group/dynamic-checkbox-group.component");
var dynamic_chips_component_1 = require("./dynamic-elements/dynamic-chips/dynamic-chips.component");
var dynamic_radio_component_1 = require("./dynamic-elements/dynamic-radio/dynamic-radio.component");
var dynamic_dialog_select_component_1 = require("./dynamic-elements/dynamic-dialog-select/dynamic-dialog-select.component");
var dynamic_data_form_component_1 = require("./dynamic-elements/dynamic-data-form/dynamic-data-form.component");
var dynamic_file_component_1 = require("./dynamic-elements/dynamic-file/dynamic-file.component");
var dynamic_rich_editor_component_1 = require("./dynamic-elements/dynamic-rich-editor/dynamic-rich-editor.component");
var dynamic_code_editor_component_1 = require("./dynamic-elements/dynamic-code-editor/dynamic-code-editor.component");
var dynamic_cascad_select_component_1 = require("./dynamic-elements/dynamic-cascad-select/dynamic-cascad-select.component");
var dynamic_cascad_dialog_component_1 = require("./dynamic-elements/dynamic-cascad-dialog/dynamic-cascad-dialog.component");
exports.DYNAMIC_ELEMENT_NAME_REGEX = /^[a-zA-Z]+[a-zA-Z0-9-_]*$/;
var MhDynamicFormService = /** @class */ (function () {
    function MhDynamicFormService(dynamicLoaderService) {
        this.dynamicLoaderService = dynamicLoaderService;
        this.subject = new Subject_1.Subject();
    }
    MhDynamicFormService.prototype.registerChange = function () {
        return this.subject.asObservable();
    };
    /**
     * 此方法会验证动态表单元素 [name] 是否有效.
     * 如果验证不通过将会抛出异常.
     */
    MhDynamicFormService.prototype.validateDynamicElementName = function (name) {
        if (!exports.DYNAMIC_ELEMENT_NAME_REGEX.test(name)) {
            throw new Error("\u52A8\u6001\u8868\u5355\u5143\u7D20name\u5C5E\u6027: \"" + name + "\" \u9A8C\u8BC1\u65E0\u6548.");
        }
    };
    /**
     * 从 [type] 中获取渲染的动态表单元素
     * [MhDynamicFormElement | MhDynamicFormType]
     * 如果遇到不存在或者不支持的类型将会抛出异常.
     */
    MhDynamicFormService.prototype.getDynamicElement = function (element) {
        switch (element) {
            case dynamic_form_entity_1.MhDynamicFormType.Text:
            case dynamic_form_entity_1.MhDynamicFormType.Number:
            case dynamic_form_entity_1.MhDynamicFormElement.Input:
            case dynamic_form_entity_1.MhDynamicFormElement.Time:
            case dynamic_form_entity_1.MhDynamicFormElement.Password:
                return dynamic_input_component_1.MhDynamicInputComponent;
            case dynamic_form_entity_1.MhDynamicFormElement.Textarea:
                return dynamic_textarea_component_1.MhDynamicTextareaComponent;
            case dynamic_form_entity_1.MhDynamicFormType.Boolean:
            case dynamic_form_entity_1.MhDynamicFormElement.SlideToggle:
                return dynamic_slide_toggle_component_1.MhDynamicSlideToggleComponent;
            case dynamic_form_entity_1.MhDynamicFormElement.Checkbox:
                return dynamic_checkbox_component_1.MhDynamicCheckboxComponent;
            case dynamic_form_entity_1.MhDynamicFormElement.Slider:
                return dynamic_slider_component_1.MhDynamicSliderComponent;
            case dynamic_form_entity_1.MhDynamicFormType.Date:
            case dynamic_form_entity_1.MhDynamicFormElement.DatePicker:
                return dynamic_datepicker_component_1.MhDynamicDatepickerComponent;
            case dynamic_form_entity_1.MhDynamicFormType.ENUM:
            case dynamic_form_entity_1.MhDynamicFormElement.Select:
                return dynamic_select_component_1.MhDynamicSelectComponent;
            case dynamic_form_entity_1.MhDynamicFormElement.CheckboxGroup:
                return dynamic_checkbox_group_component_1.MhDynamicCheckboxGroupComponent;
            case dynamic_form_entity_1.MhDynamicFormElement.Chips:
                return dynamic_chips_component_1.MhDynamicChipsComponent;
            case dynamic_form_entity_1.MhDynamicFormElement.Radio:
                return dynamic_radio_component_1.MhDynamicRadioComponent;
            case dynamic_form_entity_1.MhDynamicFormElement.DialogSelect:
                return dynamic_dialog_select_component_1.MhDynamicDialogSelectComponent;
            case dynamic_form_entity_1.MhDynamicFormElement.DataForm:
                return dynamic_data_form_component_1.MhDynamicDataFormComponent;
            case dynamic_form_entity_1.MhDynamicFormElement.File:
                return dynamic_file_component_1.MhDynamicFileComponent;
            case dynamic_form_entity_1.MhDynamicFormElement.RichEditor:
                return dynamic_rich_editor_component_1.MhDynamicRichEditorComponent;
            case dynamic_form_entity_1.MhDynamicFormElement.CodeEditor:
                return dynamic_code_editor_component_1.MhDynamicCodeEditorComponent;
            case dynamic_form_entity_1.MhDynamicFormElement.CascadSelect:
                return dynamic_cascad_select_component_1.MhDynamicCascadSelectComponent;
            case dynamic_form_entity_1.MhDynamicFormElement.CascadDialog:
                return dynamic_cascad_dialog_component_1.MhDynamicCascadDialogComponent;
            default:
                throw new Error("\u9519\u8BEF: \u7C7B\u578B " + element + " \u4E0D\u5B58\u5728\u6216\u4E0D\u662F\u652F\u6301\u7684\u7C7B\u578B.");
        }
    };
    /**
     * 获取表单元素默认的flex属性
     * [MhDynamicFormElement | MhDynamicFormType].
     * 如果遇到不存在或者不支持的类型将会抛出异常.
     */
    MhDynamicFormService.prototype.getDefaultElementFlex = function (element) {
        switch (element) {
            case dynamic_form_entity_1.MhDynamicFormType.Text:
            case dynamic_form_entity_1.MhDynamicFormType.Number:
            case dynamic_form_entity_1.MhDynamicFormElement.Slider:
            case dynamic_form_entity_1.MhDynamicFormElement.Time:
            case dynamic_form_entity_1.MhDynamicFormElement.Input:
            case dynamic_form_entity_1.MhDynamicFormElement.Password:
            case dynamic_form_entity_1.MhDynamicFormType.ENUM:
            case dynamic_form_entity_1.MhDynamicFormElement.Select:
            case dynamic_form_entity_1.MhDynamicFormElement.File:
            case dynamic_form_entity_1.MhDynamicFormType.Date:
            case dynamic_form_entity_1.MhDynamicFormElement.DatePicker:
            case dynamic_form_entity_1.MhDynamicFormElement.Chips:
            case dynamic_form_entity_1.MhDynamicFormElement.CheckboxGroup:
            case dynamic_form_entity_1.MhDynamicFormElement.Radio:
            case dynamic_form_entity_1.MhDynamicFormElement.DialogSelect:
                return 45;
            case dynamic_form_entity_1.MhDynamicFormElement.Textarea:
            case dynamic_form_entity_1.MhDynamicFormElement.DataForm:
            case dynamic_form_entity_1.MhDynamicFormElement.RichEditor:
            case dynamic_form_entity_1.MhDynamicFormElement.CodeEditor:
            case dynamic_form_entity_1.MhDynamicFormElement.CascadSelect:
            case dynamic_form_entity_1.MhDynamicFormElement.CascadDialog:
                return 95;
            case dynamic_form_entity_1.MhDynamicFormType.Boolean:
            case dynamic_form_entity_1.MhDynamicFormElement.Checkbox:
            case dynamic_form_entity_1.MhDynamicFormElement.SlideToggle:
                return 20;
            default:
                throw new Error("\u9519\u8BEF: \u7C7B\u578B " + element + " \u4E0D\u5B58\u5728\u6216\u4E0D\u662F\u652F\u6301\u7684\u7C7B\u578B.");
        }
    };
    /**
     * 从 [MhDynamicFormElementConfig] 创建动态表单元素.
     */
    MhDynamicFormService.prototype.createFormControl = function (config) {
        var validator = this.createValidators(config);
        return new forms_1.FormControl(config.default, validator, this.asyncValidator(config));
        // return new FormControl(config.default, validator);
    };
    /**
     * 从 [MhDynamicFormElementConfig] 创建动态表单校验器.
     */
    MhDynamicFormService.prototype.createValidators = function (config) {
        var validator = null;
        if (config.required) {
            validator = forms_1.Validators.required;
        }
        if (config.max || config.max === 0) {
            validator = forms_1.Validators.compose([validator, core_2.CovalentValidators.max(config.max)]);
        }
        if (config.min || config.min === 0) {
            validator = forms_1.Validators.compose([validator, core_2.CovalentValidators.min(config.min)]);
        }
        return validator;
    };
    MhDynamicFormService.prototype.asyncValidator = function (config) {
        var _this = this;
        return function (control) {
            var value = control.value;
            var obj = {};
            obj[config.name] = value;
            var formData = Object.assign({}, (control.parent || { value: undefined }).value, obj);
            if (config.validateUrl && (value || value === false)) {
                return _this.dynamicLoaderService.validate(config.validateUrl, value)
                    .map(function (_) {
                    setTimeout(function () { _this.subject.next({ value: formData, control: config }); });
                    return _ === true ? null : { async: _ };
                });
            }
            else {
                _this.subject.next({ value: formData, control: config });
                return Observable_1.Observable.of(null);
            }
        };
    };
    MhDynamicFormService = __decorate([
        core_1.Injectable()
    ], MhDynamicFormService);
    return MhDynamicFormService;
}());
exports.MhDynamicFormService = MhDynamicFormService;
