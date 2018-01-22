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
var core_2 = require("@covalent/core");
var material_1 = require("@angular/material");
var table_entry_component_1 = require("./table-entry.component");
var table_service_1 = require("./table.service");
var table_component_1 = require("./table.component");
var MhTableModule = /** @class */ (function () {
    function MhTableModule() {
    }
    MhTableModule = __decorate([
        core_1.NgModule({
            imports: [
                material_1.MatDialogModule,
                common_1.CommonModule,
                core_2.CovalentDataTableModule,
                core_2.CovalentPagingModule,
                core_2.CovalentSearchModule,
                material_1.MatListModule,
                material_1.MatButtonModule,
                forms_1.FormsModule,
                material_1.MatIconModule,
                material_1.MatSelectModule,
            ],
            declarations: [
                table_entry_component_1.TableEntryComponent,
                table_component_1.MhTableComponent
            ],
            exports: [table_component_1.MhTableComponent],
            entryComponents: [table_entry_component_1.TableEntryComponent],
            providers: [table_service_1.TableService]
        })
    ], MhTableModule);
    return MhTableModule;
}());
exports.MhTableModule = MhTableModule;
