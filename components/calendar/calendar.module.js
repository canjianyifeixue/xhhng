/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatGridListModule, MatButtonModule, MatSlideToggleModule, MatInputModule, MatDatepickerModule, MatCheckboxModule, MatIconModule, MatTooltipModule, MatMenuModule, MatListModule, MatSelectModule, MatDialogModule, } from "@angular/material";
import { CovalentPagingModule } from "@covalent/core";
import { MonthViewComponent } from "./month-view.component";
import { WeekViewComponent } from "./week-view.component";
import { WeekEntryComponent } from "./week-entry.component";
import { MhCalendarService } from "./calendar.service";
import { ConfirmEntryComponent } from "./confirm-entry.component";
var MhCalendarModule = (function () {
    function MhCalendarModule() {
    }
    MhCalendarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        MatGridListModule,
                        MatButtonModule,
                        MatSlideToggleModule,
                        MatInputModule,
                        MatDatepickerModule,
                        MatCheckboxModule,
                        MatIconModule,
                        MatTooltipModule,
                        MatMenuModule,
                        CovalentPagingModule,
                        MatListModule,
                        MatSelectModule,
                        MatDialogModule,
                    ],
                    declarations: [
                        MonthViewComponent,
                        WeekViewComponent,
                        WeekEntryComponent,
                        ConfirmEntryComponent,
                    ],
                    entryComponents: [
                        WeekEntryComponent,
                        ConfirmEntryComponent,
                    ],
                    exports: [
                        MonthViewComponent,
                        WeekViewComponent,
                    ],
                    providers: [
                        MhCalendarService
                    ]
                },] },
    ];
    /** @nocollapse */
    MhCalendarModule.ctorParameters = function () { return []; };
    return MhCalendarModule;
}());
export { MhCalendarModule };
function MhCalendarModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhCalendarModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhCalendarModule.ctorParameters;
}
