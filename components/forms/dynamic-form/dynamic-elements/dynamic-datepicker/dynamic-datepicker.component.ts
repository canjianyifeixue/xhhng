import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { MhDateAdapter } from '../../dynamic-date-adapter';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const DATE_PICKER_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicDatepickerComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-datepicker',
  templateUrl: './dynamic-datepicker.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DATE_PICKER_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MhDynamicDatepickerComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

  public control: FormControl;

  public label = '';

  public type = '';

  public required = false;

  public _value: any;

  set value(v: any) {
    if (!(v instanceof Date) && v !== null) {
      v = new Date(v);
    }
    this._value = v;
    this.onChange(v);
  }

  get value(): any {
    return this._value;
  }

  constructor(dateAdapter: DateAdapter<MhDateAdapter>) {
    super();
    dateAdapter.setLocale('zh-CN');
  }

}
