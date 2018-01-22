import { OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
export declare const DIALOG_SELECT_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicDialogSelectComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {
    private dialog;
    control: FormControl;
    label: string;
    required: boolean;
    selections: any;
    multiple: boolean;
    showValue: string;
    config: any;
    constructor(dialog: MatDialog);
    ngOnInit(): void;
    open(): void;
}
