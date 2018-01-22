import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MatGridListModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatInputModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatIconModule,
  MatTooltipModule,
  MatMenuModule,
  MatListModule,
  MatSelectModule,
  MatDialogModule,
} from '@angular/material';
import { CovalentPagingModule } from '@covalent/core';

import { MonthViewComponent } from './month-view.component';
import { WeekViewComponent } from './week-view.component';
import { WeekEntryComponent } from './week-entry.component';

import { MhCalendarService } from './calendar.service';
import { ConfirmEntryComponent } from './confirm-entry.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    CovalentPagingModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule,
  ],
  declarations: [
    MonthViewComponent,
    WeekViewComponent,
    WeekEntryComponent,
    ConfirmEntryComponent,
],
  entryComponents: [
    WeekEntryComponent,
    ConfirmEntryComponent,
  ],
  exports: [
    MonthViewComponent,
    WeekViewComponent,
  ],
  providers: [
    MhCalendarService
  ]
})
export class MhCalendarModule { }
