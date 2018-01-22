/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material";
import { ToolService } from "../../services/index";
import { MhDynamicFormModule } from "./dynamic-form/index";
import { MhStepFormModule } from "./step-form/index";
import { MhSearchFormModule } from "./search-form/index";
import { MhFormsService } from "./forms.service";
var MhFormsModule = (function () {
    function MhFormsModule() {
    }
    MhFormsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatDialogModule,
                        MhDynamicFormModule,
                        MhStepFormModule,
                        MhSearchFormModule,
                    ],
                    exports: [
                        MhDynamicFormModule,
                        MhStepFormModule,
                        MhSearchFormModule,
                    ],
                    providers: [
                        MhFormsService,
                        ToolService,
                    ]
                },] },
    ];
    /** @nocollapse */
    MhFormsModule.ctorParameters = function () { return []; };
    return MhFormsModule;
}());
export { MhFormsModule };
function MhFormsModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhFormsModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhFormsModule.ctorParameters;
}
