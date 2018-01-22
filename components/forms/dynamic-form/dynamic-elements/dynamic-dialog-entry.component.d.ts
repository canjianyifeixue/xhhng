import { OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TdDataTableSortingOrder, TdDataTableService, ITdDataTableSortChangeEvent, IPageChangeEvent } from '@covalent/core';
export declare class MhDynamicDialogEntryComponent implements OnInit {
    private _dataTableService;
    private dialogRef;
    private dialogData;
    private _cdr;
    filterColumns: string[];
    label: string;
    columns: any[];
    data: any[];
    filteredData: any[];
    filteredTotal: number;
    multiple: boolean;
    selectedRows: any[];
    searchTerm: string;
    fromRow: number;
    currentPage: number;
    pageSize: number;
    sortBy: string;
    sortOrder: TdDataTableSortingOrder;
    fuse: any;
    fuseOptions: any;
    constructor(_dataTableService: TdDataTableService, dialogRef: MatDialogRef<MhDynamicDialogEntryComponent>, dialogData: any, _cdr: ChangeDetectorRef);
    ngOnInit(): void;
    sort(sortEvent: ITdDataTableSortChangeEvent): void;
    search(searchTerm: string): void;
    page(pagingEvent: IPageChangeEvent): void;
    filter(): void;
    detectChanges(): void;
    select(value: any): void;
    multSelect(): void;
}