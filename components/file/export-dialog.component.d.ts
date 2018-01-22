import { MatDialogRef } from '@angular/material';
import { NotificationService } from '../../services/index';
export declare class ExportDialogComponent {
    private notificationService;
    private dialogRef;
    private dialogData;
    checkedAll: boolean;
    data: any;
    columns: any;
    value: any;
    selectedCols: string[];
    constructor(notificationService: NotificationService, dialogRef: MatDialogRef<ExportDialogComponent>, dialogData: any);
    change(index: number): void;
    selectedAll(): void;
    export(): void;
}
