import { OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
export declare const INPUT_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicInputComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {
    control: FormControl;
    label: string;
    type: string;
    readonly: boolean;
    required: boolean;
    min: number | null;
    max: number | null;
    pattern: string | RegExp;
    maxlength: number | null;
    tooltip: string;
    config: any;
    ngOnInit(): void;
}
