import { MatSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
/**
 * 封装各种消息推送方法
 */
export declare class NotificationService {
    private snackBar;
    private dialogService;
    private _snackBarConfig;
    constructor(snackBar: MatSnackBar, dialogService: TdDialogService);
    success(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    /**
     * 是否确认删除弹窗方法
     * @param title          显示标题
     * @param acceptButton   确认按钮
     * @param cancelButton   取消按钮
     */
    confirmDelete(title?: string, acceptButton?: string, cancelButton?: string): Observable<boolean>;
    /**
     * 自定义提醒弹窗内容
     * @param message
     * @param title
     * @param acceptButton
     * @param cancelButton
     * @param disableClose
     */
    confirm(message: string, title?: string, acceptButton?: string, cancelButton?: string, disableClose?: boolean): Observable<boolean>;
    /**
     * 用于提示还未完成的操作内容
     * @param message   提示的未完成的内容
     * @param value
     * @param title
     * @param acceptButton
     * @param cancelButton
     */
    prompt(message: string, value?: string, title?: string, acceptButton?: string, cancelButton?: string): Observable<boolean>;
    /**
     *  弹出通知
     * @param title  显示标题
     * @param body   内容
     * @param icon   图标
     * @param click  点击事件的回调
     */
    private open(message, cssClass);
}
