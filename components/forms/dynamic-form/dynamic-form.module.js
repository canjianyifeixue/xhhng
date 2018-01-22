/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule, MatCheckboxModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatRadioModule, MatIconModule, MatDialogModule, MatButtonModule, MatTooltipModule, MatListModule, MatLineModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, DateAdapter, } from "@angular/material";
import { CovalentCommonModule, CovalentChipsModule, CovalentPagingModule, CovalentSearchModule, CovalentDataTableModule, CovalentExpansionPanelModule, CovalentFileModule, CovalentMessageModule, CovalentVirtualScrollModule, } from "@covalent/core";
// import { CovalentCodeEditorModule } from '@covalent/code-editor';
import { DragulaModule } from "ng2-dragula";
import { MhDateAdapter } from "./dynamic-date-adapter";
import { MhDynamicFormService } from "./dynamic-form.service";
import { MhDynamicLoaderService } from "./dynamic-loader.service";
import { HttpService, NotificationService } from "../../../services/index";
import { MhFormDesignComponent } from "./form-design.component";
import { MhDynamicFormComponent } from "./dynamic-form.component";
import { MhDynamicElementComponent, MhDynamicElementDirective } from "./dynamic-element.component";
import { MhDynamicInputComponent } from "./dynamic-elements/dynamic-input/dynamic-input.component";
import { MhDynamicCheckboxComponent } from "./dynamic-elements/dynamic-checkbox/dynamic-checkbox.component";
import { MhDynamicSelectComponent } from "./dynamic-elements/dynamic-select/dynamic-select.component";
import { MhDynamicTextareaComponent } from "./dynamic-elements/dynamic-textarea/dynamic-textarea.component";
import { MhDynamicSliderComponent } from "./dynamic-elements/dynamic-slider/dynamic-slider.component";
import { MhDynamicSlideToggleComponent } from "./dynamic-elements/dynamic-slide-toggle/dynamic-slide-toggle.component";
import { MhDynamicDatepickerComponent } from "./dynamic-elements/dynamic-datepicker/dynamic-datepicker.component";
import { MhDynamicCheckboxGroupComponent } from "./dynamic-elements/dynamic-checkbox-group/dynamic-checkbox-group.component";
import { MhDynamicChipsComponent } from "./dynamic-elements/dynamic-chips/dynamic-chips.component";
import { MhDynamicRadioComponent } from "./dynamic-elements/dynamic-radio/dynamic-radio.component";
import { MhDynamicDialogSelectComponent } from "./dynamic-elements/dynamic-dialog-select/dynamic-dialog-select.component";
import { MhDynamicDataFormComponent } from "./dynamic-elements/dynamic-data-form/dynamic-data-form.component";
import { MhDynamicFileComponent } from "./dynamic-elements/dynamic-file/dynamic-file.component";
import { MhDynamicRichEditorComponent } from "./dynamic-elements/dynamic-rich-editor/dynamic-rich-editor.component";
import { MhDynamicCodeEditorComponent } from "./dynamic-elements/dynamic-code-editor/dynamic-code-editor.component";
import { MhDynamicCascadSelectComponent } from "./dynamic-elements/dynamic-cascad-select/dynamic-cascad-select.component";
import { MhDynamicCascadDialogComponent } from "./dynamic-elements/dynamic-cascad-dialog/dynamic-cascad-dialog.component";
import { MhCascadSelectEntryComponent } from "./dynamic-elements/dynamic-cascad-select/cascad-select-entry.component";
import { MhDynamicSelectEntryComponent } from "./dynamic-elements/dynamic-select-entry.component";
import { MhDynamicDialogEntryComponent } from "./dynamic-elements/dynamic-dialog-entry.component";
import { DynamicEntryComponent } from "./dynamic-entry.component";
var /** @type {?} */ MH_DYNAMIC_FORMS = [
    MhDynamicFormComponent,
    MhDynamicElementComponent,
    MhDynamicElementDirective,
    MhFormDesignComponent,
];
var /** @type {?} */ MH_DYNAMIC_FORMS_ENTRY_COMPONENTS = [
    DynamicEntryComponent,
    MhCascadSelectEntryComponent,
    MhDynamicDialogEntryComponent,
    MhDynamicSelectEntryComponent,
    MhDynamicInputComponent,
    MhDynamicTextareaComponent,
    MhDynamicSlideToggleComponent,
    MhDynamicCheckboxComponent,
    MhDynamicSliderComponent,
    MhDynamicSelectComponent,
    MhDynamicDatepickerComponent,
    MhDynamicCheckboxGroupComponent,
    MhDynamicChipsComponent,
    MhDynamicRadioComponent,
    MhDynamicDialogSelectComponent,
    MhDynamicDataFormComponent,
    MhDynamicFileComponent,
    MhDynamicRichEditorComponent,
    MhDynamicCodeEditorComponent,
    MhDynamicCascadSelectComponent,
    MhDynamicCascadDialogComponent,
];
var MhDynamicFormModule = (function () {
    function MhDynamicFormModule() {
    }
    MhDynamicFormModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        CovalentCommonModule,
                        ReactiveFormsModule,
                        MatInputModule,
                        MatCheckboxModule,
                        MatSelectModule,
                        MatSliderModule,
                        MatSlideToggleModule,
                        MatRadioModule,
                        MatIconModule,
                        MatDialogModule,
                        MatButtonModule,
                        CovalentChipsModule,
                        CovalentPagingModule,
                        CovalentSearchModule,
                        CovalentDataTableModule,
                        CovalentFileModule,
                        CovalentVirtualScrollModule,
                        MatTooltipModule,
                        MatListModule,
                        MatLineModule,
                        MatDatepickerModule,
                        MatNativeDateModule,
                        DragulaModule,
                        CovalentExpansionPanelModule,
                        MatSnackBarModule,
                        CovalentMessageModule,
                    ],
                    exports: [
                        MH_DYNAMIC_FORMS,
                        MH_DYNAMIC_FORMS_ENTRY_COMPONENTS
                    ],
                    declarations: [
                        MH_DYNAMIC_FORMS,
                        MH_DYNAMIC_FORMS_ENTRY_COMPONENTS,
                        DynamicEntryComponent
                    ],
                    providers: [
                        MhDynamicFormService,
                        MhDynamicLoaderService,
                        { provide: 'notify', useClass: NotificationService },
                        { provide: 'http', useClass: HttpService },
                        { provide: DateAdapter, useClass: MhDateAdapter },
                    ],
                    entryComponents: [MH_DYNAMIC_FORMS_ENTRY_COMPONENTS]
                },] },
    ];
    /** @nocollapse */
    MhDynamicFormModule.ctorParameters = function () { return []; };
    return MhDynamicFormModule;
}());
export { MhDynamicFormModule };
function MhDynamicFormModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicFormModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicFormModule.ctorParameters;
}
