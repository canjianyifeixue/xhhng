import { MatDialogRef } from '@angular/material';
import { ToolService } from '../../../services/index';
export declare class DynamicEntryComponent {
    private dialogData;
    private dialogRef;
    private toolService;
    formRef: any;
    showActions: boolean;
    title: string;
    elements: any;
    default: any;
    constructor(dialogData: any, dialogRef: MatDialogRef<DynamicEntryComponent>, toolService: ToolService);
    save(value: any): void;
    change(data: any): void;
}
