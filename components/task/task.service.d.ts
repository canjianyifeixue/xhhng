import { HttpService } from '../../services/index';
import { Observable } from 'rxjs/Rx';
export declare class TaskService {
    private httpService;
    actUrl: string;
    bizUrl: string;
    constructor(httpService: HttpService);
    /**
     * 根据key获取流程表单
     */
    getFormByProcessKey(key: string): Observable<any>;
    /**
     * 获取运行中流程数据
     */
    getProcessInfo(instanceId: string): Observable<any>;
    /**
     * 获取当前任务的动态表单
     */
    getDynamicField(taskId: string): Observable<any>;
    /**
     * 完成任务
     */
    completeTask(data: any): Observable<any>;
    /**
     * 更新流程并记录
     */
    updateProcess(instanceId: string, data: any): Observable<any>;
    /**
     * 结束流程并记录
     */
    finishProcess(instanceId: string, processVar?: any): Observable<any>;
    /**
     * 获取待办任务列表
     */
    getTaskList(userId: string, key?: string): Observable<any>;
}
