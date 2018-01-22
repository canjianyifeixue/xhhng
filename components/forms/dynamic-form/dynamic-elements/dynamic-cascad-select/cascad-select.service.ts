import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CascadSelectService {

  constructor(
    @Inject('http') private http: any,
  ) { }

  public initSelection(data: any, selectedData: any, keyField: string): Observable<any> {
    let selections = data;
    const arr = [];
    for (let i = 0; i < selectedData.length; i++) {
      const select = selectedData[i];
      const result = this.loopSelection(selections, select, keyField);
      if (result === 0) {
        break;
      } else if (result === -1) {
        return Observable.of(null);
      } else {
        arr.push(result);
        selections = result.children;
      }
    }
    selections = selections;
    selectedData = arr;
    return Observable.of({ selections, selectedData });
  }

  public loopSelection(selections: any[], key: any, keyField: string): any {
    for (const selection of selections) {
      const k = key[keyField] || key;
      if (selection[keyField] === k) {
        if (Array.isArray(selection.children) && selection.children.length > 0) {
          return selection;
        } else {
          return 0;
        }
      }
    }
    return -1;
  }

  public initAsyncSelection(
    selectedData: any, data: any, selections: any, selectDepth: any,
    keyField: string, valueField: string
  ): Observable<any> {
    const arr = [this.loadAsyncData(data, 0)];
    for (let i = 1; i < selectedData.length; i++) {
      arr.push(this.loadAsyncData(data, i, selectedData[i - 1]));
    }
    return this.loadAsyncSelection(arr, selectedData, selections, selectDepth, keyField, valueField);
  }

  public loadAsyncSelection(
    arr: Array<Observable<any>>, selectedData: any, selections: any,
    selectDepth: any, keyField: string, valueField: string
  ): Observable<any> {
    return Observable.combineLatest(...arr)
      .map((_: any) => {
        const array = [];
        for (let i = 0; i < _.length - 1; i++) {
          const key = typeof selectedData[i] === 'string' ? selectedData[i] : selectedData[i].key;
          const items = _[i].items;
          for (const item of items) {
            if (item[keyField] === key) {
              array.push({ key: item[keyField], value: item[valueField] });
              break;
            }
          }
        }
        selectDepth = _.length - 1;
        selectedData = array;
        selections = _[_.length - 1].items;
        return {
          selectDepth,
          selectedData,
          selections
        };
      });
  }

  public loadAsyncData(data: any, index: number, value?: string): Observable<any> {
    const urls = data.split(';');
    let url = urls[index];
    if (value) { url = url.split('${value}').join(value); }
    return this.http.get(url);
  }

}
