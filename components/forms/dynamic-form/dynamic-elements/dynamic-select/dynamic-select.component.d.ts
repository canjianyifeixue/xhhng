import { ControlValueAccessor, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
export declare const SELECT_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicSelectComponent extends AbstractControlValueAccessor implements ControlValueAccessor {
    private dialog;
    control: FormControl;
    label: string;
    showValue: string;
    required: boolean;
    multiple: boolean;
    selections: any[];
    _value: any;
    value: any;
    constructor(dialog: MatDialog);
    getValue(key: string): string;
    genSelections(): any[];
    open(): void;
}
