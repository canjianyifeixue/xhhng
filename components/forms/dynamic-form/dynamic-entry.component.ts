import { Component, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToolService } from '../../../services/index';

@Component({
  selector: 'mh-dynamic-entry',
  templateUrl: './dynamic-entry.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicEntryComponent {

  @ViewChild('form') public formRef: any;

  public showActions: boolean;
  public title: string;
  public elements: any;
  public default: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<DynamicEntryComponent>,
    private toolService: ToolService,
  ) {
    this.title = this.dialogData.title || '表单';
    this.elements = this.dialogData.elements || [];
    this.default = this.dialogData.default;
    this.showActions = this.dialogData.showActions === false ? false : true;
  }

  public save(value: any) {
    if (this.default) {
      value = this.toolService.filterField(this.default, value);
    }
    this.dialogRef.close(value);
  }

  public change(data: any) {
    // nothing to do.
  }

}
