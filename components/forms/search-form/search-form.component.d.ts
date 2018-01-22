import { EventEmitter } from '@angular/core';
import { HttpUtilService } from '../../../services/index';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
export interface ISearchConfig {
    name: string;
    label: string;
    type: 'date' | 'boolean' | 'enum';
    selections?: any[] | string;
}
export declare class SearchFormComponent {
    private httpUtilService;
    defaultValue: any;
    _elements: any[];
    elements: any;
    value: any;
    selected: EventEmitter<any>;
    constructor(httpUtilService: HttpUtilService, dateAdapter: DateAdapter<NativeDateAdapter>);
    isObject(value: any): boolean;
    dateSelect(value: any, name: any): void;
    change(): void;
    reset(): void;
}
