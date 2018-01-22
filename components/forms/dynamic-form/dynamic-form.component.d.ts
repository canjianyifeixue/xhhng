import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MhDynamicLoaderService } from './dynamic-loader.service';
import { MhDynamicFormService } from './dynamic-form.service';
export declare class MhDynamicFormComponent {
    private _formBuilder;
    private _dynamicFormsService;
    private _dynamicLoaderService;
    private _cdr;
    dynamicForm: FormGroup;
    hasError: boolean;
    errorInfo: string;
    elements: any;
    _default: any;
    default: any;
    /**
     * Getter property for dynamic [FormGroup].
     */
    readonly form: FormGroup;
    /**
     * Getter property for [valid] of dynamic [FormGroup].
     */
    readonly valid: boolean;
    /**
     * Getter property for [value] of dynamic [FormGroup].
     */
    readonly value: any;
    /**
     * Getter property for [errors] of dynamic [FormGroup].
     */
    readonly errors: {
        [name: string]: any;
    };
    /**
     * Getter property for [controls] of dynamic [FormGroup].
     */
    readonly controls: {
        [key: string]: AbstractControl;
    };
    change: EventEmitter<any>;
    private inited;
    private _renderedElements;
    private _elements;
    constructor(_formBuilder: FormBuilder, _dynamicFormsService: MhDynamicFormService, _dynamicLoaderService: MhDynamicLoaderService, _cdr: ChangeDetectorRef);
    refresh(): void;
    init(): void;
    private _loaderElements(elements);
    private _rerenderElements(elements);
    private _clearRemovedElements(elements);
    private setValue();
    private validateAsync();
    private detectChanges();
}
