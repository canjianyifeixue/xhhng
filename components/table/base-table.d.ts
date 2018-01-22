import { ChangeDetectorRef } from '@angular/core';
import { ITdDataTableColumn, TdDataTableSortingOrder, TdDataTableService, ITdDataTableSortChangeEvent, IPageChangeEvent } from '@covalent/core';
/**
 * 封装基本页面表格数据相关写法
 * 例如：模糊查询、分页处理等
 */
export declare abstract class BaseTable {
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
