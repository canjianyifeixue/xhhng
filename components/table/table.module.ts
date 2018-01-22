import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CovalentDataTableModule,
  CovalentPagingModule,
  CovalentSearchModule,
} from '@covalent/core';

import {
  MatListModule,
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
} from '@angular/material';

import { TableEntryComponent } from './table-entry.component';
import { TableService } from './table.service';
import { MhTableComponent } from './table.component';

@NgModule({
  imports: [
    MatDialogModule,
    CommonModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentSearchModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
  ],
  declarations: [
    TableEntryComponent,
    MhTableComponent
  ],
  exports: [MhTableComponent],
  entryComponents: [TableEntryComponent],
  providers: [TableService]
})
export class MhTableModule { }
