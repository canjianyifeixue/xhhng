import { ControlValueAccessor, FormControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
export declare const TEXTAREA_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicTextareaComponent extends AbstractControlValueAccessor implements ControlValueAccessor {
    control: FormControl;
    label: string;
    required: boolean;
    pattern: string | RegExp;
    maxlength: number | null;
    readonly: boolean;
}
