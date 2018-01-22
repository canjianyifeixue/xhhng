import { MatDialogRef } from '@angular/material';
export declare class WeekEntryComponent {
    private dialogData;
    private dialogRef;
    title: string;
    ddCampus: string;
    constructor(dialogData: any, dialogRef: MatDialogRef<WeekEntryComponent>);
    save(value: any): void;
}
