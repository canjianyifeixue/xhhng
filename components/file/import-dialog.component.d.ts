import { MatDialogRef } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { NotificationService, HttpService } from '../../services/index';
export declare class ImportDialogComponent {
    private httpService;
    private notificationService;
    private dialogRef;
    private dialogData;
    fileInput: any;
    hasError: boolean;
    file: File;
    accept: string;
    exts: string[];
    uploader: FileUploader;
    buttonEnabled: boolean;
    data: any;
    text: string;
    uploaddata: any;
    constructor(httpService: HttpService, notificationService: NotificationService, dialogRef: MatDialogRef<ImportDialogComponent>, dialogData: any);
    select(file: File): void;
    clear(): void;
    startUpload(): void;
    onCompleteItem: (item: any, response: any, status: any) => void;
    onCompleteAll: () => void;
}
