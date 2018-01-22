import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const CODE_EDITOR_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicCodeEditorComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-code-editor',
  templateUrl: './dynamic-code-editor.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CODE_EDITOR_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MhDynamicCodeEditorComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

  public control: FormControl;

  public language: string;

  public theme = 'dark';

  public label = '';

  public required = false;

  public readonly = false;

  public maxlength: number | null = null;

  public callBackFunc() {
    // callback
  }

}
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
