import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
import { MatDialog } from '@angular/material';
import { MhCascadSelectEntryComponent } from './cascad-select-entry.component';
import { CascadSelectService } from './cascad-select.service';

export const CASCAD_SELECT_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicCascadSelectComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-cascad-select',
  templateUrl: './dynamic-cascad-select.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CASCAD_SELECT_INPUT_CONTROL_VALUE_ACCESSOR, CascadSelectService]
})
export class MhDynamicCascadSelectComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {

  public control: FormControl;

  public label = '';

  public required = false;

  public selections: any[] = [];

  public showValue: any;

  public config: any = {};

  public _value: any;

  set value(v: any) {
    this._value = v;
    this.onChange(v);
    this.change();
  }

  get value(): any {
    return this._value;
  }

  constructor(
    private cascadSelectService: CascadSelectService,
    private dialog: MatDialog,
    // @Inject('http') private http: any,
  ) {
    super();
    // this.cascadSelectService = new CascadSelectService(http)
  }

  public ngOnInit() {
    this.change();
  }

  public change() {
    const options = {
      selections: this.config.depth && this.config.depth.length > 0 ? this.config.depth : this.selections,
      async: this.config.depth && this.config.depth.length > 0 ? true : false,
      title: this.label,
      default: this.value || [],
      keyField: this.config.valueField || 'key',
      valueField: this.config.showField || 'value',
    };
    if (options.async) {
      const selectDepth = 0;
      this.cascadSelectService.initAsyncSelection(
        options.default, options.selections, [],
        selectDepth, options.keyField, options.valueField
      ).subscribe((_: any) => this.init(_));
    } else {
      this.cascadSelectService.initSelection(
        options.selections, options.default, options.keyField
      ).filter((_: any) => _).subscribe((_: any) => this.init(_));
    }
  }

  public init(data: any) {
    const arr = [];
    for (const item of data.selectedData) {
      arr.push(item.value);
    }
    if (this.value && this.value.length > 0) {
      for (const selection of data.selections) {
        if (selection.key === this.value[this.value.length - 1]) {
          arr.push(selection.value);
          break;
        }
      }
    }
    this.showValue = arr.join('>>');
  }

  public open() {
    const dialogRef = this.dialog.open(MhCascadSelectEntryComponent, {
      width: '64vh',
      height: '80vh',
      data: {
        selections: this.config.depth && this.config.depth.length > 0 ? this.config.depth : this.selections,
        async: this.config.depth && this.config.depth.length > 0 ? true : false,
        title: this.label,
        default: this.value || [],
        keyField: this.config.valueField || 'key',
        valueField: this.config.showField || 'value',
      }
    });
    dialogRef.afterClosed().filter((data: any) => data).subscribe((data: any) => {
      const keyArr = [];
      const valueArr = [];
      for (const item of data) {
        keyArr.push(item.key);
        valueArr.push(item.value);
      }
      this.control.setValue(keyArr);
      this.showValue = valueArr.join('>>');
    });
  }

  // setValue(data: string) {
  //   for (const selection of this.selections) {
  //     if (selection.key === data) {
  //       this.data[0] = data
  //     } else {
  //       const arr = []
  //       this.findChildren(data, 0, selection.children || [], arr)
  //       for (const d of arr) {
  //         this.data[d.index] = d.key
  //         this.models[d.index] = d.selectoions
  //       }
  //       if (arr.length > 0) { this.data[0] = selection.key }
  //     }
  //   }
  // }

  // findChildren(data: string, index: number, selections: any, arr: any[]) {
  //   index++
  //   for (const s of selections) {
  //     if (s.key === data) {
  //       arr.push({ index: index, key: s.key, selectoions: selections })
  //       return true
  //     } else {
  //       const find = this.findChildren(data, index, s.children || [], arr)
  //       if (find) { arr.push({ index: index, key: s.key, selectoions: selections }) }
  //     }
  //   }
  //   return false
  // }

  // change(data: any, index: number) {
  //   let selection
  //   for (const model of this.models[index]) {
  //     if (data.value === model.key) { selection = model }
  //   }
  //   this.models[index + 1] = selection.children
  //   this.control.setValue(selection.children ? null : data.value)
  //   for (let i = index + 2; i < this.models.length; i++) {
  //     this.models[i] = undefined
  //   }
  //   for (let i = index + 1; i < this.models.length; i++) {
  //     this.data[i] = undefined
  //   }
  // }

  // getWidth(): string {
  //   return '25%'
  // }

}
