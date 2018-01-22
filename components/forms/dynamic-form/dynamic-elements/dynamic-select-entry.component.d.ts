import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export declare class MhDynamicSelectEntryComponent implements OnInit {
    private dialogRef;
    private dialogData;
    selections: any[];
    multiple: boolean;
    title: string;
    fuse: any;
    backupSelections: any;
    searchTerm: string;
    fuseOptions: any;
    constructor(dialogRef: MatDialogRef<MhDynamicSelectEntryComponent>, dialogData: any);
    ngOnInit(): void;
    initFuse(): void;
    select(item: any): void;
    multChange(selection: any): void;
    multSelect(): void;
    clear(): void;
}
