import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../services/index';

@Component({
  selector: 'mh-export-dialog',
  templateUrl: './export-dialog.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportDialogComponent {

  public checkedAll = false;
  public data: any;
  public columns: any;
  public value: any;
  public selectedCols: string[] = [];

  constructor(
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<ExportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
  ) {
    this.data = this.dialogData.data;
    const columns = this.dialogData.columns;
    this.columns = [];
    this.value = [];
    for (const col of columns) {
      if (this.data[0][col.name]) {
        this.columns = [...this.columns, col];
        this.value.push(false);
      }
    }
  }

  public change(index: number) {
    const value = this.columns[index];
    const i = this.selectedCols.indexOf(value);
    if (i >= 0) {
      this.selectedCols = [
        ...this.selectedCols.slice(0, i),
        ...this.selectedCols.slice(i + 1)
      ];
    } else {
      this.selectedCols = [
        ...this.selectedCols,
        value
      ];
    }
    this.checkedAll = this.selectedCols.length === this.columns.length ? true : false;
  }

  public selectedAll() {
    if (this.checkedAll) {
      for (let i = 0; i < this.value.length; i++) { this.value[i] = true; }
      this.selectedCols = [];
      this.columns.forEach((_: any) => this.selectedCols.push(_));
    } else {
      for (let i = 0; i < this.value.length; i++) { this.value[i] = false; }
      this.selectedCols = [];
    }
  }

  public export() {
    if (this.selectedCols.length <= 0) {
      this.notificationService.error('请选择导出列');
      return;
    }
    this.dialogRef.close(this.selectedCols);
  }

}
