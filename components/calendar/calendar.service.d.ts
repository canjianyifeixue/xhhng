import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
export declare class MhCalendarService {
    private dialog;
    constructor(dialog: MatDialog);
    openWeekView(opt: {
        ddCampus: any;
        title?: string;
    }): Observable<any>;
}
