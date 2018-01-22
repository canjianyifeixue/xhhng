
import { Component, ElementRef, forwardRef, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

declare let $: any;

export interface SummernoteOptions {
  airMode?: boolean;
  buttons?: any;
  callbacks?: any; // todo
  codemirror?: any;
  colors?: any;
  dialogsInBody?: boolean;
  dialogsFade?: boolean;
  direction?: string;
  disableDragAndDrop?: boolean;
  focus?: boolean;
  fontNames?: string[];
  fontNamesIgnoreCheck?: string[];
  height?: number;
  hint?: any;
  icons?: any;
  insertTableMaxSize?: any;
  keyMap?: any;
  lang?: string;
  lineHeights?: string[];
  minHeight?: number;
  maxHeight?: number;
  maximumImageFileSize?: any;
  modules?: any;
  popover?: any;
  placeholder?: string;
  shortcuts?: boolean;
  styleTags?: any[];
  styleWithSpan?: boolean;
  tabsize?: number;
  tableClassName?: string;
  textareaAutoSync?: boolean;
  toolbar?: any;
  tooltip?: boolean;
  width?: number;
}

export const RICH_EDITOR_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicRichEditorComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-rich-editor',
  templateUrl: './dynamic-rich-editor.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RICH_EDITOR_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MhDynamicRichEditorComponent extends AbstractControlValueAccessor implements ControlValueAccessor, OnInit, OnDestroy {

  control: FormControl;

  label = '';

  options: SummernoteOptions = {
    height: 400,
    lang: 'zh-CN',
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture', 'video']],
    ],
  };

  config: any = {};

  interval$: Subscription;

  _value = '';

  set value(value: string) {
    if (value !== this._value) {
      this._value = value;
      this.refresh(value);
      this.onChange(value);
    }
  }
  get value(): string {
    return this._value;
  }

  constructor(private element: ElementRef) {
    super();
  }

  refresh(value: any) {
    $(this.element.nativeElement).find('.summernote').summernote(this.options);
    $(this.element.nativeElement).find('.summernote').summernote('code', value);
  }

  isEmpty(): boolean {
    return <boolean>(<any>$(this.element.nativeElement).find('.summernote').summernote('isEmpty'));
  }

  ngOnInit() {
    this.options = Object.assign({}, this.options, this.config || {});
    this.refresh(this.value);
    this.interval$ = Observable.interval()
      .map(() => this.getCode())
      .distinctUntilChanged()
      .subscribe(_ => {
        this._value = _;
        this.onChange(_);
      });
  }

  ngOnDestroy() {
    $(this.element.nativeElement).find('.summernote').summernote('destroy');
    this.interval$.unsubscribe();
  }

  getCode(): string {
    return $(this.element.nativeElement).find('.summernote').summernote('code');
  }

}
