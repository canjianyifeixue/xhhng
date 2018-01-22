/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatDialogModule, } from "@angular/material";
import { SearchFormComponent } from "./search-form.component";
import { SearchEntryComponent } from "./search-entry.component";
var MhSearchFormModule = (function () {
    function MhSearchFormModule() {
    }
    MhSearchFormModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        MatCheckboxModule,
                        MatInputModule,
                        MatSelectModule,
                        MatDatepickerModule,
                        MatDialogModule,
                    ],
                    exports: [SearchFormComponent],
                    declarations: [SearchFormComponent, SearchEntryComponent],
                    entryComponents: [SearchEntryComponent]
                },] },
    ];
    /** @nocollapse */
    MhSearchFormModule.ctorParameters = function () { return []; };
    return MhSearchFormModule;
}());
export { MhSearchFormModule };
function MhSearchFormModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhSearchFormModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhSearchFormModule.ctorParameters;
}
