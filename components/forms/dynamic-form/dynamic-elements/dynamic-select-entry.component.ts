import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { fusejs as Fuse } from '../../../../util/fuse-js';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mh-dynamic-select-entry',
  templateUrl: './dynamic-select-entry.component.html'
})
export class MhDynamicSelectEntryComponent implements OnInit {

  public selections: any[] = [];
  public multiple = false;
  public title = '';
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
    private dialogRef: MatDialogRef<MhDynamicSelectEntryComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
  ) { }

  public ngOnInit() {
    this.selections = this.dialogData.selections;
    this.multiple = this.dialogData.multiple;
    this.title = this.dialogData.title;
    const data = this.dialogData.default;
    if (this.multiple) {
      for (const selection of this.selections) {
        selection.checked = false;
      }
      if (Array.isArray(data)) {
        for (const d of data) {
          for (let i = 0; i < this.selections.length; i++) {
            if (this.selections[i].key === d) {
              this.selections[i].checked = true;
              break;
            }
          }
        }
      }
    }
    this.initFuse();
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

  public select(item: any) {
    this.dialogRef.close(item);
  }

  public multChange(selection: any) {
    selection.checked = !selection.checked;
  }

  public multSelect() {
    const arr = [];
    for (const selection of this.selections) {
      if (selection.checked) { arr.push(selection); }
    }
    this.dialogRef.close(arr);
  }

  public clear() {
    if (this.multiple) {
      this.dialogRef.close([{ key: null, value: '' }]);
    } else {
      this.dialogRef.close({ key: null, value: '' });
    }
  }

}
