import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const INPUT_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicInputComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [INPUT_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class MhDynamicInputComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {

  public control: FormControl;

  public label = '';

  public type = '';

  public readonly = false;

  public required = false;

  public min: number | null = null;

  public max: number | null = null;

  public pattern: string | RegExp = '';

  public maxlength: number | null = null;

  public tooltip: string;

  public config: any;

  public ngOnInit() {
    const change$ = this.control.valueChanges;
    change$.map((v: any) => this.control.errors)
      .subscribe((v: any) => {
        if (v === null) {
          this.tooltip = '';
        } else if (v.pattern && this.config && this.config.patternErrors) {
          this.tooltip = this.config.patternErrors;
        }
      });
  }

}
