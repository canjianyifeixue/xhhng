import { ControlValueAccessor, FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { MhDateAdapter } from '../../dynamic-date-adapter';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
export declare const DATE_PICKER_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicDatepickerComponent extends AbstractControlValueAccessor implements ControlValueAccessor {
    control: FormControl;
    label: string;
    type: string;
    required: boolean;
    _value: any;
    value: any;
    constructor(dateAdapter: DateAdapter<MhDateAdapter>);
}
