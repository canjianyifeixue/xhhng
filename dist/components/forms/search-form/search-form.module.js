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
var search_form_component_1 = require("./search-form.component");
var search_entry_component_1 = require("./search-entry.component");
var MhSearchFormModule = /** @class */ (function () {
    function MhSearchFormModule() {
    }
    MhSearchFormModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MatCheckboxModule,
                material_1.MatInputModule,
                material_1.MatSelectModule,
                material_1.MatDatepickerModule,
                material_1.MatDialogModule,
            ],
            exports: [search_form_component_1.SearchFormComponent],
            declarations: [search_form_component_1.SearchFormComponent, search_entry_component_1.SearchEntryComponent],
            entryComponents: [search_entry_component_1.SearchEntryComponent]
        })
    ], MhSearchFormModule);
    return MhSearchFormModule;
}());
exports.MhSearchFormModule = MhSearchFormModule;
