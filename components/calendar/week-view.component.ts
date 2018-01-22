import { Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewRef } from '@angular/core';
import { TdDataTableService, IPageChangeEvent } from '@covalent/core';
import { HttpUtilService } from '../../services/index';
import { Observable } from 'rxjs/Observable';
import { moment } from '../../util/moment';
import { NativeDateAdapter, DateAdapter } from '@angular/material';

@Component({
  selector: 'mh-week-view',
  templateUrl: './week-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekViewComponent implements OnInit {

  @Input() public ddCampus: any;

  @Output() public select = new EventEmitter<any>();

  public viewDate = new Date();

  public headColor = 'white';
  public headBgColor = '#97d8a3';
  public subColor = 'white';
  public subBgColor = '#97d8a3';
  public rowHeadColor = 'white';
  public rowHeadBgColor = '#97d8a3';
  public color: { [key: string]: any } = {
    enabled: '#fde9d9',
    disabled: '#FF6666',
    reserve: '#FFA726'
  };

  public TIME: any[] = [];     // 时间段
  public STATUS: any[] = [];   // 场地状态
  public days: any[] = [];     // 日期
  public events: any[] = [];   //
  public map: any[] = [];      //
  public places: any[] = [];   // 场地列表

  public cols = 8;
  public filteredData: any[] = [];
  public filteredTotal = 0;
  public fromRow = 1;
  public currentPage = 1;
  public pageSize = 5;

  constructor(
    private _dataTableService: TdDataTableService,
    private httpUtilService: HttpUtilService,
    private cdr: ChangeDetectorRef,
    dateAdapter: DateAdapter<NativeDateAdapter>,
  ) {
    dateAdapter.setLocale('zh-CN');
  }

  public detectChanges() {
    setTimeout(() => {
      if (this.cdr !== null &&
        this.cdr !== undefined &&
        !(this.cdr as ViewRef).destroyed) {
        this.cdr.detectChanges();
      }
    }, 250);
  }

  public ngOnInit() {
    const time$ = this.httpUtilService.getDictionaryData('05d588c8-1cf4-478f-861a-08746bc9eee8');
    const status$ = this.httpUtilService.getDictionaryData('3f0b06e5-8c7e-4138-8a33-3e2b25eb5351');
    const place$ = this.httpUtilService.getTableData('453069c1-cff7-4952-8ece-196cc5333be2',
      { ddCampus: this.ddCampus });
    Observable.combineLatest(time$, status$, place$).subscribe((_: any) => {
      this.TIME = _[0];
      this.STATUS = _[1];
      this.places = _[2].items;
      this.init();
      this.detectChanges();
    });
  }

  public init() {
    this.events = [];
    if (this.places.length <= 0) {
      this.cols = 8 * this.TIME.length;
      this.dateChange(this.viewDate);
    }
    for (let i = 0; i < this.places.length; i++) {
      const p = this.places[i];
      this.httpUtilService.getTableData('fb933538-292b-4613-b79e-6b961536289e', { ddPlace: p.id })
        .subscribe((_: any) => {
          _.items.forEach((e: any) => this.events = [...this.events, e]);
          if (i === this.places.length - 1) {
            this.cols = 8 * this.TIME.length;
            this.dateChange(this.viewDate);
          }
        });
    }
  }

  public dateChange(date: any) {
    this.viewDate = new Date(date);
    const day = moment(date).format('e');
    const sunday = moment(date).subtract(day, 'days');
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = moment(sunday).add(i, 'days').format('YYYY-MM-DD');
      days.push({ date: d });
    }
    this.days = days;
    this.filter();
  }

  public preWeek() {
    this.dateChange(moment(this.viewDate).subtract(7, 'days'));
  }

  public nextWeek() {
    this.dateChange(moment(this.viewDate).add(7, 'days'));
  }

  public page(pagingEvent: IPageChangeEvent) {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  public filter() {
    let newData: any[] = this.places;
    this.filteredTotal = newData.length;
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
    this.initMap();
  }

  public initMap() {
    this.map = [];
    for (const e of this.events) {
      const date = moment(e.dtUse).format('YYYY-MM-DD');
      const time = e.ddTimeFrame;
      const rowIndex = this.findRowIndex(e.ddPlace);
      const dateIndex = this.findDateIndex(date);
      const timeIndex = this.findTimeIndex(time);
      if (rowIndex >= 0 && dateIndex >= 0 && timeIndex >= 0) {
        if (!this.map[rowIndex]) { this.map[rowIndex] = []; }
        if (!this.map[rowIndex][dateIndex]) { this.map[rowIndex][dateIndex] = []; }
        this.map[rowIndex][dateIndex][timeIndex] = e;
      }
    }
  }

  public findRowIndex(place: any): number {
    for (let i = 0; i < this.filteredData.length; i++) {
      if (this.filteredData[i].id === place) { return i; }
    }
    return -1;
  }

  public findDateIndex(date: number | Date | string): number {
    for (let i = 0; i < this.days.length; i++) {
      if (this.days[i].date === date) { return i; }
    }
    return -1;
  }

  public findTimeIndex(time: number | Date | string): number {
    for (let i = 0; i < this.TIME.length; i++) {
      if (this.TIME[i].key === time) { return i; }
    }
    return -1;
  }

  public getColor(rowIndex: number, dateIndex: number, timeIndex: number): string {
    return this.map[rowIndex] && this.map[rowIndex][dateIndex] && this.map[rowIndex][dateIndex][timeIndex] ?
      this.color[this.map[rowIndex][dateIndex][timeIndex].ddStatusUse] : this.color.enabled;
  }

  public getTooltip(rowIndex: number): string {
    const data = this.filteredData[rowIndex];
    return `地址：${data.address}    规模：${data.placeScale}    描述：${data.descPlace}`;
  }

  public apply(rowIndex: number, dateIndex: number, timeIndex: number) {
    const data = {
      ddPlace: this.filteredData[rowIndex].ddPlace,
      descPlace: this.filteredData[rowIndex].descPlace,
      address: this.filteredData[rowIndex].address,
      dtUse: this.days[dateIndex].date,
      ddTimeFrame: this.TIME[timeIndex].key
    };
    this.select.emit(data);
  }

}
