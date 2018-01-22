import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { TdLoadingService } from '@covalent/core';
import { HttpService } from '../../services/index';
export declare class MhFileService {
    private dialog;
    private httpService;
    private loadingService;
    constructor(dialog: MatDialog, httpService: HttpService, loadingService: TdLoadingService);
    /**
     * 检测数据中是否包含文件属性
     * 一般用于动态表单中验证图片上传
     * @param data 所验证的数据
     */
    checkUploadData(data: any): Observable<any>;
    /**
     * 文件上传方法
     * @param files 所选择的文件
     */
    upload(files: any): Observable<any>;
    /**
     * excel导入数据
     * @param templateId 模板ID
     * @param url  可选导入url(一般不填)
     */
    import(templateId: string, url?: string): Observable<any>;
    /**
     * 导出excel数据
     */
    exportXlsx(name: string, datasourceId: string, query: any, data: any, columns: any): Observable<any>;
    /**
     * 导出html为pdf
     */
    exportPDF(element: HTMLElement, filename: string): Observable<any>;
}
