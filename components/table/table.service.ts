import { Injectable } from '@angular/core';
import { TableEntryComponent } from './table-entry.component';
import { Observable } from 'rxjs/Observable';

import { MatDialog } from '@angular/material';

@Injectable()
export class TableService {

  constructor(
    private dialog: MatDialog,
  ) { }

  public openTable(opt: {
    data: any[], label?: string, columns?: any[],
    select?: boolean, multiple?: boolean, width?: any
  }): Observable<any> {
    return this.dialog.open(TableEntryComponent, {
      width: opt.width || '70%',
      data: {
        label: opt.label || '表格',
        data: opt.data || [],
        columns: opt.columns || null,
        select: opt.select || false,
        multiple: opt.multiple || false,
      }
    }).afterClosed().filter((_: any) => _);
  }
}
