import { MatDialogRef } from '@angular/material';
export declare class StepEntryComponent {
    private dialogData;
    private dialogRef;
    formRef: any;
    showActions: boolean;
    title: string;
    forms: any;
    default: any;
    constructor(dialogData: any, dialogRef: MatDialogRef<StepEntryComponent>);
    save(value: any): void;
}
