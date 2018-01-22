import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const SLIDER_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicSliderComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-slider',
  templateUrl: './dynamic-slider.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SLIDER_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MhDynamicSliderComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

  public control: FormControl;

  public label = '';

  public required = false;

  public min: number | null = null;

  public max: number | null = null;

}
