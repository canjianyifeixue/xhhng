import { OnInit } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { MhDynamicFormService } from './dynamic-form.service';
import { MhDynamicFormElement, MhDynamicFormType } from './dynamic-form.entity';
import { AbstractControlValueAccessor } from './dynamic-elements/abstract-control-value-accesor';
export declare class MhDynamicElementDirective {
    viewContainer: ViewContainerRef;
    constructor(viewContainer: ViewContainerRef);
}
export declare const ELEMENT_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MhDynamicElementComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit {
    private _componentFactoryResolver;
    private _dynamicFormsService;
    value: any;
    /**
     * 设置元素的form control.
     */
    dynamicControl: FormControl;
    /**
     * 设置label.
     */
    label: string;
    /**
     * 设置元素的值类型或元素类型.
     * 遇到不存在或不支持的会抛出异常.
     */
    type: MhDynamicFormElement | MhDynamicFormType | string;
    /**
     * 设置required校验器 (if supported by element).
     */
    required: boolean;
    /**
     * 只读
     */
    readonly: boolean;
    /**
     * 设置min校验器 (if supported by element).
     */
    min: number | null;
    /**
     * 设置max校验器 (if supported by element).
     */
    max: number | null;
    /**
     * 设置selections数据 (if supported by element).
     */
    selections: any;
    /**
     * 设置正则验证数据 (if supported by element).
     */
    pattern: RegExp | string;
    /**
     * 设置config数据 (if supported by element).
     */
    config: object | null;
    /**
     * 设置multiple数据 (if supported by element).
     */
    multiple: boolean;
    /**
     * 设置maxlength数据 (if supported by element).
     */
    maxlength: number | null;
    /**
     * 设置maxlength数据 (if supported by element).
     */
    selectionParams: any;
    /**
     * 设置controls数据 (if supported by element).
     */
    controls: any;
    childElement: MhDynamicElementDirective;
    _flex: number;
    flex: any;
    readonly maxAttr: any;
    readonly minAttr: any;
    constructor(_componentFactoryResolver: ComponentFactoryResolver, _dynamicFormsService: MhDynamicFormService);
    ngOnInit(): void;
    /**
     * Implemented as part of ControlValueAccessor.
     */
    registerOnModelChange(fn: any): void;
    onModelChange: (_: any) => any;
}
