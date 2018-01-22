import { Injectable } from '@angular/core';
import { Validators, ValidatorFn, AsyncValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { MhDynamicFormElement, MhDynamicFormType, MhDynamicFormElementConfig } from './dynamic-form.entity';
import { CovalentValidators } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { MhDynamicLoaderService } from './dynamic-loader.service';

import { MhDynamicInputComponent } from './dynamic-elements/dynamic-input/dynamic-input.component';
import { MhDynamicTextareaComponent } from './dynamic-elements/dynamic-textarea/dynamic-textarea.component';
import { MhDynamicSlideToggleComponent } from './dynamic-elements/dynamic-slide-toggle/dynamic-slide-toggle.component';
import { MhDynamicCheckboxComponent } from './dynamic-elements/dynamic-checkbox/dynamic-checkbox.component';
import { MhDynamicSliderComponent } from './dynamic-elements/dynamic-slider/dynamic-slider.component';
import { MhDynamicSelectComponent } from './dynamic-elements/dynamic-select/dynamic-select.component';
import { MhDynamicDatepickerComponent } from './dynamic-elements/dynamic-datepicker/dynamic-datepicker.component';
import { MhDynamicCheckboxGroupComponent } from './dynamic-elements/dynamic-checkbox-group/dynamic-checkbox-group.component';
import { MhDynamicChipsComponent } from './dynamic-elements/dynamic-chips/dynamic-chips.component';
import { MhDynamicRadioComponent } from './dynamic-elements/dynamic-radio/dynamic-radio.component';
import { MhDynamicDialogSelectComponent } from './dynamic-elements/dynamic-dialog-select/dynamic-dialog-select.component';
import { MhDynamicDataFormComponent } from './dynamic-elements/dynamic-data-form/dynamic-data-form.component';
import { MhDynamicFileComponent } from './dynamic-elements/dynamic-file/dynamic-file.component';
import { MhDynamicRichEditorComponent } from './dynamic-elements/dynamic-rich-editor/dynamic-rich-editor.component';
import { MhDynamicCodeEditorComponent } from './dynamic-elements/dynamic-code-editor/dynamic-code-editor.component';
import { MhDynamicCascadSelectComponent } from './dynamic-elements/dynamic-cascad-select/dynamic-cascad-select.component';
import { MhDynamicCascadDialogComponent } from './dynamic-elements/dynamic-cascad-dialog/dynamic-cascad-dialog.component';

export const DYNAMIC_ELEMENT_NAME_REGEX: RegExp = /^[a-zA-Z]+[a-zA-Z0-9-_]*$/;

@Injectable()
export class MhDynamicFormService {

  public subject = new Subject<any>();

  constructor(
    private dynamicLoaderService: MhDynamicLoaderService,
  ) { }

  public registerChange(): Observable<any> {
    return this.subject.asObservable();
  }

  /**
   * 此方法会验证动态表单元素 [name] 是否有效.
   * 如果验证不通过将会抛出异常.
   */
  public validateDynamicElementName(name: string): void {
    if (!DYNAMIC_ELEMENT_NAME_REGEX.test(name)) {
      throw new Error(`动态表单元素name属性: "${name}" 验证无效.`);
    }
  }

  /**
   * 从 [type] 中获取渲染的动态表单元素
   * [MhDynamicFormElement | MhDynamicFormType]
   * 如果遇到不存在或者不支持的类型将会抛出异常.
   */
  public getDynamicElement(element: MhDynamicFormElement | MhDynamicFormType | string): any {
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
        throw new Error(`错误: 类型 ${element} 不存在或不是支持的类型.`);
    }
  }

  /**
   * 获取表单元素默认的flex属性
   * [MhDynamicFormElement | MhDynamicFormType].
   * 如果遇到不存在或者不支持的类型将会抛出异常.
   */
  public getDefaultElementFlex(element: MhDynamicFormElement | MhDynamicFormType | string): any {
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
        throw new Error(`错误: 类型 ${element} 不存在或不是支持的类型.`);
    }
  }

  /**
   * 从 [MhDynamicFormElementConfig] 创建动态表单元素.
   */
  public createFormControl(config: MhDynamicFormElementConfig): FormControl {
    const validator: ValidatorFn | null = this.createValidators(config);
    return new FormControl(config.default, validator, this.asyncValidator(config));
    // return new FormControl(config.default, validator);
  }

  /**
   * 从 [MhDynamicFormElementConfig] 创建动态表单校验器.
   */
  public createValidators(config: MhDynamicFormElementConfig): ValidatorFn | null {
    let validator: ValidatorFn | null = null;
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
  }

  public asyncValidator(config: any): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      const obj: { [key: string]: any } = {};
      obj[config.name] = value;
      const formData = Object.assign({}, (control.parent || { value: undefined }).value, obj);
      if (config.validateUrl && (value || value === false)) {
        return this.dynamicLoaderService.validate(config.validateUrl, value)
          .map((_: any) => {
            setTimeout(() => { this.subject.next({ value: formData, control: config }); });
            return _ === true ? null : { async: _ };
          });
      } else {
        this.subject.next({ value: formData, control: config });
        return Observable.of(null);
      }
    };
  }
}
