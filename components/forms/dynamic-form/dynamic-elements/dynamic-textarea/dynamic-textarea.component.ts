import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const TEXTAREA_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicTextareaComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-textarea',
  templateUrl: './dynamic-textarea.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TEXTAREA_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MhDynamicTextareaComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

  public control: FormControl;

  public label = '';

  public required = false;

  public pattern: string | RegExp = '';

  public maxlength: number | null = null;

  public readonly = false;

  // _value: any;

  // get value(): any {
  //   return encodeURI(this._value);
  // }

  // set value(v: any) {
  //   if (v !== this._value) {
  //     this._value = decodeURI(v);
  //     this.onChange(v);
  //   }
  // }

}
