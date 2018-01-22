import { MatDialogRef } from '@angular/material';
export declare class SearchEntryComponent {
    private dialogData;
    private dialogRef;
    formRef: any;
    showActions: boolean;
    title: string;
    elements: any;
    default: any;
    constructor(dialogData: any, dialogRef: MatDialogRef<SearchEntryComponent>);
    save(value: any): void;
}
