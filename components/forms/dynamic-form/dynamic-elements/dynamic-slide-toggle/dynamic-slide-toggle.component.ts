import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const SLIDE_TOGGLE_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicSlideToggleComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-slide-toggle',
  templateUrl: './dynamic-slide-toggle.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SLIDE_TOGGLE_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MhDynamicSlideToggleComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {

  public control: FormControl;

  public label = '';

  public required = false;

  public ngOnInit() {
    if (this._value === null) {
      this.control.setValue(false);
    }
  }

}
