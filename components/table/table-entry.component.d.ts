import { OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TdDataTableService } from '@covalent/core';
import { BaseTable } from './base-table';
export declare class TableEntryComponent extends BaseTable implements OnInit {
    private dialogRef;
    private dialogData;
    label: string;
    filterColumns: string[];
    selected: boolean;
    multiple: boolean;
    selectedRows: any[];
    constructor(dataTableService: TdDataTableService, dialogRef: MatDialogRef<TableEntryComponent>, dialogData: any, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    select(value: any): void;
    multSelect(): void;
}
