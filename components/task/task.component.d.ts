import { OnInit, ChangeDetectorRef } from '@angular/core';
import { TdDataTableService } from '@covalent/core';
import { BaseTable } from '../table/index';
import { NotificationService } from '../../services/index';
import { TaskService } from './task.service';
export declare class MhTaskComponent extends BaseTable implements OnInit {
    private notificationService;
    private taskService;
    key: string;
    title: string;
    columns: any[];
    sortBy: string;
    handleDialog: boolean;
    customFilter: (data: any[]) => any[];
    userId: string;
    data: any[];
    formMode: boolean;
    formControls: any;
    formData: any;
    formEditable: boolean;
    selectedData: any;
    constructor(dataTableService: TdDataTableService, notificationService: NotificationService, taskService: TaskService, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    get(): void;
    trace(row: any): void;
    handle(row: any): void;
    save(data: any): void;
    cancel(): void;
    canEdit(form: any): boolean;
    filterBizData(data: any[]): any[];
    hasColumn(name: string): boolean;
}