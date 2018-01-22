import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { TdLoadingService } from '@covalent/core';
import { html2canvas } from '../../util/html2canvas';
import { jspdf as jsPDF } from '../../util/jspdf';

import { HttpService } from '../../services/index';

import { UploadDialogComponent } from './upload-dialog.component';
import { ImportDialogComponent } from './import-dialog.component';
import { ExportDialogComponent } from './export-dialog.component';

@Injectable()
export class MhFileService {

  constructor(
    private dialog: MatDialog,
    private httpService: HttpService,
    private loadingService: TdLoadingService,
  ) { }

  /**
   * 检测数据中是否包含文件属性
   * 一般用于动态表单中验证图片上传
   * @param data 所验证的数据
   */
  public checkUploadData(data: any): Observable<any> {
    const fileObj: any = {};
    for (const key of Object.keys(data)) {
      const v = data[key];
      if (v instanceof File) {
        fileObj[key] = v;
      } else if (v instanceof FileList) {
        let fileList: File[] = [];
        for (let i = 0; i < v.length; i++) {
          fileList = [...fileList, v.item(i)];
        }
        fileObj[key] = fileList;
      }
    }
    if (Object.keys(fileObj).length > 0) {
      return this.upload(fileObj).map((form: any) => Object.assign({}, data, form));
    } else {
      return Observable.create((sub: any) => {
        sub.next(data);
        sub.complete();
      });
    }

  }

  /**
   * 文件上传方法
   * @param files 所选择的文件
   */
  public upload(files: any): Observable<any> {
    return this.dialog.open(UploadDialogComponent, {
      disableClose: true,
      width: '70%',
      data: files
    }).afterClosed().filter((_: any) => _);
  }

  /**
   * excel导入数据
   * @param templateId 模板ID
   * @param url  可选导入url(一般不填)
   */
  public import(templateId: string, url?: string): Observable<any> {
    this.loadingService.register('loading');
    return this.dialog.open(ImportDialogComponent, {
      disableClose: true,
      width: '70%',
      data: {
        id: templateId,
        url: url || '/public/file/import'
      }
    }).afterClosed().filter((_: any) => _);
  }

  /**
   * 导出excel数据
   */
  public exportXlsx(name: string, datasourceId: string, query: any, data: any, columns: any): Observable<any> {
    return this.dialog.open(ExportDialogComponent, {
      width: '70%',
      data: {
        data,
        columns,
      }
    }).afterClosed().filter((_: any) => _)
      .flatMap((_: any) => this.httpService.post(`/public/file/export`, {
        datasourceId,
        query,
        columns: _,
        name
      })).map((_: any) => _.path).flatMap((_: any) => this.httpService.download(_));
  }

  /**
   * 导出html为pdf
   */
  public exportPDF(element: HTMLElement, filename: string): Observable<any> {
    if (!/\.pdf$/.test(filename)) { filename += '.pdf'; }
    return Observable.fromPromise(html2canvas(element))
      .map((canvas: any) => {
        const imgData = canvas.toDataURL('img/notice/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 20, 20);
        pdf.save(filename);
        return filename;
      });
  }

}
