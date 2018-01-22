import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const RADIO_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicRadioComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-radio',
  templateUrl: './dynamic-radio.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RADIO_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MhDynamicRadioComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

  public control: FormControl;

  public label = '';

  public required = false;

  public default?: string;

  public selections?: any[] = undefined;

  public isObject(value: any): boolean {
    return typeof value === 'object';
  }
}
