/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { TdDialogService } from "@covalent/core";
/**
 * 封装各种消息推送方法
 */
var NotificationService = (function () {
    function NotificationService(snackBar, dialogService) {
        this.snackBar = snackBar;
        this.dialogService = dialogService;
        this._snackBarConfig = new MatSnackBarConfig();
        this._snackBarConfig.duration = 4000;
        Notification.requestPermission().then(function (_) {
            if (_ === 'denied') {
                throw new Error('目前无法接收任何通知');
            }
        });
    }
    /**
     * @param {?} message
     * @return {?}
     */
    NotificationService.prototype.success = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.open(message, ['bgc-green-A700']);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    NotificationService.prototype.error = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.open(message, ['bgc-red-A700']);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    NotificationService.prototype.warn = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.open(message, ['bgc-yellow-A700', 'tc-grey-900']);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    NotificationService.prototype.info = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.open(message, ['bgc-blue-A700']);
    };
    /**
     * 是否确认删除弹窗方法
     * @param {?=} title          显示标题
     * @param {?=} acceptButton   确认按钮
     * @param {?=} cancelButton   取消按钮
     * @return {?}
     */
    NotificationService.prototype.confirmDelete = /**
     * 是否确认删除弹窗方法
     * @param {?=} title          显示标题
     * @param {?=} acceptButton   确认按钮
     * @param {?=} cancelButton   取消按钮
     * @return {?}
     */
    function (title, acceptButton, cancelButton) {
        if (title === void 0) { title = '请确认'; }
        if (acceptButton === void 0) { acceptButton = '确定'; }
        if (cancelButton === void 0) { cancelButton = '取消'; }
        return this.confirm('确定要删除这条记录?', title, acceptButton, cancelButton).filter(function (_) { return _; });
    };
    /**
     * 自定义提醒弹窗内容
     * @param {?} message
     * @param {?=} title
     * @param {?=} acceptButton
     * @param {?=} cancelButton
     * @param {?=} disableClose
     * @return {?}
     */
    NotificationService.prototype.confirm = /**
     * 自定义提醒弹窗内容
     * @param {?} message
     * @param {?=} title
     * @param {?=} acceptButton
     * @param {?=} cancelButton
     * @param {?=} disableClose
     * @return {?}
     */
    function (message, title, acceptButton, cancelButton, disableClose) {
        if (title === void 0) { title = '温馨提示'; }
        if (acceptButton === void 0) { acceptButton = '确定'; }
        if (cancelButton === void 0) { cancelButton = '取消'; }
        if (disableClose === void 0) { disableClose = false; }
        return this.dialogService.openConfirm({
            message: message,
            disableClose: disableClose,
            title: title,
            acceptButton: acceptButton,
            cancelButton: cancelButton,
        }).afterClosed();
    };
    /**
     * 用于提示还未完成的操作内容
     * @param {?} message   提示的未完成的内容
     * @param {?=} value
     * @param {?=} title
     * @param {?=} acceptButton
     * @param {?=} cancelButton
     * @return {?}
     */
    NotificationService.prototype.prompt = /**
     * 用于提示还未完成的操作内容
     * @param {?} message   提示的未完成的内容
     * @param {?=} value
     * @param {?=} title
     * @param {?=} acceptButton
     * @param {?=} cancelButton
     * @return {?}
     */
    function (message, value, title, acceptButton, cancelButton) {
        if (value === void 0) { value = ''; }
        if (title === void 0) { title = '请补充'; }
        if (acceptButton === void 0) { acceptButton = '确定'; }
        if (cancelButton === void 0) { cancelButton = '取消'; }
        return this.dialogService.openPrompt({
            message: message,
            disableClose: false,
            title: title,
            value: value,
            cancelButton: cancelButton,
            acceptButton: acceptButton,
        }).afterClosed();
    };
    /**
     *  弹出通知
     * @param {?} title  显示标题
     * @param {?=} body   内容
     * @param {?=} icon   图标
     * @param {?=} click  点击事件的回调
     * @return {?}
     */
    NotificationService.prototype.notify = /**
     *  弹出通知
     * @param {?} title  显示标题
     * @param {?=} body   内容
     * @param {?=} icon   图标
     * @param {?=} click  点击事件的回调
     * @return {?}
     */
    function (title, body, icon, click) {
        var /** @type {?} */ payload = new Notification(title, {
            body: body,
            icon: icon || 'assets/img/favicon.png'
        });
        if (click) {
            payload.onclick = function (e) {
                click(e);
                payload.close();
            };
        }
    };
    /**
     * @param {?} message
     * @param {?} cssClass
     * @return {?}
     */
    NotificationService.prototype.open = /**
     * @param {?} message
     * @param {?} cssClass
     * @return {?}
     */
    function (message, cssClass) {
        this._snackBarConfig.extraClasses = cssClass;
        this.snackBar.open(message, '关闭', this._snackBarConfig);
    };
    NotificationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NotificationService.ctorParameters = function () { return [
        { type: MatSnackBar, },
        { type: TdDialogService, },
    ]; };
    return NotificationService;
}());
export { NotificationService };
function NotificationService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NotificationService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NotificationService.ctorParameters;
    /** @type {?} */
    NotificationService.prototype._snackBarConfig;
    /** @type {?} */
    NotificationService.prototype.snackBar;
    /** @type {?} */
    NotificationService.prototype.dialogService;
}
