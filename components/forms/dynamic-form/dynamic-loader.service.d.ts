import { Observable } from 'rxjs/Observable';
export declare class MhDynamicLoaderService {
    private http;
    constructor(http: any);
    /**
     * 获取表单中的元素
     */
    loadElements(id: string): Observable<any>;
    /**
     * 获取表单设计器中数据源，数据字典，数据表单列表
     */
    loadOptions(): Observable<any>;
    /**
     * 加载字典，数据源，表单详细信息
     */
    loadSelections(selections: any, type: any, selectionParams?: any): Observable<any>;
    /**
     * 加载字典，数据源，表单详细信息
     */
    loadControls(controls: any, type: any): Observable<any>;
    /**
     * 加载文件信息
     */
    loadFiles(value: any): Observable<any>;
    /**
     * 加载文件信息
     */
    download(url: string): Observable<any>;
    /**
     * 调用后端验证接口
     */
    validate(url: string, value: any): Observable<any>;
}
