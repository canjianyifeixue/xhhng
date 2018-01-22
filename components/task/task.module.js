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
var index_1 = require("../forms/index");
var index_2 = require("../../services/index");
var task_component_1 = require("./task.component");
var task_form_component_1 = require("./task-form.component");
var task_service_1 = require("./task.service");
var MhTaskModule = /** @class */ (function () {
    function MhTaskModule() {
    }
    MhTaskModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MatIconModule,
                material_1.MatCardModule,
                material_1.MatButtonModule,
                material_1.MatDialogModule,
                core_2.CovalentDataTableModule,
                core_2.CovalentSearchModule,
                core_2.CovalentPagingModule,
                index_1.MhFormsModule,
                index_2.MhServicesModule,
                material_1.MatSelectModule,
                material_1.MatListModule,
            ],
            declarations: [
                task_component_1.MhTaskComponent,
                task_form_component_1.TaskFormComponent
            ],
            exports: [
                task_component_1.MhTaskComponent
            ],
            providers: [task_service_1.TaskService]
        })
    ], MhTaskModule);
    return MhTaskModule;
}());
exports.MhTaskModule = MhTaskModule;
