import { Injectable } from '@angular/core';
import { HttpService } from '../../services/index';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TaskService {

  public actUrl = '/platform/workflow/activiti';
  public bizUrl = '/platform/workflow/act-biz';

  constructor(
    private httpService: HttpService,
  ) { }

  /**
   * 根据key获取流程表单
   */
  public getFormByProcessKey(key: string): Observable<any> {
    return this.httpService.get(`${this.bizUrl}/model-form/${key}`);
  }

  /**
   * 获取运行中流程数据
   */
  public getProcessInfo(instanceId: string): Observable<any> {
    return this.httpService.get(`${this.bizUrl}/process/${instanceId}`);
  }

  /**
   * 获取当前任务的动态表单
   */
  public getDynamicField(taskId: string): Observable<any> {
    return this.httpService.get(`${this.actUrl}/form/dynamic/get-form/task/${taskId}`);
  }

  /**
   * 完成任务
   */
  public completeTask(data: any): Observable<any> {
    return this.httpService.post(`${this.actUrl}/runtime/task/find/complete`, data);
  }

  /**
   * 更新流程并记录
   */
  public updateProcess(instanceId: string, data: any): Observable<any> {
    return this.httpService.patch(`${this.bizUrl}/process/${instanceId}`, data);
  }

  /**
   * 结束流程并记录
   */
  public finishProcess(instanceId: string, processVar?: any): Observable<any> {
    return this.httpService.delete(`${this.bizUrl}/process/${instanceId}`, { params: processVar });
  }

  /**
   * 获取待办任务列表
   */
  public getTaskList(userId: string, key?: string): Observable<any> {
    return this.httpService.get(`${this.bizUrl}/task/${userId}?key=${key}`);
  }

}
