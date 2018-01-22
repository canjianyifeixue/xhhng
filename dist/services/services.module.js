"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var material_1 = require("@angular/material");
var core_2 = require("@covalent/core");
var http_service_1 = require("./http.service");
var auth_http_service_1 = require("./auth-http.service");
var http_util_service_1 = require("./http-util.service");
var notification_service_1 = require("./notification.service");
var tool_service_1 = require("./tool.service");
var MhServicesModule = /** @class */ (function () {
    function MhServicesModule() {
    }
    MhServicesModule_1 = MhServicesModule;
    MhServicesModule.forRoot = function (getApi) {
        return {
            ngModule: MhServicesModule_1,
            providers: [
                { provide: 'api', useFactory: getApi },
                // { provide: 'token', useFactory: getToken },
                // { provide: 'authError', useValue: authError },
                http_service_1.HttpService,
                auth_http_service_1.AuthHttpService,
                http_util_service_1.HttpUtilService,
                notification_service_1.NotificationService,
                tool_service_1.ToolService,
            ]
        };
    };
    MhServicesModule = MhServicesModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                material_1.MatSnackBarModule,
                core_2.CovalentDialogsModule,
            ]
        })
    ], MhServicesModule);
    return MhServicesModule;
    var MhServicesModule_1;
}());
exports.MhServicesModule = MhServicesModule;
