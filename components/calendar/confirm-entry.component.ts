import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'mh-confirm-entry',
  templateUrl: './confirm-entry.component.html'
})
export class ConfirmEntryComponent {

  public actions: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<ConfirmEntryComponent>,
  ) {
    this.actions = this.dialogData.actions;
  }

  public close(key: string) {
    this.dialogRef.close(key);
  }

}
