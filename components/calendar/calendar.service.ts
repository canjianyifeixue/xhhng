import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { WeekEntryComponent } from './week-entry.component';

@Injectable()
export class MhCalendarService {

  constructor(
    private dialog: MatDialog,
  ) { }

  public openWeekView(opt: { ddCampus: any, title?: string }): Observable<any> {
    return this.dialog.open(WeekEntryComponent, {
      width: '80%',
      data: {
        title: opt.title || '场地选择',
        ddCampus: opt.ddCampus
      }
    }).afterClosed().filter((_: any) => _);
  }

}
