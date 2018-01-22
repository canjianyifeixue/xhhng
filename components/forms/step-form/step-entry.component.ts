import { Component, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'mh-step-entry',
  templateUrl: './step-entry.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepEntryComponent {

  @ViewChild('form') public formRef: any;

  public showActions: boolean;
  public title: string;
  public forms: any;
  public default: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<StepEntryComponent>,
  ) {
    this.title = this.dialogData.title || '表单';
    this.forms = this.dialogData.forms || [];
    this.default = this.dialogData.default || null;
    this.showActions = this.dialogData.showActions === false ? false : true;
  }

  public save(value: any) {
    this.dialogRef.close(value);
  }

}
