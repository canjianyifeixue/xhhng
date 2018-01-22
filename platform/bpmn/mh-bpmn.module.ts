import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MhBpmnComponent } from './mh-bpmn.component';
import { MhBpmnService } from './mh-bpmn.service';
import { ModelerComponent } from './modeler/modeler.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MhBpmnComponent,
    ModelerComponent
  ],
  exports: [
    MhBpmnComponent,
    ModelerComponent
  ],
  providers: [
    MhBpmnService
  ]
})
export class MhBpmnModule { }
