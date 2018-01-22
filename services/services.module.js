/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { MatSnackBarModule } from "@angular/material";
import { CovalentDialogsModule } from "@covalent/core";
import { HttpService } from "./http.service";
import { HttpUtilService } from "./http-util.service";
import { NotificationService } from "./notification.service";
import { ToolService } from "./tool.service";
var MhServicesModule = (function () {
    function MhServicesModule() {
    }
    /**
     * @param {?} getApi
     * @return {?}
     */
    MhServicesModule.forRoot = /**
     * @param {?} getApi
     * @return {?}
     */
    function (getApi) {
        return {
            ngModule: MhServicesModule,
            providers: [
                { provide: 'api', useFactory: getApi },
                HttpService,
                HttpUtilService,
                NotificationService,
                ToolService,
            ]
        };
    };
    MhServicesModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        HttpModule,
                        MatSnackBarModule,
                        CovalentDialogsModule,
                    ]
                },] },
    ];
    /** @nocollapse */
    MhServicesModule.ctorParameters = function () { return []; };
    return MhServicesModule;
}());
export { MhServicesModule };
function MhServicesModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhServicesModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhServicesModule.ctorParameters;
}
