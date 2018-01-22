import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CascadSelectService } from './cascad-select.service';
import { fusejs as Fuse } from '../../../../../util/fuse-js';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mh-cascad-select-entry',
  templateUrl: './cascad-select-entry.component.html',
  providers: [CascadSelectService]
})
export class MhCascadSelectEntryComponent implements OnInit {

  public data: any = [];
  public selections: any[] = [];
  public selectedData: any[] = [];
  public title = '';
  public async = false;
  public keyField = 'key';
  public valueField = 'value';
  public depth = 0;
  public selectDepth = 0;

  public fuse: any;
  public backupSelections: any = [];
  public searchTerm = '';
  public fuseOptions: any = {
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 2,
    keys: [],
  };

  constructor(
    private dialogRef: MatDialogRef<MhCascadSelectEntryComponent>,
    private cascadSelectService: CascadSelectService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    // @Inject('http') private http: any,
  ) {
    // this.cascadSelectService = new CascadSelectService(http);
  }

  public ngOnInit() {
    this.data = this.dialogData.selections;
    this.title = this.dialogData.title;
    this.async = this.dialogData.async;
    this.keyField = this.dialogData.keyField;
    this.valueField = this.dialogData.valueField;
    this.selectedData = this.dialogData.default || [];
    if (this.async) {
      this.depth = this.data.split(';').length;
      this.selectDepth = 0;
      this.initAsyncSelection();
    } else {
      this.initSelection();
    }
  }

  public initSelection() {
    this.cascadSelectService.initSelection(this.data, this.selectedData, this.keyField).subscribe((_: any) => {
      this.selections = _.selections;
      this.selectedData = _.selectedData;
      this.initFuse();
    });
  }

  public initAsyncSelection() {
    this.cascadSelectService.initAsyncSelection(
      this.selectedData, this.data, this.selections,
      this.selectDepth, this.keyField, this.valueField
    ).subscribe((_: any) => {
      this.selectDepth = _.selectDepth;
      this.selectedData = _.selectedData;
      this.selections = _.selections;
      this.initFuse();
    });
  }

  public loadAsyncSelection(arr: any[]) {
    this.cascadSelectService.loadAsyncSelection(
      arr, this.selectedData, this.selections, this.selectDepth,
      this.keyField, this.valueField
    ).subscribe((_: any) => {
      this.selectDepth = _.selectDepth;
      this.selectedData = _.selectedData;
      this.selections = _.selections;
      this.initFuse();
    });
  }

  public select(selection: any) {
    this.selectedData = [...this.selectedData, { key: selection[this.keyField], value: selection[this.valueField] }];
    if (this.async && this.depth > this.selectDepth + 1) {
      this.selectDepth += 1;
      this.cascadSelectService.loadAsyncData(this.data, this.selectDepth, selection[this.keyField]).subscribe((_: any) => {
        this.selections = _.items;
      });
      return;
    }
    if (!this.async && selection.children) { this.selections = selection.children; return; }
    this.dialogRef.close(this.selectedData);
    this.selectedData = [];
  }

  public initFuse() {
    this.fuseOptions.keys = ['key', 'value'];
    this.backupSelections = [...this.selections];
    this.fuse = new Fuse(this.selections, this.fuseOptions);
    Observable.interval()
      .map((_: any) => this.searchTerm)
      .distinctUntilChanged()
      .subscribe((_: any) => {
        if (_ && _.length > 0) {
          this.selections = this.fuse.search(this.searchTerm);
        } else {
          this.selections = this.backupSelections;
        }
      });
  }

  public clear() {
    this.selectedData = [];
    this.dialogRef.close([]);
  }

  public pop(index: number) {
    this.selectedData = this.selectedData.slice(0, index);
    if (this.async) {
      const arr = [this.cascadSelectService.loadAsyncData(this.data, 0)];
      for (let i = 0; i < this.selectedData.length; i++) {
        arr.push(this.cascadSelectService.loadAsyncData(this.data, i + 1, this.selectedData[i].key));
      }
      this.loadAsyncSelection(arr);
    } else {
      this.initSelection();
    }
  }

}
