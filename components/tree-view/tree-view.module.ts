import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from './tree-view.component';
import { TreeModule } from 'angular-tree-component';
import { MatIconModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, TreeModule, MatIconModule, MatCheckboxModule],
  exports: [TreeViewComponent],
  declarations: [TreeViewComponent]
})
export class MhTreeViewModule { }
