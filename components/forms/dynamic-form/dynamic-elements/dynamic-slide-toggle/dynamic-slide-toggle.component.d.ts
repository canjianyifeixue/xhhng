import { OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
export declare const SLIDE_TOGGLE_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicSlideToggleComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {
    control: FormControl;
    label: string;
    required: boolean;
    ngOnInit(): void;
}
