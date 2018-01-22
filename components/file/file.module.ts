import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import {
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatProgressBarModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
} from '@angular/material';
import { CovalentFileModule } from '@covalent/core';

import { MhFileService } from './file.service';

import { UploadDialogComponent } from './upload-dialog.component';
import { ImportDialogComponent } from './import-dialog.component';
import { ExportDialogComponent } from './export-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    CovalentFileModule,
    MatCheckboxModule,
    MatListModule,
  ],
  exports: [],
  declarations: [
    UploadDialogComponent,
    ImportDialogComponent,
    ExportDialogComponent,
],
  entryComponents: [
    UploadDialogComponent,
    ImportDialogComponent,
    ExportDialogComponent,
  ],
  providers: [MhFileService]
})
export class MhFileModule { }
