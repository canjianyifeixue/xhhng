"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var core_2 = require("@covalent/core");
var month_view_component_1 = require("./month-view.component");
var week_view_component_1 = require("./week-view.component");
var week_entry_component_1 = require("./week-entry.component");
var calendar_service_1 = require("./calendar.service");
var confirm_entry_component_1 = require("./confirm-entry.component");
var MhCalendarModule = /** @class */ (function () {
    function MhCalendarModule() {
    }
    MhCalendarModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MatGridListModule,
                material_1.MatButtonModule,
                material_1.MatSlideToggleModule,
                material_1.MatInputModule,
                material_1.MatDatepickerModule,
                material_1.MatCheckboxModule,
                material_1.MatIconModule,
                material_1.MatTooltipModule,
                material_1.MatMenuModule,
                core_2.CovalentPagingModule,
                material_1.MatListModule,
                material_1.MatSelectModule,
                material_1.MatDialogModule,
            ],
            declarations: [
                month_view_component_1.MonthViewComponent,
                week_view_component_1.WeekViewComponent,
                week_entry_component_1.WeekEntryComponent,
                confirm_entry_component_1.ConfirmEntryComponent,
            ],
            entryComponents: [
                week_entry_component_1.WeekEntryComponent,
                confirm_entry_component_1.ConfirmEntryComponent,
            ],
            exports: [
                month_view_component_1.MonthViewComponent,
                week_view_component_1.WeekViewComponent,
            ],
            providers: [
                calendar_service_1.MhCalendarService
            ]
        })
    ], MhCalendarModule);
    return MhCalendarModule;
}());
exports.MhCalendarModule = MhCalendarModule;
