"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var DynamicEntryComponent = /** @class */ (function () {
    function DynamicEntryComponent(dialogData, dialogRef, toolService) {
        this.dialogData = dialogData;
        this.dialogRef = dialogRef;
        this.toolService = toolService;
        this.title = this.dialogData.title || '表单';
        this.elements = this.dialogData.elements || [];
        this.default = this.dialogData.default;
        this.showActions = this.dialogData.showActions === false ? false : true;
    }
    DynamicEntryComponent.prototype.save = function (value) {
        if (this.default) {
            value = this.toolService.filterField(this.default, value);
        }
        this.dialogRef.close(value);
    };
    DynamicEntryComponent.prototype.change = function (data) {
        // nothing to do.
    };
    __decorate([
        core_1.ViewChild('form')
    ], DynamicEntryComponent.prototype, "formRef", void 0);
    DynamicEntryComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-entry',
            templateUrl: './dynamic-entry.component.html',
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], DynamicEntryComponent);
    return DynamicEntryComponent;
}());
exports.DynamicEntryComponent = DynamicEntryComponent;
