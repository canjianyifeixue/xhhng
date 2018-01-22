import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DynamicEntryComponent } from './dynamic-form/index';
import { StepEntryComponent } from './step-form/index';
import { SearchEntryComponent } from './search-form/index';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MhFormsService {

  constructor(
    private dialog: MatDialog,
  ) { }

  /**
   * 打开动态表单
   * elements:动态表单ID
   * default:动态表单默认值(属性数等于组件数)
   * @param opt
   *
   */
  public openDynamicForm(opt: { elements: any, default?: any, title?: string, showActions?: boolean, width?: string }): Observable<any> {
    return this.dialog.open(DynamicEntryComponent, {
      width: opt.width || '70%',
      data: {
        title: opt.title || '动态表单',
        elements: opt.elements || [],
        default: opt.default || null,
        showActions: opt.showActions,
      }
    }).afterClosed().filter((_: any) => _);
  }

  /**
   * 打开步骤表单
   * @param opt
   */
  public openStepForm(opt: { forms: any, default?: any, title?: string, showActions?: boolean, width?: string }): Observable<any> {
    return this.dialog.open(StepEntryComponent, {
      width: opt.width || '70%',
      data: {
        title: opt.title || '步骤表单',
        forms: opt.forms || [],
        default: opt.default || null,
        showActions: opt.showActions,
      }
    }).afterClosed().filter((_: any) => _);
  }

  /**
   * 打开查询表单
   * @param opt
   */
  public openSearchForm(opt: { elements: any, default?: any, title?: string, showActions?: boolean, width?: string }): Observable<any> {
    return this.dialog.open(SearchEntryComponent, {
      width: opt.width || '70%',
      data: {
        title: opt.title || '查询表单',
        elements: opt.elements || [],
        default: opt.default || null,
        showActions: opt.showActions,
      }
    }).afterClosed().filter((_: any) => _);
  }

}
