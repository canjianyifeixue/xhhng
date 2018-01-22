import { OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
export declare const CHIPS_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicChipsComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {
    control: FormControl;
    label: string;
    selections: any[];
    items: string[];
    readonly: boolean;
    required: boolean;
    _value: any;
    value: any;
    ngOnInit(): void;
    add(v: any): void;
    remove(v: any): void;
}
