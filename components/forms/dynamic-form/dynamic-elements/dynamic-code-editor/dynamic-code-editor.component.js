"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var abstract_control_value_accesor_1 = require("../abstract-control-value-accesor");
exports.CODE_EDITOR_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MhDynamicCodeEditorComponent; }),
    multi: true,
};
var MhDynamicCodeEditorComponent = /** @class */ (function (_super) {
    __extends(MhDynamicCodeEditorComponent, _super);
    function MhDynamicCodeEditorComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.theme = 'dark';
        _this.label = '';
        _this.required = false;
        _this.readonly = false;
        _this.maxlength = null;
        return _this;
    }
    MhDynamicCodeEditorComponent.prototype.callBackFunc = function () {
        // callback
    };
    MhDynamicCodeEditorComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-code-editor',
            templateUrl: './dynamic-code-editor.component.html',
            // changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [exports.CODE_EDITOR_INPUT_CONTROL_VALUE_ACCESSOR]
        })
    ], MhDynamicCodeEditorComponent);
    return MhDynamicCodeEditorComponent;
}(abstract_control_value_accesor_1.AbstractControlValueAccessor));
exports.MhDynamicCodeEditorComponent = MhDynamicCodeEditorComponent;
// declare let $: any;
// import {
//     Component,
//     ElementRef,
//     forwardRef,
//     Input,
//     Output,
//     EventEmitter,
//     OnDestroy,
//     OnInit
// } from '@angular/core';
// import {
//     NG_VALUE_ACCESSOR,
//     ControlValueAccessor
// } from '@angular/forms';
// const SUMMERNOTE_VALUE_ACCESSOR = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => SummernoteComponent),
//     multi: true
// };
// @Component({
//     selector: 'summernote',
//     template: '<div class="summernote"></div>',
//     providers: [SUMMERNOTE_VALUE_ACCESSOR]
// })
// export class SummernoteComponent implements OnInit, OnDestroy, ControlValueAccessor {
//     @Input()
//     set options(options: SummernoteOptions) {
//         this._options = options;
//         this.addCallbacks();
//         this.refreshOptions();
//     }
//     get options(): SummernoteOptions {
//         return this._options || {};
//     }
//     @Input()
//     set disabled(disabled: boolean) {
//         if (disabled != null) {
//             this._disabled = disabled;
//             $(this.element.nativeElement).find('.summernote').summernote(disabled ? 'disable' : 'enable');
//             this.refreshOptions();
//         }
//     }
//     get disabled(): boolean {
//         return this._disabled;
//     }
//     private _empty;
//     @Output() emptyChange: EventEmitter<boolean> = new EventEmitter<boolean>();
//     get empty(){
//         return this._empty;
//     }
//     set empty(value:boolean){
//         if(this._empty!=value){
//             this._empty=value;
//             this.emptyChange.emit(value);
//         }
//     }
//     private _disabled: boolean = false;
//     private _options: SummernoteOptions;
//     private onTouched = () => { };
//     private onChange: (value: string) => void = () => { };
//     constructor(private element: ElementRef) {
//     }
//     private _value: string;
//     set value(value: string) {
//         this._value = value;
//     }
//     get value(): string {
//         return this._value;
//     }
//     private refreshOptions() {
//         $(this.element.nativeElement).find('.summernote').summernote(this.options);
//         if (this.options.tooltip != undefined && !this.options.tooltip)
//             (<any>$(this.element.nativeElement).find('.note-editor button.note-btn')).tooltip('destroy');
//     }
//     private addCallbacks() {
//         this.options.callbacks = {
//             onChange: (contents, $editable) => {
//                 this.refreshEmpty();
//                 this.onChange(contents);
//             },
//             onBlur: () => {
//                 this.onTouched();
//             }
//         };
//     }
//     private refreshEmpty() {
//         this.empty = <boolean>(<any>$(this.element.nativeElement).find('.summernote').summernote('isEmpty'));
//     }
//     ngOnInit() {
//         if (this.options == null) {
//             this.options = {};
//         }
//         this.refreshEmpty();
//     }
//     ngOnDestroy() {
//         $(this.element.nativeElement).find('.summernote').summernote('destroy');
//     }
//     writeValue(code: string) {
//         this.value = code;
//         $(this.element.nativeElement).find('.summernote').summernote('code', code);
//         this.refreshEmpty();
//     }
//     getCode(): string {
//         return $(this.element.nativeElement).find('.summernote').summernote('code');
//     }
//     registerOnChange(fn: any) {
//         this.onChange = fn;
//     }
//     registerOnTouched(fn: any) {
//         this.onTouched = fn;
//     }
// }
