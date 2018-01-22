import { Component, ChangeDetectorRef, ViewRef, ViewChild, Input } from '@angular/core';
import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  TdDataTableService,
  ITdDataTableSortChangeEvent,
  IPageChangeEvent
} from '@covalent/core';
import { fusejs as Fuse } from '../../util/fuse-js';

@Component({
  selector: 'mh-table',
  templateUrl: './table.component.html'
})
export class MhTableComponent {

  @Input() public columns: ITdDataTableColumn[] = [];
  @Input() public data: any[] = [];
  @Input() public filteredData: any[] = this.data;
  @Input() public filteredTotal: number = this.data.length;

  @ViewChild('pagingBar') public pagingBar: any;
  public fuse: any;
  public fuseOptions: any = {
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [],
  };

  @Input() public searchTerm = '';
  @Input() public fromRow = 1;
  @Input() public currentPage = 1;
  @Input() public pageSize = 10;
  @Input() public sortBy = '';
  @Input() public sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;

  constructor(
    private _dataTableService: TdDataTableService,
    private _cdr: ChangeDetectorRef,
  ) { }

  public sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  public search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.pagingBar.navigateToPage(1);
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
    if (this.searchTerm && this.searchTerm.length > 0 && this.data.length > 0) {
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
}
