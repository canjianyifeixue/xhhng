import { OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
export declare const CHECKBOX_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicCheckboxComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {
    control: FormControl;
    label: string;
    required: boolean;
    ngOnInit(): void;
}
