import { OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
import { MatDialog } from '@angular/material';
import { CascadSelectService } from './cascad-select.service';
export declare const CASCAD_SELECT_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicCascadSelectComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {
    private cascadSelectService;
    private dialog;
    control: FormControl;
    label: string;
    required: boolean;
    selections: any[];
    showValue: any;
    config: any;
    _value: any;
    value: any;
    constructor(cascadSelectService: CascadSelectService, dialog: MatDialog);
    ngOnInit(): void;
    change(): void;
    init(data: any): void;
    open(): void;
}
