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
// import { CovalentCodeEditorModule } from '@covalent/code-editor';
var ng2_dragula_1 = require("ng2-dragula");
var dynamic_date_adapter_1 = require("./dynamic-date-adapter");
var dynamic_form_service_1 = require("./dynamic-form.service");
var dynamic_loader_service_1 = require("./dynamic-loader.service");
var index_1 = require("../../../services/index");
var form_design_component_1 = require("./form-design.component");
var dynamic_form_component_1 = require("./dynamic-form.component");
var dynamic_element_component_1 = require("./dynamic-element.component");
var dynamic_input_component_1 = require("./dynamic-elements/dynamic-input/dynamic-input.component");
var dynamic_checkbox_component_1 = require("./dynamic-elements/dynamic-checkbox/dynamic-checkbox.component");
var dynamic_select_component_1 = require("./dynamic-elements/dynamic-select/dynamic-select.component");
var dynamic_textarea_component_1 = require("./dynamic-elements/dynamic-textarea/dynamic-textarea.component");
var dynamic_slider_component_1 = require("./dynamic-elements/dynamic-slider/dynamic-slider.component");
var dynamic_slide_toggle_component_1 = require("./dynamic-elements/dynamic-slide-toggle/dynamic-slide-toggle.component");
var dynamic_datepicker_component_1 = require("./dynamic-elements/dynamic-datepicker/dynamic-datepicker.component");
var dynamic_checkbox_group_component_1 = require("./dynamic-elements/dynamic-checkbox-group/dynamic-checkbox-group.component");
var dynamic_chips_component_1 = require("./dynamic-elements/dynamic-chips/dynamic-chips.component");
var dynamic_radio_component_1 = require("./dynamic-elements/dynamic-radio/dynamic-radio.component");
var dynamic_dialog_select_component_1 = require("./dynamic-elements/dynamic-dialog-select/dynamic-dialog-select.component");
var dynamic_data_form_component_1 = require("./dynamic-elements/dynamic-data-form/dynamic-data-form.component");
var dynamic_file_component_1 = require("./dynamic-elements/dynamic-file/dynamic-file.component");
var dynamic_rich_editor_component_1 = require("./dynamic-elements/dynamic-rich-editor/dynamic-rich-editor.component");
var dynamic_code_editor_component_1 = require("./dynamic-elements/dynamic-code-editor/dynamic-code-editor.component");
var dynamic_cascad_select_component_1 = require("./dynamic-elements/dynamic-cascad-select/dynamic-cascad-select.component");
var dynamic_cascad_dialog_component_1 = require("./dynamic-elements/dynamic-cascad-dialog/dynamic-cascad-dialog.component");
var cascad_select_entry_component_1 = require("./dynamic-elements/dynamic-cascad-select/cascad-select-entry.component");
var dynamic_select_entry_component_1 = require("./dynamic-elements/dynamic-select-entry.component");
var dynamic_dialog_entry_component_1 = require("./dynamic-elements/dynamic-dialog-entry.component");
var dynamic_entry_component_1 = require("./dynamic-entry.component");
var MH_DYNAMIC_FORMS = [
    dynamic_form_component_1.MhDynamicFormComponent,
    dynamic_element_component_1.MhDynamicElementComponent,
    dynamic_element_component_1.MhDynamicElementDirective,
    form_design_component_1.MhFormDesignComponent,
];
var MH_DYNAMIC_FORMS_ENTRY_COMPONENTS = [
    dynamic_entry_component_1.DynamicEntryComponent,
    cascad_select_entry_component_1.MhCascadSelectEntryComponent,
    dynamic_dialog_entry_component_1.MhDynamicDialogEntryComponent,
    dynamic_select_entry_component_1.MhDynamicSelectEntryComponent,
    dynamic_input_component_1.MhDynamicInputComponent,
    dynamic_textarea_component_1.MhDynamicTextareaComponent,
    dynamic_slide_toggle_component_1.MhDynamicSlideToggleComponent,
    dynamic_checkbox_component_1.MhDynamicCheckboxComponent,
    dynamic_slider_component_1.MhDynamicSliderComponent,
    dynamic_select_component_1.MhDynamicSelectComponent,
    dynamic_datepicker_component_1.MhDynamicDatepickerComponent,
    dynamic_checkbox_group_component_1.MhDynamicCheckboxGroupComponent,
    dynamic_chips_component_1.MhDynamicChipsComponent,
    dynamic_radio_component_1.MhDynamicRadioComponent,
    dynamic_dialog_select_component_1.MhDynamicDialogSelectComponent,
    dynamic_data_form_component_1.MhDynamicDataFormComponent,
    dynamic_file_component_1.MhDynamicFileComponent,
    dynamic_rich_editor_component_1.MhDynamicRichEditorComponent,
    dynamic_code_editor_component_1.MhDynamicCodeEditorComponent,
    dynamic_cascad_select_component_1.MhDynamicCascadSelectComponent,
    dynamic_cascad_dialog_component_1.MhDynamicCascadDialogComponent,
];
var MhDynamicFormModule = /** @class */ (function () {
    function MhDynamicFormModule() {
    }
    MhDynamicFormModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                core_2.CovalentCommonModule,
                forms_1.ReactiveFormsModule,
                material_1.MatInputModule,
                material_1.MatCheckboxModule,
                material_1.MatSelectModule,
                material_1.MatSliderModule,
                material_1.MatSlideToggleModule,
                material_1.MatRadioModule,
                material_1.MatIconModule,
                material_1.MatDialogModule,
                material_1.MatButtonModule,
                core_2.CovalentChipsModule,
                core_2.CovalentPagingModule,
                core_2.CovalentSearchModule,
                core_2.CovalentDataTableModule,
                core_2.CovalentFileModule,
                core_2.CovalentVirtualScrollModule,
                material_1.MatTooltipModule,
                material_1.MatListModule,
                material_1.MatLineModule,
                material_1.MatDatepickerModule,
                material_1.MatNativeDateModule,
                ng2_dragula_1.DragulaModule,
                core_2.CovalentExpansionPanelModule,
                material_1.MatSnackBarModule,
                core_2.CovalentMessageModule,
            ],
            exports: [
                MH_DYNAMIC_FORMS,
                MH_DYNAMIC_FORMS_ENTRY_COMPONENTS
            ],
            declarations: [
                MH_DYNAMIC_FORMS,
                MH_DYNAMIC_FORMS_ENTRY_COMPONENTS,
                dynamic_entry_component_1.DynamicEntryComponent
            ],
            providers: [
                dynamic_form_service_1.MhDynamicFormService,
                dynamic_loader_service_1.MhDynamicLoaderService,
                { provide: 'notify', useClass: index_1.NotificationService },
                { provide: 'http', useClass: index_1.HttpService },
                { provide: material_1.DateAdapter, useClass: dynamic_date_adapter_1.MhDateAdapter },
            ],
            entryComponents: [MH_DYNAMIC_FORMS_ENTRY_COMPONENTS]
        })
    ], MhDynamicFormModule);
    return MhDynamicFormModule;
}());
exports.MhDynamicFormModule = MhDynamicFormModule;
