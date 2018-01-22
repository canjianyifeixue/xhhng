import { ChangeDetectorRef } from '@angular/core';
import { ITdDataTableColumn, TdDataTableSortingOrder, TdDataTableService, ITdDataTableSortChangeEvent, IPageChangeEvent } from '@covalent/core';
export declare class MhTableComponent {
    private _dataTableService;
    private _cdr;
    columns: ITdDataTableColumn[];
    data: any[];
    filteredData: any[];
    filteredTotal: number;
    pagingBar: any;
    fuse: any;
    fuseOptions: any;
    searchTerm: string;
    fromRow: number;
    currentPage: number;
    pageSize: number;
    sortBy: string;
    sortOrder: TdDataTableSortingOrder;
    constructor(_dataTableService: TdDataTableService, _cdr: ChangeDetectorRef);
    sort(sortEvent: ITdDataTableSortChangeEvent): void;
    search(searchTerm: string): void;
    page(pagingEvent: IPageChangeEvent): void;
    filter(): void;
    detectChanges(): void;
}
