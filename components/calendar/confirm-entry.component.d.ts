import { MatDialogRef } from '@angular/material';
export declare class ConfirmEntryComponent {
    private dialogData;
    private dialogRef;
    actions: any[];
    constructor(dialogData: any, dialogRef: MatDialogRef<ConfirmEntryComponent>);
    close(key: string): void;
}
