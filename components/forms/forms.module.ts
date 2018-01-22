import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { ToolService } from '../../services/index';

import { MhDynamicFormModule } from './dynamic-form/index';
import { MhStepFormModule } from './step-form/index';
import { MhSearchFormModule } from './search-form/index';

import { MhFormsService } from './forms.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MhDynamicFormModule,
    MhStepFormModule,
    MhSearchFormModule,
  ],
  exports: [
    MhDynamicFormModule,
    MhStepFormModule,
    MhSearchFormModule,
  ],
  providers: [
    MhFormsService,
    ToolService,
  ]
})
export class MhFormsModule { }
