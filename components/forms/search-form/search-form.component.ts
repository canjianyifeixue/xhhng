import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpUtilService } from '../../../services/index';
import { DateAdapter, NativeDateAdapter } from '@angular/material';

export interface ISearchConfig {
  name: string;
  label: string;
  type: 'date' | 'boolean' | 'enum';
  selections?: any[] | string;
}

@Component({
  selector: 'mh-search-form',
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent {

  public defaultValue: any;
  public _elements: any[] = [];
  @Input('elements')
  set elements(v: any) {
    v.forEach((c: any) => {
      if (typeof c.selections === 'string') {
        this.httpUtilService.getDictionaryData(c.selections).subscribe((_: any) => c.selections = _);
        c.selections = [];
      }
    });
    this._elements = v;
  }
  get elements(): any {
    return this._elements;
  }
  @Input('value') public value: any = {};

  @Output('selected') public selected = new EventEmitter<any>();

  constructor(
    private httpUtilService: HttpUtilService,
    dateAdapter: DateAdapter<NativeDateAdapter>
  ) {
    this.defaultValue = this.value;
    dateAdapter.setLocale('zh-CN');
  }

  public isObject(value: any): boolean {
    return typeof value === 'object';
  }

  public dateSelect(value: any, name: any) {
    this.value[name] = value;
    this.change();
  }

  public change() {
    this.selected.emit(this.value);
  }

  public reset() {
    this.value = this.defaultValue;
    this.change();
  }

}
