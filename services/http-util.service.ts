import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Rx';
import { jsesc } from '../util/jsesc';

@Injectable()
export class HttpUtilService {

  public actUrl = '/platform/workflow/activiti';
  public bizUrl = '/platform/workflow/act-biz';

  constructor(
    private httpService: HttpService,
  ) { }

  /**
   * 根据数据源ID获取数据
   * @param id ID
   * @param query 参数对象(查询参数)
   */
  public getTableData(id: string, query?: any): Observable<any> {
    return this.httpService.get(`/platform/data/datasource/preview/${id}`, { params: query });
  }

  /**
   * 根据数据字典ID获取数据
   * @param id ID
   * @param query 参数对象(查询参数)
   */
  public getDictionaryData(id: string, query?: any): Observable<any> {
    return this.httpService.get(`/platform/data/data-dictionary/preview/${id}`);
  }

  /**
   * 根据模板ID生成excel模板
   * @param id ID(模板ID)
   */
  public genTemplate(id: string): Observable<any> {
    return this.httpService.get(`/public/file/template/${id}`)
      .map((_: any) => _.path)
      .flatMap((_: any) => this.httpService.download(_));
  }

  /**
   * 启动流程接口
   */
  public startProcess(
    processKey: string, data: { [key: string]: any }, bizId = '', processVar: any = null
  ): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('user') || `{id:null}`).id;
    const form = data;
    let processData = {};
    const returnData: { [key: string]: any } = {};
    for (const key of Object.keys(data)) {
      processData = Object.assign(processData, data[key]);
    }
    processData = Object.assign(processData, processVar);
    const formData = {
      userId,
      processDefinitionKey: processKey,
      businessKey: bizId,
      formData: JSON.stringify(processData)
    };
    return this.httpService.post(`${this.actUrl}/runtime/start`, formData)
      .flatMap((_: any) => {
        returnData['instanceId'] = _.instanceId;
        return this.httpService.post(`${this.bizUrl}/process`, {
          key: processKey,
          instanceId: _.instanceId,
          bizId,
          description: null,
          state: '启动流程',
          processVar: JSON.stringify(processVar),
          processData: JSON.stringify(form)
        });
      }).map((_: any) => returnData);
  }

  /**
   * 完成任务接口
   */
  public completeTask(row: any, data: any): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('user') || `{id:null}`).id;
    let processData = {};
    let bizFormData = {};
    return this.httpService.get(`${this.bizUrl}/process/${row.processInstanceId}`).flatMap((_: any) => {
      _.processData = JSON.parse(jsesc(_.processData));
      if (data.formData) {
        for (const key of Object.keys(data.formData)) {
          processData = Object.assign(processData, data.formData[key]);
        }
        bizFormData = data.formData;
        delete data['formData'];
      } else {
        for (const key of Object.keys(_.processData)) {
          processData = Object.assign(processData, _.processData[key]);
        }
      }
      processData = Object.assign(processData, data);
      const formData = {
        userId,
        taskId: row.id,
        processInstanceId: row.processInstanceId,
        formData: JSON.stringify(processData)
      };
      return this.httpService.post(`${this.actUrl}/runtime/task/find/complete`, formData)
        .flatMap((__: any) => {
          const v = {
            taskId: row.id,
            state: row.name,
            processVar: JSON.stringify(data),
            processData: JSON.stringify(bizFormData ? bizFormData : _.processData)
          };
          let action$ = this.httpService.patch(`${this.bizUrl}/process/${row.processInstanceId}`, v);
          if (__.isFinish === true || __.isFinish === 'true') {
            action$ = action$.flatMap(
              () => this.httpService.delete(`${this.bizUrl}/process/${row.processInstanceId}`,
                { params: JSON.parse(v.processVar) }));
          }
          return action$;
        });
    });
  }

  /**
   * 创建子组织架构
   * @param userId 用户id
   * @param data 组织架构信息
   */
  public addSubOrganization(userId: string, data: {
    name: string, address: string, contact: string,
    mobile: string, parentId: string, newRole: string
  }): Observable<any> {
    return this.httpService.post(`/platform/system/organization/sub/${userId}`, data);
  }
}
