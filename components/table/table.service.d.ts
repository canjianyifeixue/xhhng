import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
export declare class TableService {
    private dialog;
    constructor(dialog: MatDialog);
    openTable(opt: {
        data: any[];
        label?: string;
        columns?: any[];
        select?: boolean;
        multiple?: boolean;
        width?: any;
    }): Observable<any>;
}
