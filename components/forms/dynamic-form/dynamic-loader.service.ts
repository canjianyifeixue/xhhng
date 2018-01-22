import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MhDynamicLoaderService {

  constructor(
    @Inject('http') private http: any,
  ) { }

  /**
   * 获取表单中的元素
   */
  public loadElements(id: string): Observable<any> {
    return this.http.get(`/platform/form/biz-form/${id}`)
      .map((res: any) => res.controls);
  }

  /**
   * 获取表单设计器中数据源，数据字典，数据表单列表
   */
  public loadOptions(): Observable<any> {
    const datasource$ = this.http.get(`/platform/data/datasource`);
    const dictionary$ = this.http.get(`/platform/data/data-dictionary`);
    const dataform$ = this.http.get(`/platform/form/data-form`);

    return Observable.combineLatest(datasource$, dictionary$, dataform$, (s, d, f) => {
      return {
        datasource: s,
        dictionary: d,
        dataform: f
      };
    });
  }

  /**
   * 加载字典，数据源，表单详细信息
   */
  public loadSelections(selections: any, type: any, selectionParams?: any): Observable<any> {
    const selections$ = Observable.of(selections);
    if (typeof selections !== 'string') {
      return selections$;
    }
    let url = '';
    switch (type) {
      case 'checkbox-group':
      case 'chips':
      case 'radio':
      case 'select':
      case 'tree-select':
      case 'cascad-select':
        url = `/platform/data/data-dictionary/preview/${selections}`;
        break;
      case 'dialog-select':
      case 'data-form':
        url = `/platform/data/datasource/preview/${selections}`;
        break;
      default:
        return selections$;
    }
    if (selectionParams) {
      return this.http.get(url, { params: selectionParams });
    } else {
      return this.http.get(url);
    }
  }

  /**
   * 加载字典，数据源，表单详细信息
   */
  public loadControls(controls: any, type: any): Observable<any> {
    const controls$ = Observable.of(controls);
    if (typeof controls !== 'string') {
      return controls$;
    }
    let url = '';
    switch (type) {
      case 'data-form':
        url = `/platform/form/data-form/${controls}`;
        break;
      default:
        return controls$;
    }
    return this.http.get(url).map((data: any) => data.controls);
  }

  /**
   * 加载文件信息
   */
  public loadFiles(value: any): Observable<any> {
    const value$ = Observable.of(value);
    if (typeof value !== 'string') {
      return value$;
    }
    const url = `/public/file/${value}`;
    return this.http.get(url).map((data: any) => data);
  }

  /**
   * 加载文件信息
   */
  public download(url: string): Observable<any> {
    return this.http.download(url);
  }

  /**
   * 调用后端验证接口
   */
  public validate(url: string, value: any): Observable<any> {
    return this.http.post(url, { value });
  }
}
