import { Component, Input, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { StepState } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'mh-step-form',
  templateUrl: './step-form.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MhStepFormComponent implements OnDestroy {

  @ViewChildren('dynamicForm') public dynamicForms: QueryList<any>;

  public _forms: any[] = [];
  @Input()
  set forms(v: any[]) {
    this._forms = v;
    this.initArr();
  }
  get forms(): any[] {
    return this._forms;
  }

  public _default: any;
  @Input()
  set default(v: any) {
    const value = [];
    for (let i = 0; i < this.forms.length; i++) {
      const id = this.forms[i].id;
      if (v) { value[i] = v[id] || null; } else { value[i] = null; }
    }
    this._default = value;
  }
  get default() {
    return this._default;
  }

  @Input() public mode = 'horizontal';

  public actives: boolean[] = [];
  public disableds: boolean[] = [];
  public states: StepState[] = [];

  public value: any;
  public valid: boolean;

  public interval$: Subscription;

  constructor() {
    this.interval$ = Observable.interval()
      .map((_: any) => {
        const forms = this.dynamicForms.toArray();
        const value: { [key: string]: any } = {};
        let valid = true;
        for (let i = 0; i < forms.length; i++) {
          const form = forms[i];
          const id = this.forms[i].id;
          value[id] = form.value;
          if (!form.valid) { valid = false; }
        }
        return { value, valid };
      }).subscribe((_: any) => { this.value = _.value; this.valid = _.valid; });
  }

  public initArr() {
    this.actives = [];
    this.disableds = [];
    this.states = [];
    this._default = [];
    for (let i = 0; i < this._forms.length; i++) {
      this.actives[i] = i === 0 ? true : false;
      this.disableds[i] = i === 0 ? false : true;
      this.states[i] = i === 0 ? StepState.Required : StepState.None;
      this._default[i] = null;
    }
  }

  public pre(index: number, data: any) {
    this.disableds[index - 1] = false;
    this.actives[index] = false;
    this.disableds[index] = true;
    setTimeout(() => this.actives[index - 1] = true);
    this.states[index] = StepState.None;
    this.states[index - 1] = StepState.Required;
  }

  public next(index: number, data: any) {
    this.disableds[index + 1] = false;
    this.actives[index] = false;
    this.disableds[index] = true;
    setTimeout(() => this.actives[index + 1] = true);
    this.states[index] = StepState.Complete;
    this.states[index + 1] = StepState.Required;
  }

  public ngOnDestroy() {
    this.interval$.unsubscribe();
  }

}
