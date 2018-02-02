"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * 封装各种消息推送方法
 */
var NotificationService = /** @class */ (function () {
    function NotificationService(snackBar, dialogService) {
        this.snackBar = snackBar;
        this.dialogService = dialogService;
        // this._snackBarConfig = new MatSnackBarConfig();
        // this._snackBarConfig.duration = 4000;
        // Notification.requestPermission().then((_: any) => {
        //   if (_ === 'denied') { throw new Error('目前无法接收任何通知'); }
        // });
    }
    NotificationService.prototype.success = function (message) {
        this.open(message, ['bgc-green-A700']);
    };
    NotificationService.prototype.error = function (message) {
        this.open(message, ['bgc-red-A700']);
    };
    NotificationService.prototype.warn = function (message) {
        this.open(message, ['bgc-yellow-A700', 'tc-grey-900']);
    };
    NotificationService.prototype.info = function (message) {
        this.open(message, ['bgc-blue-A700']);
    };
    /**
     * 是否确认删除弹窗方法
     * @param title          显示标题
     * @param acceptButton   确认按钮
     * @param cancelButton   取消按钮
     */
    NotificationService.prototype.confirmDelete = function (title, acceptButton, cancelButton) {
        if (title === void 0) { title = '请确认'; }
        if (acceptButton === void 0) { acceptButton = '确定'; }
        if (cancelButton === void 0) { cancelButton = '取消'; }
        return this.confirm('确定要删除这条记录?', title, acceptButton, cancelButton).filter(function (_) { return _; });
    };
    /**
     * 自定义提醒弹窗内容
     * @param message
     * @param title
     * @param acceptButton
     * @param cancelButton
     * @param disableClose
     */
    NotificationService.prototype.confirm = function (message, title, acceptButton, cancelButton, disableClose) {
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
     * @param message   提示的未完成的内容
     * @param value
     * @param title
     * @param acceptButton
     * @param cancelButton
     */
    NotificationService.prototype.prompt = function (message, value, title, acceptButton, cancelButton) {
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
    NotificationService = __decorate([
        core_1.Injectable()
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
