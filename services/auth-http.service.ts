import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as URI from 'urijs';
import { moment } from '../util/moment';
import { NotificationService } from './notification.service';

/**
 *  封装AuthHttp请求方法
 */
@Injectable()
export class AuthHttpService {

  constructor(
    private http: Http,
    private notificationService: NotificationService,
    @Inject('api') public api: string,
    @Inject('authError') public authError: Function,
    @Inject('token') public token: string,
  ) { }

  /**
   * get请求方法
   * @param url  请求路径
   * @param options  请求参数(例如headers)
   */
  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.http.get(`${this.api}${url}`, options)
      .map((res: Response) => res.json())
      .filter(this.filterStatus)
      .map((json: any) => json.data)
      .catch(this.handleError);
  }

  /**
   * post请求方法
   * @param url  请求路径
   * @param data  body对象
   */
  public post(url: string, data: object): Observable<any> {
    return this.http.post(this.getTimestampUrl(`${this.api}${url}`), data)
      .map((res: Response) => res.json())
      .filter(this.filterStatus)
      .map((json: any) => json.data)
      .catch(this.handleError);
  }

  /**
   * put请求方法
   * @param url  请求路径
   * @param data  body对象
   */
  public put(url: string, data: any) {
    return this.http.put(`${this.api}${url}`, data)
      .map((res: Response) => res.json())
      .filter(this.filterStatus)
      .map((json: any) => json.data)
      .catch(this.handleError);
  }

  /**
   * patch请求方法
   * @param url 请求路径
   * @param data body对象
   */
  public patch(url: string, data: any) {
    return this.http.patch(this.getTimestampUrl(`${this.api}${url}`), data)
      .map((res: Response) => res.json())
      .filter(this.filterStatus)
      .map((json: any) => json.data)
      .catch(this.handleError);
  }

  /**
   * delete请求方法
   * @param url 请求路径
   * @param options 请求参数(例如headers)
   */
  public delete(url: string, options?: RequestOptionsArgs) {
    return this.http.delete(`${this.api}${url}`, options)
      .map((res: Response) => res.json())
      .filter(this.filterStatus)
      .map((json: any) => json.data)
      .catch(this.handleError);
  }

  /**
   * 文件下载方法
   * @param url 文件路径
   * @param name 文件名
   * @param download 是否直接弹出下载界面
   */
  public download(url: string, name?: string, download = true): Observable<any> {
    let fileName = '';
    if (/\./.test(url)) {
      const arr = url.split('/');
      fileName = arr[arr.length - 1];
    }
    if (name) { fileName = name; }
    return this.http.get(`${this.api}${url}`, { responseType: ResponseContentType.Blob })
      .map((res: any) => {
        const blob = res.blob();
        if (download) {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          window.URL.revokeObjectURL(link.href);
        }
        return { name: fileName, blob };
      })
      .catch(this.handleError);
  }

  private filterStatus = (data: any): boolean => {
    if (data.status === 1) {
      return true;
    } else if (data.message) {
      this.notificationService.error(data.message);
    }
    return false;
  }

  /**
   * 捕获token过期异常
   */
  private handleError = (error: Response): Observable<Error> => {
    if (error.status === 401) {
      this.authError(error);
    }
    return Observable.throw(error);
  }

  private getTimestampUrl(url: string): string {
    const uri = new URI(url);
    uri.addQuery(`timestamp=${moment().valueOf()}`);
    return uri.valueOf();
  }
}
