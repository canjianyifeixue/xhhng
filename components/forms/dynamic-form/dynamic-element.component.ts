import { Component, Directive, Input, HostBinding, OnInit } from '@angular/core';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFactoryResolver, ComponentRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { MhDynamicFormService } from './dynamic-form.service';
import { MhDynamicFormElement, MhDynamicFormType } from './dynamic-form.entity';
import { AbstractControlValueAccessor } from './dynamic-elements/abstract-control-value-accesor';

const noop: any = () => {
  // empty method
};

@Directive({
  selector: '[mhDynamicContainer]',
})
export class MhDynamicElementDirective {
  constructor(public viewContainer: ViewContainerRef) { }
}

export const ELEMENT_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicElementComponent),
  multi: true,
};

@Component({
  providers: [MhDynamicFormService, ELEMENT_INPUT_CONTROL_VALUE_ACCESSOR],
  selector: 'mh-dynamic-element',
  template: '<div mhDynamicContainer></div>',
})
export class MhDynamicElementComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
      this.onModelChange(v);
    }
  }

  /**
   * 设置元素的form control.
   */
  @Input() public dynamicControl: FormControl;

  /**
   * 设置label.
   */
  @Input() public label = '';

  /**
   * 设置元素的值类型或元素类型.
   * 遇到不存在或不支持的会抛出异常.
   */
  @Input() public type: MhDynamicFormElement | MhDynamicFormType | string = '';

  /**
   * 设置required校验器 (if supported by element).
   */
  @Input() public required = false;

  /**
   * 只读
   */
  @Input() public readonly = false;

  /**
   * 设置min校验器 (if supported by element).
   */
  @Input() public min: number | null = null;

  /**
   * 设置max校验器 (if supported by element).
   */
  @Input() public max: number | null = null;

  /**
   * 设置selections数据 (if supported by element).
   */
  @Input() public selections: any = undefined;

  /**
   * 设置正则验证数据 (if supported by element).
   */
  @Input() public pattern: RegExp | string = '';

  /**
   * 设置config数据 (if supported by element).
   */
  @Input() public config: object | null = null;

  /**
   * 设置multiple数据 (if supported by element).
   */
  @Input() public multiple = false;

  /**
   * 设置maxlength数据 (if supported by element).
   */
  @Input() public maxlength: number | null = null;

  /**
   * 设置maxlength数据 (if supported by element).
   */
  @Input() public selectionParams: any = undefined;

  /**
   * 设置controls数据 (if supported by element).
   */
  @Input() public controls: any = undefined;

  @ViewChild(MhDynamicElementDirective) public childElement: MhDynamicElementDirective;

  public _flex: number;

  @Input()
  @HostBinding('attr.flex')
  get flex(): any {
    if (this._flex) {
      return this._flex;
    } else if (this.type) {
      return this._dynamicFormsService.getDefaultElementFlex(this.type);
    }
    return true;
  }

  set flex(flex: any) {
    if (typeof flex === 'number') {
      this._flex = flex;
    }
  }

  @HostBinding('attr.max')
  get maxAttr(): any {
    return this.max;
  }

  @HostBinding('attr.min')
  get minAttr(): any {
    return this.min;
  }

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _dynamicFormsService: MhDynamicFormService,
  ) {
    super();
  }

  public ngOnInit(): void {
    const ref: ComponentRef<any> = this._componentFactoryResolver.
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
    ref.instance.registerOnChange((value: any) => {
      this.value = value;
    });
    this.registerOnModelChange((value: any) => {
      // fix to check if value is NaN (type=number)
      if (!Number.isNaN(value)) {
        ref.instance.value = value;
      }
    });
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  public registerOnModelChange(fn: any): void {
    this.onModelChange = fn;
  }

  public onModelChange = (_: any) => noop;
}
