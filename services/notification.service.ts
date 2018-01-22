import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';

/**
 * 封装各种消息推送方法
 */
@Injectable()
export class NotificationService {

  private _snackBarConfig: MatSnackBarConfig;

  constructor(
    private snackBar: MatSnackBar,
    private dialogService: TdDialogService,
  ) {
    this._snackBarConfig = new MatSnackBarConfig();
    this._snackBarConfig.duration = 4000;
    Notification.requestPermission().then((_: any) => {
      if (_ === 'denied') { throw new Error('目前无法接收任何通知'); }
    });
  }

  public success(message: string) {
    this.open(message, ['bgc-green-A700']);
  }

  public error(message: string) {
    this.open(message, ['bgc-red-A700']);
  }

  public warn(message: string) {
    this.open(message, ['bgc-yellow-A700', 'tc-grey-900']);
  }

  public info(message: string) {
    this.open(message, ['bgc-blue-A700']);
  }

  /**
   * 是否确认删除弹窗方法
   * @param title          显示标题
   * @param acceptButton   确认按钮
   * @param cancelButton   取消按钮
   */
  public confirmDelete(title = '请确认', acceptButton = '确定', cancelButton = '取消'): Observable<boolean> {
    return this.confirm('确定要删除这条记录?', title, acceptButton, cancelButton).filter((_: any) => _);
  }

  /**
   * 自定义提醒弹窗内容
   * @param message
   * @param title
   * @param acceptButton
   * @param cancelButton
   * @param disableClose
   */
  public confirm(
    message: string, title = '温馨提示', acceptButton = '确定', cancelButton = '取消', disableClose = false): Observable<boolean> {
    return this.dialogService.openConfirm({
      message,
      disableClose,
      title,
      acceptButton,
      cancelButton,
    }).afterClosed();
  }

  /**
   * 用于提示还未完成的操作内容
   * @param message   提示的未完成的内容
   * @param value
   * @param title
   * @param acceptButton
   * @param cancelButton
   */
  public prompt(message: string, value = '', title = '请补充', acceptButton = '确定', cancelButton = '取消'): Observable<boolean> {
    return this.dialogService.openPrompt({
      message,
      disableClose: false,
      title,
      value,
      cancelButton,
      acceptButton,
    }).afterClosed();
  }

  /**
   *  弹出通知
   * @param title  显示标题
   * @param body   内容
   * @param icon   图标
   * @param click  点击事件的回调
   */
  public notify(title: string, body?: string, icon?: string, click?: (e: Event) => void) {
    const payload = new Notification(title, {
      body,
      icon: icon || 'assets/img/favicon.png'
    });
    if (click) {
      payload.onclick = (e) => {
        click(e);
        payload.close();
      };
    }
  }

  private open(message: string, cssClass: string[]) {
    this._snackBarConfig.extraClasses = cssClass;
    this.snackBar.open(message, '关闭', this._snackBarConfig);
  }
}
