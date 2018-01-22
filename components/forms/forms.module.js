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
var index_1 = require("../../services/index");
var index_2 = require("./dynamic-form/index");
var index_3 = require("./step-form/index");
var index_4 = require("./search-form/index");
var forms_service_1 = require("./forms.service");
var MhFormsModule = /** @class */ (function () {
    function MhFormsModule() {
    }
    MhFormsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                material_1.MatDialogModule,
                index_2.MhDynamicFormModule,
                index_3.MhStepFormModule,
                index_4.MhSearchFormModule,
            ],
            exports: [
                index_2.MhDynamicFormModule,
                index_3.MhStepFormModule,
                index_4.MhSearchFormModule,
            ],
            providers: [
                forms_service_1.MhFormsService,
                index_1.ToolService,
            ]
        })
    ], MhFormsModule);
    return MhFormsModule;
}());
exports.MhFormsModule = MhFormsModule;
