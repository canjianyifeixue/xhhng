import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
export declare class MhFormsService {
    private dialog;
    constructor(dialog: MatDialog);
    /**
     * 打开动态表单
     * elements:动态表单ID
     * default:动态表单默认值(属性数等于组件数)
     * @param opt
     *
     */
    openDynamicForm(opt: {
        elements: any;
        default?: any;
        title?: string;
        showActions?: boolean;
        width?: string;
    }): Observable<any>;
    /**
     * 打开步骤表单
     * @param opt
     */
    openStepForm(opt: {
        forms: any;
        default?: any;
        title?: string;
        showActions?: boolean;
        width?: string;
    }): Observable<any>;
    /**
     * 打开查询表单
     * @param opt
     */
    openSearchForm(opt: {
        elements: any;
        default?: any;
        title?: string;
        showActions?: boolean;
        width?: string;
    }): Observable<any>;
}
