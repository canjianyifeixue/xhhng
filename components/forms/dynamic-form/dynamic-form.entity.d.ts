export declare enum MhDynamicFormType {
    Text = "text",
    Boolean = "boolean",
    Number = "number",
    Date = "date",
    ENUM = "enum",
}
export declare enum MhDynamicFormElement {
    Input = "input",
    Time = "time",
    Number = "number",
    Password = "password",
    Textarea = "textarea",
    Slider = "slider",
    SlideToggle = "slide-toggle",
    Checkbox = "checkbox",
    Select = "select",
    DatePicker = "date-picker",
    CheckboxGroup = "checkbox-group",
    Chips = "chips",
    Radio = "radio",
    DialogSelect = "dialog-select",
    DataForm = "data-form",
    File = "file",
    RichEditor = "rich-editor",
    CodeEditor = "code-editor",
    CascadSelect = "cascad-select",
    CascadDialog = "cascad-dialog",
}
export interface MhDynamicFormElementConfig {
    label?: string;
    name: string;
    type: MhDynamicFormType | MhDynamicFormElement | string;
    flex?: number;
    required?: boolean;
    multiple?: boolean;
    min?: any;
    max?: any;
    selections?: any;
    selectionParams?: any;
    pattern?: RegExp | string | null;
    config?: object;
    maxlength?: number | null;
    default?: any;
    controls?: any;
    validateUrl?: string | null;
    readonly?: boolean;
}
