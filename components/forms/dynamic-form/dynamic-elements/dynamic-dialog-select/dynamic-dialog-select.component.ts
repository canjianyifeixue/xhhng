import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
import { MhDynamicDialogEntryComponent } from '../dynamic-dialog-entry.component';

export const DIALOG_SELECT_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicDialogSelectComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-dialog-select',
  templateUrl: './dynamic-dialog-select.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DIALOG_SELECT_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MhDynamicDialogSelectComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {

  public control: FormControl;

  public label = '';

  public required = false;

  public selections: any = undefined;

  public multiple = false;

  public showValue = '';

  public config: any;

  constructor(
    private dialog: MatDialog,
  ) {
    super();
  }

  public ngOnInit() {
    let data = this.value;
    if (data) {
      if (!this.multiple || data.length <= 1) {
        if (this.config
          && this.config.showField
          && this.config.showField.length > 0
          && data[this.config.showField]
          && this.config.valueField
          && this.config.valueField.length > 0
          && data[this.config.valueField]) {
          this.control.setValue(data[this.config.valueField]);
          this.showValue = data[this.config.showField];
        } else if (this.config
          && this.config.showField
          && this.config.showField.length > 0
          && this.config.valueField
          && this.config.valueField.length > 0) {
          const selections = this.selections.items || this.selections;
          for (const selection of selections) {
            if (selection[this.config.valueField] === data) {
              data = selection;
              this.control.setValue(data[this.config.valueField]);
              this.showValue = data[this.config.showField];
              return;
            }
          }
          this.control.setValue(data);
          this.showValue = data;
        } else {
          this.control.setValue(data);
          this.showValue = data;
        }
      } else {
        this.control.setValue(data);
        this.showValue = `已选择 ${data.length} 条数据`;
      }
    }
  }

  public open() {
    const dialogRef = this.dialog.open(MhDynamicDialogEntryComponent, {
      width: (this.config && this.config.width) || '70%',
      data: {
        label: this.label,
        data: this.selections.items || this.selections,
        columns: this.selections.columns || [],
        multiple: this.multiple || false,
      }
    });
    dialogRef.afterClosed().filter((data: any) => data).subscribe((data: any) => {
      if (!this.multiple || data.length <= 1) {
        if (this.config
          && this.config.showField
          && this.config.showField.length > 0
          && data[this.config.showField]
          && this.config.valueField
          && this.config.valueField.length > 0
          && data[this.config.valueField]) {
          this.control.setValue(data[this.config.valueField]);
          this.showValue = data[this.config.showField];
        } else {
          this.control.setValue(JSON.stringify(data));
          this.showValue = JSON.stringify(data);
        }
      } else {
        this.control.setValue(data);
        this.showValue = `已选择 ${data.length} 条数据`;
      }

    });
  }

}
