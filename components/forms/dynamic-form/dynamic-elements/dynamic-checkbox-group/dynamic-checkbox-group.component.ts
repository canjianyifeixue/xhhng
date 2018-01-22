import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const CHECKBOX_GROUP_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicCheckboxGroupComponent),
  multi: true,
};
@Component({
  selector: 'mh-dynamic-checkboxgroup',
  templateUrl: './dynamic-checkbox-group.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CHECKBOX_GROUP_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class MhDynamicCheckboxGroupComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

  public control: FormControl;

  public label = '';

  public required = false;

  public selections: any[] = [];

  public _value: any = [];

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v === null) {
      v = [];
    }
    this._value = v;
    this.onChange(v);
  }

  public change(index: number) {
    const i = this._value.indexOf(this.selections[index]);
    if (i >= 0) {
      this.control.setValue([
        ...this._value.slice(0, i),
        ...this._value.slice(i + 1)
      ]);
    } else {
      this.control.setValue([
        ...this._value,
        this.selections[index]
      ]);
    }
  }

  public isObject(value: any): boolean {
    return typeof value === 'object';
  }

}
