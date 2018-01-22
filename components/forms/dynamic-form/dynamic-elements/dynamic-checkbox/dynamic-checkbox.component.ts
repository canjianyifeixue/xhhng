import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const CHECKBOX_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicCheckboxComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-checkbox',
  templateUrl: './dynamic-checkbox.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CHECKBOX_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MhDynamicCheckboxComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {

  public control: FormControl;

  public label = '';

  public required = false;

  public ngOnInit() {
    if (this._value === null) {
      this.control.setValue(false);
    }
  }
}
