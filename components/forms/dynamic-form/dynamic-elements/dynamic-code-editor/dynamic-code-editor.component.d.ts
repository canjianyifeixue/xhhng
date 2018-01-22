import { ControlValueAccessor, FormControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
export declare const CODE_EDITOR_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicCodeEditorComponent extends AbstractControlValueAccessor implements ControlValueAccessor {
    control: FormControl;
    language: string;
    theme: string;
    label: string;
    required: boolean;
    readonly: boolean;
    maxlength: number | null;
    callBackFunc(): void;
}
