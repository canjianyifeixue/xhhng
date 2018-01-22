import { NativeDateAdapter } from '@angular/material';
import { moment } from '../../../util/moment';

export class MhDateAdapter extends NativeDateAdapter {

  public format(date: Date, displayFormat: object): string {
    return moment(date).format('YYYY-MM-DD');
  }

  public parse(value: any): Date | null {
    if (typeof value === 'string' && value.length <= 0) { return null; }
    return moment(value).toDate();
  }

}
