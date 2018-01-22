import { QueryList, OnDestroy } from '@angular/core';
import { StepState } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
export declare class MhStepFormComponent implements OnDestroy {
    dynamicForms: QueryList<any>;
    _forms: any[];
    forms: any[];
    _default: any;
    default: any;
    mode: string;
    actives: boolean[];
    disableds: boolean[];
    states: StepState[];
    value: any;
    valid: boolean;
    interval$: Subscription;
    constructor();
    initArr(): void;
    pre(index: number, data: any): void;
    next(index: number, data: any): void;
    ngOnDestroy(): void;
}
