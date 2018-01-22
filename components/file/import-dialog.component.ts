import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { NotificationService, HttpService } from '../../services/index';

@Component({
  selector: 'mh-import-dialog',
  templateUrl: './import-dialog.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportDialogComponent {

  @ViewChild('fileInput') public fileInput: any;

  public hasError = true;

  public file: File;

  public accept = 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  public exts = ['.xls', '.xlsx'];

  public uploader: FileUploader;

  public buttonEnabled = true;

  public data: any = {};

  public text = '上传';

  public uploaddata: any;
  constructor(
    private httpService: HttpService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<ImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
  ) {
    this.uploader = new FileUploader({
      url: `${this.httpService.api}${dialogData.url}`,
      authToken: `Bearer ${localStorage.getItem('token')}`
    });
    this.uploader.onCompleteItem = this.onCompleteItem;
    this.uploader.onCompleteAll = this.onCompleteAll;
  }

  public select(file: File) {
    let ext = '';
    if (file && file.name && typeof file.name === 'string') {
      const arr = file.name.match(/\.\w+$/);
      if (Array.isArray(arr)) {
        ext = arr[0];
      }
    }
    if (this.exts.indexOf(ext) < 0) {
      this.fileInput.clear();
      this.notificationService.error('文件类型不正确');
      return;
    }
    if (file.name.indexOf(this.dialogData.id + '_') !== 0) {
      this.fileInput.clear();
      this.notificationService.error('文件不正确,请确认模板文件名为本界面下载的模板!');
      return;
    }

    this.clear();
    this.uploader.addToQueue([file]);
  }

  public clear() {
    if (this.uploader.queue.length > 0) {
      this.uploader.removeFromQueue(this.uploader.queue[0]);
    }
  }

  public startUpload(): void {
    this.text = '正在上传';
    this.buttonEnabled = false;
    this.uploader.uploadAll();
  }

  public onCompleteItem = (item: any, response: any, status: any) => {
    this.uploaddata = JSON.parse(response);
    if (status === 200) {
      this.hasError = false;
    }
  }

  public onCompleteAll = () => {
    this.text = '正在保存';
    if (this.hasError) { this.notificationService.error('导入失败'); }
    this.dialogRef.close(this.uploaddata);
  }

}
