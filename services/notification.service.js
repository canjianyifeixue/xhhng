"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NotificationService = /** @class */ (function () {
    function NotificationService(snackBar, dialogService) {
        this.snackBar = snackBar;
        this.dialogService = dialogService;
        this._snackBarConfig = new MdSnackBarConfig();
        this._snackBarConfig.duration = 4000;
        Notification.requestPermission().then(function (_) {
            if (_ === 'denied') {
                console.log('目前无法接收任何通知');
            }
        });
    }
    NotificationService.prototype.open = function (message, cssClass) {
        this._snackBarConfig.extraClasses = cssClass;
        this.snackBar.open(message, '关闭', this._snackBarConfig);
    };
    NotificationService.prototype.success = function (message) {
        this.open(message, ['bgc-green-A700']);
    };
    NotificationService.prototype.error = function (message) {
        this.open(message, ['bgc-red-A700']);
    };
    NotificationService.prototype.warn = function (message) {
        this.open(message, ['bgc-yellow-A700']);
    };
    NotificationService.prototype.info = function (message) {
        this.open(message, ['bgc-blue-A700']);
    };
    NotificationService.prototype.confirmDelete = function (title, acceptButton, cancelButton) {
        if (title === void 0) { title = '请确认'; }
        if (acceptButton === void 0) { acceptButton = '确定'; }
        if (cancelButton === void 0) { cancelButton = '取消'; }
        return this.confirm('确定要删除这条记录?', title, acceptButton, cancelButton).filter(function (_) { return _; });
    };
    NotificationService.prototype.confirm = function (message, title, acceptButton, cancelButton, disableClose) {
        if (title === void 0) { title = '请确认'; }
        if (acceptButton === void 0) { acceptButton = '确定'; }
        if (cancelButton === void 0) { cancelButton = '取消'; }
        if (disableClose === void 0) { disableClose = false; }
        return this.dialogService.openConfirm({
            message: message,
            disableClose: disableClose,
            title: title,
            acceptButton: acceptButton,
            cancelButton: cancelButton,
        }).afterClosed().filter(function (_) { return _; });
    };
    NotificationService.prototype.confirmUnbind = function (title, acceptButton, cancelButton) {
        if (title === void 0) { title = '请确认'; }
        if (acceptButton === void 0) { acceptButton = '确定'; }
        if (cancelButton === void 0) { cancelButton = '取消'; }
        return this.confirm('确定要解除绑定?', title, acceptButton, cancelButton).filter(function (_) { return _; });
    };
    NotificationService.prototype.confirmSub = function (title, acceptButton, cancelButton) {
        if (title === void 0) { title = '请确认'; }
        if (acceptButton === void 0) { acceptButton = '确定'; }
        if (cancelButton === void 0) { cancelButton = '取消'; }
        return this.confirm('确定提交?', title, acceptButton, cancelButton).filter(function (_) { return _; });
    };
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
