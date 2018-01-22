import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const CHIPS_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicChipsComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-chips',
  templateUrl: './dynamic-chips.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CHIPS_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MhDynamicChipsComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {

  public control: FormControl;

  public label = '';

  public selections: any[] = [];

  public items: string[] = [];

  public readonly = false;

  public required = false;

  public _value: any = [];

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      if (v === null) {
        this._value = [];
      } else {
        this._value = v;
        this.onChange(v);
      }
    }
  }

  public ngOnInit() {
    this.items = [];
    for (const selection of this.selections) {
      if (typeof selection === 'object') {
        this.items = [...this.items, selection.value];
      } else {
        this.items = [...this.items, selection];
      }
    }
  }

  public add(v: any) {
    for (const selection of this.selections) {
      if (typeof selection === 'object') {
        if (v === selection.value) {
          this.control.setValue([...this._value, selection.key]);
        }
      } else {
        if (v === selection) {
          this.control.setValue([...this._value, selection]);
        }
      }
    }
  }

  public remove(v: any) {
    for (let i = 0; i < this.selections.length; i++) {
      const selection = this.selections[i];
      if (typeof selection === 'object') {
        if (v === selection.value) {
          this.control.setValue([...this._value.slice(0, i), this._value.slice(i + 1)]);
        }
      } else {
        if (v === selection) {
          this.control.setValue([...this._value.slice(0, i), this._value.slice(i + 1)]);
        }
      }
    }
  }

}
