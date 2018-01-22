import { ControlValueAccessor, FormControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
export declare const CHECKBOX_GROUP_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicCheckboxGroupComponent extends AbstractControlValueAccessor implements ControlValueAccessor {
    control: FormControl;
    label: string;
    required: boolean;
    selections: any[];
    _value: any;
    value: any;
    change(index: number): void;
    isObject(value: any): boolean;
}
