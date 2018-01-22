import { OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { IPageChangeEvent } from '@covalent/core';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
export declare const DATA_FORM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicDataFormComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {
    private dialog;
    length: number;
    idField: string;
    stateField: string;
    control: FormControl;
    label: string;
    required: boolean;
    selections: any;
    controls: any[];
    config: any;
    _value: any;
    value: any;
    constructor(dialog: MatDialog);
    ngOnInit(): void;
    /**
     * 获取表单模型
     */
    getModel(): {
        [key: string]: any;
    };
    /**
     * 增加新的一条数据
     */
    add(): void;
    /**
     * 插入数据的实现
     */
    insertData(data: any): void;
    /**
     * 删除一条数据
     */
    remove(index: number): void;
    isObject(value: any): boolean;
    change(index: number): void;
    page(pagingEvent: IPageChangeEvent): void;
}
