/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CovalentDataTableModule, CovalentPagingModule, CovalentSearchModule, } from "@covalent/core";
import { MatListModule, MatDialogModule, MatButtonModule, MatIconModule, MatSelectModule, } from "@angular/material";
import { TableEntryComponent } from "./table-entry.component";
import { TableService } from "./table.service";
import { SimpleTableComponent } from "./simple-table.component";
var MhTableModule = (function () {
    function MhTableModule() {
    }
    MhTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        MatDialogModule,
                        CommonModule,
                        CovalentDataTableModule,
                        CovalentPagingModule,
                        CovalentSearchModule,
                        MatListModule,
                        MatButtonModule,
                        FormsModule,
                        MatIconModule,
                        MatSelectModule,
                    ],
                    declarations: [
                        TableEntryComponent,
                        SimpleTableComponent
                    ],
                    exports: [SimpleTableComponent],
                    entryComponents: [TableEntryComponent],
                    providers: [TableService]
                },] },
    ];
    /** @nocollapse */
    MhTableModule.ctorParameters = function () { return []; };
    return MhTableModule;
}());
export { MhTableModule };
function MhTableModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhTableModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhTableModule.ctorParameters;
}
