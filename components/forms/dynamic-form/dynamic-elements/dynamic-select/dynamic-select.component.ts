import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
import { MhDynamicSelectEntryComponent } from '../dynamic-select-entry.component';

export const SELECT_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicSelectComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-select',
  templateUrl: './dynamic-select.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SELECT_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MhDynamicSelectComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

  public control: FormControl;

  public label = '';

  public showValue = '';

  public required = false;

  public multiple = false;

  public selections: any[] = [];

  public _value: any;

  set value(v: any) {
    if (Array.isArray(v)) {
      const valueArr = [];
      for (const row of v) {
        if (row && row.key) {
          valueArr.push(row.value);
        } else {
          valueArr.push(this.getValue(row));
        }
      }
      this.showValue = valueArr.join(',');
      this._value = v;
      this.onChange(v);
    } else if (v && v.value && v.key) {
      this.showValue = v.value;
      this._value = v.key;
      this.onChange(v.key);
    } else {
      this.showValue = this.getValue(v);
      this._value = v;
      this.onChange(v);
    }
  }

  get value(): any {
    return this._value;
  }

  constructor(
    private dialog: MatDialog,
  ) {
    super();
  }

  public getValue(key: string): string {
    if (!key) { return ''; }
    for (const selection of this.selections) {
      if (typeof selection === 'string') { return key; }
      if (selection.key === key) { return selection.value; }
    }
    return '';
  }

  public genSelections(): any[] {
    const arr = [];
    for (const selection of this.selections) {
      if (typeof selection === 'string') {
        arr.push({ key: selection, value: selection });
      } else {
        arr.push({ key: selection.key, value: selection.value });
      }
    }
    return arr;
  }

  public open() {
    const dialogRef = this.dialog.open(MhDynamicSelectEntryComponent, {
      width: '64vh',
      height: '80vh',
      data: {
        selections: this.genSelections(),
        multiple: this.multiple || false,
        title: this.label,
        default: this.value,
      }
    });
    dialogRef.afterClosed().filter((data: any) => data).subscribe((data: any) => {
      if (this.multiple) {
        const keyArr = [];
        for (const item of data) {
          keyArr.push(item.key);
        }
        this.control.setValue(keyArr);
      } else {
        this.control.setValue(data.key);
      }
    });
  }

}
