import { EventEmitter, OnInit } from '@angular/core';
import { MhDynamicFormElementConfig, MhFormsService } from '../forms/index';
export declare class TaskFormComponent implements OnInit {
    private formsService;
    forms: any;
    data: any;
    editable: boolean;
    close: EventEmitter<any>;
    showDialog: boolean;
    opinion: any;
    formData: any;
    default: any;
    elements: MhDynamicFormElementConfig[];
    constructor(formsService: MhFormsService);
    ngOnInit(): void;
    open(): void;
    save(value: any): void;
    cancel(): void;
}
