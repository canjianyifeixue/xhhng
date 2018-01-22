import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { NotificationService } from './notification.service';
/**
 *  封装Http请求方法
 */
export declare class HttpService {
    private http;
    private notificationService;
    api: string;
    constructor(http: Http, notificationService: NotificationService, api: string);
    /**
     * get请求方法
     * @param url  请求路径
     * @param options  请求参数(例如headers)
     */
    get(url: string, options?: RequestOptionsArgs): Observable<any>;
    /**
     * post请求方法
     * @param url  请求路径
     * @param data  body对象
     */
    post(url: string, data: object): Observable<any>;
    /**
     * put请求方法
     * @param url  请求路径
     * @param data  body对象
     */
    put(url: string, data: any): any;
    /**
     * patch请求方法
     * @param url 请求路径
     * @param data body对象
     */
    patch(url: string, data: any): any;
    /**
     * delete请求方法
     * @param url 请求路径
     * @param options 请求参数(例如headers)
     */
    delete(url: string, options?: RequestOptionsArgs): any;
    /**
     * 文件下载方法
     * @param url 文件路径
     * @param name 文件名
     * @param download 是否直接弹出下载界面
     */
    download(url: string, name?: string, download?: boolean): Observable<any>;
    private filterStatus;
    private handleError;
    private getTimestampUrl(url);
}
