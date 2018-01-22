import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ViewRef } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MhDynamicLoaderService } from './dynamic-loader.service';
import { MhDynamicFormService } from './dynamic-form.service';
import { MhDynamicFormElementConfig } from './dynamic-form.entity';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { toPromise } from 'rxjs/operator/toPromise';
import { moment } from '../../../util/moment';

@Component({
  selector: 'mh-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MhDynamicFormComponent {

  public dynamicForm: FormGroup;

  public hasError = false;
  public errorInfo = '';

  @Input('elements')
  set elements(elements: any) {
    elements = elements || [];
    if (typeof elements === 'string') {
      this._dynamicLoaderService.loadElements(elements).subscribe((data: any) => {
        this._loaderElements(data);
      });
    } else {
      this._loaderElements(elements);
    }
  }
  get elements(): any {
    return this._renderedElements;
  }

  public _default: any;

  @Input('default')
  set default(v: any) {
    if (v && typeof v === 'object') {
      const vl = Object.keys(v).length;
      const cl = Object.keys(this.dynamicForm.controls).length;
      this._default = v;
      if (cl === vl) { this.setValue(); }
    }

  }

  /**
   * Getter property for dynamic [FormGroup].
   */
  get form(): FormGroup {
    return this.dynamicForm;
  }

  /**
   * Getter property for [valid] of dynamic [FormGroup].
   */
  get valid(): boolean {
    if (this.dynamicForm) {
      return this.dynamicForm.valid;
    }
    return false;
  }

  /**
   * Getter property for [value] of dynamic [FormGroup].
   */
  get value(): any {
    if (this.dynamicForm) {
      // return this.dynamicForm.value;
      const value: any = {};
      for (const name in this.dynamicForm.controls) {
        if (name) {
          let v = this.dynamicForm.controls[name].value;
          if (v instanceof Date) {
            v = moment(v).toISOString();
          }
          // if (typeof v === 'string') {
          //   v = v.split(`\"`).join(`\\"`);
          //   v = v.split(`\'`).join(`\\'`);
          // }
          value[name] = v;
        }
      }
      return value;
    }
    return {};
  }

  /**
   * Getter property for [errors] of dynamic [FormGroup].
   */
  get errors(): { [name: string]: any } {
    if (this.dynamicForm) {
      const errors: { [name: string]: any } = {};
      for (const name in this.dynamicForm.controls) {
        if (name) {
          errors[name] = this.dynamicForm.controls[name].errors;
        }
      }
      return errors;
    }
    return {};
  }

  /**
   * Getter property for [controls] of dynamic [FormGroup].
   */
  get controls(): { [key: string]: AbstractControl } {
    if (this.dynamicForm) {
      return this.dynamicForm.controls;
    }
    return {};
  }

  @Output('change') public change = new EventEmitter<any>();

  private inited = false;
  private _renderedElements: MhDynamicFormElementConfig[] = [];
  private _elements: MhDynamicFormElementConfig[];

  constructor(
    private _formBuilder: FormBuilder,
    private _dynamicFormsService: MhDynamicFormService,
    private _dynamicLoaderService: MhDynamicLoaderService,
    private _cdr: ChangeDetectorRef) {
    this.dynamicForm = this._formBuilder.group({});
  }

  public refresh(): void {
    this._loaderElements(this._elements);
  }

  public init() {
    this._dynamicFormsService.registerChange().subscribe((_: any) => {
      this.change.emit(_);
      this.validateAsync();
    });
  }

  private _loaderElements(elements: MhDynamicFormElementConfig[]): void {
    this._clearRemovedElements(elements);
    this._renderedElements = [];
    const duplicates: string[] = [];
    let count = 0;
    for (let i = 0; i < elements.length; i++) {
      const elem = elements[i];
      this._dynamicFormsService.validateDynamicElementName(elem.name);
      if (duplicates.indexOf(elem.name) > -1) {
        throw new Error(`name属性重复: "${elem.name}" 重复`);
      }
      duplicates.push(elem.name);
      const controls$ = this._dynamicLoaderService.loadControls(elem.controls, elem.type);
      const selections$ = this._dynamicLoaderService.loadSelections(elem.selections, elem.type, elem.selectionParams);
      Observable.combineLatest(controls$, selections$).subscribe((data: any) => {
        elements[i].controls = data[0];
        elements[i].selections = data[1];
        if (++count === elements.length) {
          this._rerenderElements(elements);
        }
      });
    }
  }

  private _rerenderElements(elements: MhDynamicFormElementConfig[]) {
    for (const elem of elements) {
      if (!this.dynamicForm.get(elem.name)) {
        this.dynamicForm.addControl(elem.name, this._dynamicFormsService.createFormControl(elem));
      } else {
        const e = this.dynamicForm.get(elem.name);
        if (e) {
          e.setValidators(this._dynamicFormsService.createValidators(elem));
        }
      }
      this._renderedElements.push(Object.assign({}, elem));
    }
    this.inited = true;
    this._elements = elements;
    this.setValue();
    this.init();
    this.detectChanges();
    toPromise.call(timer()).then(() => {
      // call a markForCheck so elements are rendered correctly in OnPush
      this._cdr.markForCheck();
    });
  }

  private _clearRemovedElements(elements: any): void {
    for (let i = 0; i < this._renderedElements.length; i++) {
      for (let j = 0; j < elements.length; j++) {
        // check if the name of the element is still there removed
        if (this._renderedElements[i].name === elements[j].name) {
          delete this._renderedElements[i];
          break;
        }
      }
    }
    // remove elements that were removed from the array
    this._renderedElements.forEach((elem: MhDynamicFormElementConfig) => {
      this.dynamicForm.removeControl(elem.name);
    });
  }

  private setValue() {
    if (this.inited && this._default) {
      this.form.setValue(this._default);
    }
  }

  private validateAsync() {
    let e = false;
    if (this.dynamicForm) {
      for (const name of Object.keys(this.dynamicForm.controls)) {
        const err = this.dynamicForm.controls[name].errors;
        if (err && err.async) {
          e = true;
          this.hasError = true;
          this.errorInfo = err.async;
        }
      }
    }
    if (!e) { this.hasError = false; this.errorInfo = ''; }
  }

  private detectChanges() {
    setTimeout(() => {
      if (this._cdr !== null &&
        this._cdr !== undefined &&
        !(this._cdr as ViewRef).destroyed) {
        this._cdr.detectChanges();
      }
    }, 250);
  }
}
