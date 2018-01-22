import { ControlValueAccessor, FormControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
export declare const RADIO_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicRadioComponent extends AbstractControlValueAccessor implements ControlValueAccessor {
    control: FormControl;
    label: string;
    required: boolean;
    default?: string;
    selections?: any[];
    isObject(value: any): boolean;
}
