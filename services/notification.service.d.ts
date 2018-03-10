import { MatSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
export declare class NotificationService {
    private snackBar;
    private dialogService;
    private _snackBarConfig;
    constructor(snackBar: MatSnackBar, dialogService: TdDialogService);
    private open(message, cssClass);
    success(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    confirmDelete(title?: string, acceptButton?: string, cancelButton?: string): Observable<boolean>;
    confirm(message: string, title?: string, acceptButton?: string, cancelButton?: string, disableClose?: boolean): Observable<boolean>;
    confirmUnbind(title?: string, acceptButton?: string, cancelButton?: string): Observable<boolean>;
    confirmSub(title?: string, acceptButton?: string, cancelButton?: string): Observable<boolean>;
    prompt(message: string, value?: string, title?: string, acceptButton?: string, cancelButton?: string): Observable<boolean>;
}
