import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { IPageChangeEvent } from '@covalent/core';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
import { MhDynamicDialogEntryComponent } from '../dynamic-dialog-entry.component';

export const DATA_FORM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicDataFormComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-data-form',
  templateUrl: './dynamic-data-form.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DATA_FORM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MhDynamicDataFormComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {

  public length = 0;

  public idField = '_$id_';

  public stateField = '_$state_';

  public control: FormControl;

  public label = '';

  public required = false;

  public selections: any = undefined;

  public controls: any[] = [];

  public config: any;

  public _value: any = [];
  set value(v: any) {
    if (v !== this._value) {
      if (v !== null && this.config && this.config.stateMode) {
        for (const vl of v) {
          if (vl[this.stateField] === undefined) {
            vl[this.stateField] = 0;
            vl[this.idField] = this.length += 1;
          }
        }
      }
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

  public ngOnInit() {
    if (this._value === null) {
      this.control.setValue([]);
    } else {
      let value: any[] = [];
      for (let i = 0; i < this._value.length; i++) {
        const v = this._value[i];
        if (this.config && this.config.stateMode) {
          v[this.idField] = i + 1;
          v[this.stateField] = 0;
        }
        value = [...value, v];
        this.length = i + 1;
      }
      this.control.setValue(value);
    }
  }

  /**
   * 获取表单模型
   */
  public getModel() {
    const obj: { [key: string]: any } = {};
    for (const control of this.controls) {
      if (control.type === 'boolean') {
        control.default = control.default ? control.default : false;
      }
      obj[control.name] = control.default === undefined ? null : control.default;
    }
    return obj;
  }

  /**
   * 增加新的一条数据
   */
  public add() {
    if (!this.selections || this.selections === null || this.selections.length <= 0) {
      const model = this.getModel();
      this.insertData(model);
      return;
    }
    const dialogRef = this.dialog.open(MhDynamicDialogEntryComponent, {
      width: '70%',
      data: { label: this.label, data: this.selections.items || this.selections, columns: this.selections.columns || [] }
    });
    dialogRef.afterClosed().filter((data: any) => data).subscribe((data: any) => {
      for (const row of this._value) {
        if (row.id && row.id === data.id) {
          return;
        }
      }
      this.insertData(data);
    });
  }

  /**
   * 插入数据的实现
   */
  public insertData(data: any) {
    if (this.config && this.config.stateMode) {
      data[this.idField] = this.length += 1;
      data[this.stateField] = 1;
    }
    this.control.setValue([
      ...this._value,
      data
    ]);
  }

  /**
   * 删除一条数据
   */
  public remove(index: number) {
    if (this.config && this.config.stateMode) {
      let value = this._value;
      if (value[index][this.stateField] === 1) {
        value = [
          ...value.slice(0, index),
          ...value.slice(index + 1)
        ];
      } else {
        value[index][this.stateField] = 3;
      }
      this.control.setValue(value);
    } else {
      this.control.setValue([
        ...this._value.slice(0, index),
        ...this._value.slice(index + 1)
      ]);
    }
  }

  public isObject(value: any): boolean {
    return typeof value === 'object';
  }

  public change(index: number) {
    if (this.config && this.config.stateMode && this._value[index][this.stateField] === 0) {
      const value = this._value;
      value[index][this.stateField] = 2;
      this.control.setValue(value);
    }
  }

  public page(pagingEvent: IPageChangeEvent): void {
    // const fromRow = pagingEvent.fromRow;
    // const currentPage = pagingEvent.page;
    // const pageSize = pagingEvent.pageSize;
  }

}
