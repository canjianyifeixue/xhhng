import { Component, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'mh-search-entry',
  templateUrl: './search-entry.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchEntryComponent {

  @ViewChild('form') public formRef: any;

  public showActions: boolean;
  public title: string;
  public elements: any;
  public default: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<SearchEntryComponent>,
  ) {
    this.title = this.dialogData.title || '表单';
    this.elements = this.dialogData.elements || [];
    this.default = this.dialogData.default || null;
    this.showActions = this.dialogData.showActions === false ? false : true;
  }

  public save(value: any) {
    this.dialogRef.close(value);
  }

}
