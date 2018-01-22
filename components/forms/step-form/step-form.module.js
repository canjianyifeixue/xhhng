/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule, MatButtonModule, MatDialogModule, } from "@angular/material";
import { CovalentStepsModule, CovalentCommonModule, } from "@covalent/core";
import { MhDynamicFormModule } from "../dynamic-form/index";
import { MhStepFormComponent } from "./step-form.component";
import { StepEntryComponent } from "./step-entry.component";
var MhStepFormModule = (function () {
    function MhStepFormModule() {
    }
    MhStepFormModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        CovalentCommonModule,
                        CovalentStepsModule,
                        MatIconModule,
                        MatButtonModule,
                        MhDynamicFormModule,
                        MatDialogModule,
                    ],
                    exports: [MhStepFormComponent, StepEntryComponent],
                    declarations: [MhStepFormComponent, StepEntryComponent],
                    entryComponents: [StepEntryComponent]
                },] },
    ];
    /** @nocollapse */
    MhStepFormModule.ctorParameters = function () { return []; };
    return MhStepFormModule;
}());
export { MhStepFormModule };
function MhStepFormModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhStepFormModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhStepFormModule.ctorParameters;
}
