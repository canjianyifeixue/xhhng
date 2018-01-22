/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CovalentDataTableModule, CovalentSearchModule, CovalentPagingModule, } from "@covalent/core";
import { MatIconModule, MatCardModule, MatDialogModule, MatButtonModule, MatSelectModule, MatListModule, } from "@angular/material";
import { MhFormsModule } from "../forms/index";
import { MhServicesModule } from "../../services/index";
import { MhTaskComponent } from "./task.component";
import { TaskFormComponent } from "./task-form.component";
import { TaskService } from "./task.service";
var MhTaskModule = (function () {
    function MhTaskModule() {
    }
    MhTaskModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        MatIconModule,
                        MatCardModule,
                        MatButtonModule,
                        MatDialogModule,
                        CovalentDataTableModule,
                        CovalentSearchModule,
                        CovalentPagingModule,
                        MhFormsModule,
                        MhServicesModule,
                        MatSelectModule,
                        MatListModule,
                    ],
                    declarations: [
                        MhTaskComponent,
                        TaskFormComponent
                    ],
                    exports: [
                        MhTaskComponent
                    ],
                    providers: [TaskService]
                },] },
    ];
    /** @nocollapse */
    MhTaskModule.ctorParameters = function () { return []; };
    return MhTaskModule;
}());
export { MhTaskModule };
function MhTaskModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhTaskModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhTaskModule.ctorParameters;
}
