import { Component, OnInit, Inject, ChangeDetectorRef, ViewRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  TdDataTableSortingOrder,
  TdDataTableService,
  ITdDataTableSortChangeEvent,
  IPageChangeEvent
} from '@covalent/core';
import { fusejs as Fuse } from '../../../../util/fuse-js';

@Component({
  selector: 'mh-dynamic-dialog-entry',
  templateUrl: './dynamic-dialog-entry.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MhDynamicDialogEntryComponent implements OnInit {

  public filterColumns = ['_number', '_$id_', '_$state_', 'id', 'parentId'];
  public label: string;
  public columns: any[] = [{ name: '_number', label: '序号' }];
  public data: any[] = [];
  public filteredData: any[] = this.data;
  public filteredTotal: number = this.data.length;
  public multiple = false;
  public selectedRows: any[] = [];

  public searchTerm = '';
  public fromRow = 1;
  public currentPage = 1;
  public pageSize = 5;
  public sortBy = '_number';
  public sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;
  public fuse: any;
  public fuseOptions: any = {
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [],
  };

  constructor(
    private _dataTableService: TdDataTableService,
    private dialogRef: MatDialogRef<MhDynamicDialogEntryComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private _cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit() {
    const data = this.dialogData;
    this.label = data.label;
    this.data = data.data;
    this.multiple = data.multiple || false;
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

  public sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  public search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  public page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  public filter(): void {
    let newData: any[] = this.data;
    // newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    if (this.searchTerm.length > 0) {
      this.fuseOptions.keys = Object.keys(this.data[0]);
      this.fuse = new Fuse(newData, this.fuseOptions);
      newData = this.fuse.search(this.searchTerm);
    }
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
    this.detectChanges();
  }

  public detectChanges() {
    setTimeout(() => {
      if (this._cdr !== null &&
        this._cdr !== undefined &&
        !(this._cdr as ViewRef).destroyed) {
        this._cdr.detectChanges();
      }
    }, 250);
  }

  public select(value: any) {
    if (!this.multiple) { this.dialogRef.close(value.row); return; }
  }

  public multSelect() {
    if (this.selectedRows.length > 0) {
      this.dialogRef.close(this.selectedRows);
    }
  }
}
