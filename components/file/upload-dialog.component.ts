import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { HttpService } from '../../services/index';

@Component({
  selector: 'mh-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDialogComponent {

  public uploader: FileUploader;

  public buttonEnabled = true;

  public data: any = {};

  public text = '上传';

  constructor(
    private httpService: HttpService,
    private dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
  ) {
    this.uploader = new FileUploader({
      url: `${this.httpService.api}/public/file/upload`,
      authToken: `Bearer ${localStorage.getItem('token')}`
    });
    this.uploader.onCompleteItem = this.onCompleteItem;
    this.uploader.onCompleteAll = this.onCompleteAll;
    let fileList: File[] = [];
    for (const key of Object.keys(this.dialogData)) {
      const v = this.dialogData[key];
      const arr = Array.isArray(v) ? v : [v];
      arr.forEach((_: any) => fileList = [...fileList, _]);
    }
    this.uploader.addToQueue(fileList);
  }

  public startUpload(): void {
    this.text = '正在上传';
    this.buttonEnabled = false;
    this.uploader.uploadAll();
  }

  public onCompleteItem = (item: any, response: any, status: any) => {
    if (status === 200) {
      const res = JSON.parse(response);
      const id = res.data.id;
      for (const key of Object.keys(this.dialogData)) {
        const v = this.dialogData[key];
        if (!Array.isArray(v)) {
          if (item.file.name === v.name) {
            this.data[key] = id;
          }
        } else {
          v.forEach((_: any) => {
            if (item.file.name === _.name) {
              if (!this.data[key]) { this.data[key] = []; }
              this.data[key] = [...this.data[key], id];
            }
          });
        }
      }
    }
  }

  public onCompleteAll = () => {
    this.text = '正在保存';
    this.dialogRef.close(this.data);
  }

}
