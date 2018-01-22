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
var ng2_file_upload_1 = require("ng2-file-upload");
var material_1 = require("@angular/material");
var core_2 = require("@covalent/core");
var file_service_1 = require("./file.service");
var upload_dialog_component_1 = require("./upload-dialog.component");
var import_dialog_component_1 = require("./import-dialog.component");
var export_dialog_component_1 = require("./export-dialog.component");
var MhFileModule = /** @class */ (function () {
    function MhFileModule() {
    }
    MhFileModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                ng2_file_upload_1.FileUploadModule,
                material_1.MatInputModule,
                material_1.MatDialogModule,
                material_1.MatProgressBarModule,
                material_1.MatButtonModule,
                material_1.MatIconModule,
                core_2.CovalentFileModule,
                material_1.MatCheckboxModule,
                material_1.MatListModule,
            ],
            exports: [],
            declarations: [
                upload_dialog_component_1.UploadDialogComponent,
                import_dialog_component_1.ImportDialogComponent,
                export_dialog_component_1.ExportDialogComponent,
            ],
            entryComponents: [
                upload_dialog_component_1.UploadDialogComponent,
                import_dialog_component_1.ImportDialogComponent,
                export_dialog_component_1.ExportDialogComponent,
            ],
            providers: [file_service_1.MhFileService]
        })
    ], MhFileModule);
    return MhFileModule;
}());
exports.MhFileModule = MhFileModule;
