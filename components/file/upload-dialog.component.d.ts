import { MatDialogRef } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { HttpService } from '../../services/index';
export declare class UploadDialogComponent {
    private httpService;
    private dialogRef;
    private dialogData;
    uploader: FileUploader;
    buttonEnabled: boolean;
    data: any;
    text: string;
    constructor(httpService: HttpService, dialogRef: MatDialogRef<UploadDialogComponent>, dialogData: any);
    startUpload(): void;
    onCompleteItem: (item: any, response: any, status: any) => void;
    onCompleteAll: () => void;
}
