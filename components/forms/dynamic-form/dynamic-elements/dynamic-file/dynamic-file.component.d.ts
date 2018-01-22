import { ControlValueAccessor, FormControl } from '@angular/forms';
import { MhDynamicLoaderService } from '../../dynamic-loader.service';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
export declare const FILE_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicFileComponent extends AbstractControlValueAccessor implements ControlValueAccessor {
    private notificationService;
    private dynamicLoaderService;
    control: FormControl;
    label: string;
    config: any;
    required: boolean;
    multiple: boolean;
    maxlength: any;
    value: any;
    constructor(notificationService: any, dynamicLoaderService: MhDynamicLoaderService);
    select(files: FileList | File): void;
    preview(path: string): void;
}
