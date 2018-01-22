import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatDialogModule,
} from '@angular/material';

import { SearchFormComponent } from './search-form.component';
import { SearchEntryComponent } from './search-entry.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
  ],
  exports: [SearchFormComponent],
  declarations: [SearchFormComponent, SearchEntryComponent],
  entryComponents: [SearchEntryComponent]
})
export class MhSearchFormModule { }
