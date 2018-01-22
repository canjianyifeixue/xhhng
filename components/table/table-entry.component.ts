import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TdDataTableService } from '@covalent/core';

import { BaseTable } from './base-table';

@Component({
  selector: 'mh-table-entry',
  templateUrl: './table-entry.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableEntryComponent extends BaseTable implements OnInit {

  public label: string;
  public filterColumns = ['_number', '_$id_', '_$state_', 'id', 'parentId'];
  public selected = false;
  public multiple = false;
  public selectedRows: any[] = [];
  constructor(
    dataTableService: TdDataTableService,
    private dialogRef: MatDialogRef<TableEntryComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    cdr: ChangeDetectorRef,
  ) {
    super(dataTableService, cdr);
  }

  public ngOnInit() {
    const data = this.dialogData;
    this.label = data.label;
    this.data = data.data;
    this.selected = data.select === true ? true : false;
    this.multiple = data.multiple === true ? true : false;
    this.selectedRows = [];
    const columns = data.columns || [];
    // col初始化
    if (this.data.length <= 0) { return; }
    const colMap: any[] = [];
    columns.forEach((e: any) => colMap.push(e.name));
    for (const col of Object.keys(this.data[0])) {
      if (this.filterColumns.indexOf(col) < 0) {
        const index = colMap.indexOf(col);
        this.columns = [
          ...this.columns,
          { name: col, label: index >= 0 ? columns[index].label : col }
        ];
      }
    }

    for (let i = 0; i < this.data.length; i++) {
      this.data[i]._number = i + 1;
    }

    this.filter();
  }

  public select(value: any) {
    if (!this.multiple) { this.dialogRef.close(value.row); }
  }

  public multSelect() {
    if (this.selectedRows.length > 0) {
      this.dialogRef.close(this.selectedRows);
    }
  }

}
