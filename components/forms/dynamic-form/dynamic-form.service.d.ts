import { ValidatorFn, AsyncValidatorFn, FormControl } from '@angular/forms';
import { MhDynamicFormElement, MhDynamicFormType, MhDynamicFormElementConfig } from './dynamic-form.entity';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MhDynamicLoaderService } from './dynamic-loader.service';
export declare const DYNAMIC_ELEMENT_NAME_REGEX: RegExp;
export declare class MhDynamicFormService {
    private dynamicLoaderService;
    subject: Subject<any>;
    constructor(dynamicLoaderService: MhDynamicLoaderService);
    registerChange(): Observable<any>;
    /**
     * 此方法会验证动态表单元素 [name] 是否有效.
     * 如果验证不通过将会抛出异常.
     */
    validateDynamicElementName(name: string): void;
    /**
     * 从 [type] 中获取渲染的动态表单元素
     * [MhDynamicFormElement | MhDynamicFormType]
     * 如果遇到不存在或者不支持的类型将会抛出异常.
     */
    getDynamicElement(element: MhDynamicFormElement | MhDynamicFormType | string): any;
    /**
     * 获取表单元素默认的flex属性
     * [MhDynamicFormElement | MhDynamicFormType].
     * 如果遇到不存在或者不支持的类型将会抛出异常.
     */
    getDefaultElementFlex(element: MhDynamicFormElement | MhDynamicFormType | string): any;
    /**
     * 从 [MhDynamicFormElementConfig] 创建动态表单元素.
     */
    createFormControl(config: MhDynamicFormElementConfig): FormControl;
    /**
     * 从 [MhDynamicFormElementConfig] 创建动态表单校验器.
     */
    createValidators(config: MhDynamicFormElementConfig): ValidatorFn | null;
    asyncValidator(config: any): AsyncValidatorFn;
}
