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
var material_1 = require("@angular/material");
var core_2 = require("@covalent/core");
var index_1 = require("../dynamic-form/index");
var step_form_component_1 = require("./step-form.component");
var step_entry_component_1 = require("./step-entry.component");
var MhStepFormModule = /** @class */ (function () {
    function MhStepFormModule() {
    }
    MhStepFormModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                core_2.CovalentCommonModule,
                core_2.CovalentStepsModule,
                material_1.MatIconModule,
                material_1.MatButtonModule,
                index_1.MhDynamicFormModule,
                material_1.MatDialogModule,
            ],
            exports: [step_form_component_1.MhStepFormComponent, step_entry_component_1.StepEntryComponent],
            declarations: [step_form_component_1.MhStepFormComponent, step_entry_component_1.StepEntryComponent],
            entryComponents: [step_entry_component_1.StepEntryComponent]
        })
    ], MhStepFormModule);
    return MhStepFormModule;
}());
exports.MhStepFormModule = MhStepFormModule;
