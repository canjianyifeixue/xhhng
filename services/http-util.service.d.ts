import { HttpService } from './http.service';
import { Observable } from 'rxjs/Rx';
export declare class HttpUtilService {
    private httpService;
    actUrl: string;
    bizUrl: string;
    constructor(httpService: HttpService);
    /**
     * 根据数据源ID获取数据
     * @param id ID
     * @param query 参数对象(查询参数)
     */
    getTableData(id: string, query?: any): Observable<any>;
    /**
     * 根据数据字典ID获取数据
     * @param id ID
     * @param query 参数对象(查询参数)
     */
    getDictionaryData(id: string, query?: any): Observable<any>;
    /**
     * 根据模板ID生成excel模板
     * @param id ID(模板ID)
     */
    genTemplate(id: string): Observable<any>;
    /**
     * 启动流程接口
     */
    startProcess(processKey: string, data: {
        [key: string]: any;
    }, bizId?: string, processVar?: any): Observable<any>;
    /**
     * 完成任务接口
     */
    completeTask(row: any, data: any): Observable<any>;
    /**
     * 创建子组织架构
     * @param userId 用户id
     * @param data 组织架构信息
     */
    addSubOrganization(userId: string, data: {
        name: string;
        address: string;
        contact: string;
        mobile: string;
        parentId: string;
        newRole: string;
    }): Observable<any>;
}
