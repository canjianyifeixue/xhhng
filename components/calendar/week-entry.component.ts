import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'mh-week-entry',
  templateUrl: './week-entry.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekEntryComponent {

  public title: string;
  public ddCampus: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<WeekEntryComponent>,
  ) {
    this.title = this.dialogData.title || '周视图';
    this.ddCampus = this.dialogData.ddCampus || null;
  }

  public save(value: any) {
    this.dialogRef.close(value);
  }

}
