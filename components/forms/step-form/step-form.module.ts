import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
} from '@angular/material';

import {
  CovalentStepsModule,
  CovalentCommonModule,
} from '@covalent/core';

import { MhDynamicFormModule } from '../dynamic-form/index';
import { MhStepFormComponent } from './step-form.component';
import { StepEntryComponent } from './step-entry.component';

@NgModule({
  imports: [
    CommonModule,
    CovalentCommonModule,
    CovalentStepsModule,
    MatIconModule,
    MatButtonModule,
    MhDynamicFormModule,
    MatDialogModule,
  ],
  exports: [MhStepFormComponent, StepEntryComponent],
  declarations: [MhStepFormComponent, StepEntryComponent],
  entryComponents: [StepEntryComponent]
})
export class MhStepFormModule { }
