import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewRef } from '@angular/core';
import { moment } from '../../util/moment';
import { HttpUtilService } from '../../services/index';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../services/index';
import { ConfirmEntryComponent } from './confirm-entry.component';
import { MatDialog, NativeDateAdapter, DateAdapter } from '@angular/material';

@Component({
  selector: 'mh-month-view',
  templateUrl: './month-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthViewComponent {

  @Input() public viewDate: any = new Date();

  public _events: any[] = [];

  @Input()
  set events(v: any) {
    this._events = v;
    this.init();
  }
  get events() {
    return this._events;
  }

  @Output() public selectEvent = new EventEmitter<any>();
  @Output() public monthStatus = new EventEmitter<any>();

  public WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  public TIME: any[] = [];
  public STATUS: any[] = [];
  public days: any[] = [];
  public map: any[] = [];
  public viewStart: number;
  public viewEnd: number;
  public color: { [key: string]: any } = {
    enabled: '#fde9d9',
    disabled: '#FF6666',
    reserve: '#FFA726'
  };

  public rowHeadColor = 'white';
  public rowHeadBgColor = '#97d8a3';
  public columnColor = 'white';
  public columnBgColor = '#97d8a3';
  public disabledCellColor = '#a6a6a6';
  public disabledCellBgColor = 'lightgray';

  constructor(
    private httpUtilService: HttpUtilService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    dateAdapter: DateAdapter<NativeDateAdapter>,
  ) {
    dateAdapter.setLocale('zh-CN');
    const time$ = this.httpUtilService.getDictionaryData('05d588c8-1cf4-478f-861a-08746bc9eee8');
    const status$ = this.httpUtilService.getDictionaryData('3f0b06e5-8c7e-4138-8a33-3e2b25eb5351');
    Observable.combineLatest(time$, status$).subscribe((_: any) => {
      this.TIME = _[0];
      this.STATUS = _[1];
      this.init();
    });
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

  public init() {
    this.change(this.viewDate);
    this.convertEvent(this.events);
    this.detectChanges();
  }

  public change(date: any) {
    this.viewDate = new Date(date);
    const days = [];
    const startOfMonth = moment(date).startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment(date).endOf('month').format('YYYY-MM-DD');
    for (let i = 1; ; i++) {
      const s = i - 1 - moment(startOfMonth).day();
      const d = moment(startOfMonth).add(s, 'days');
      days.push(d.date());
      if (d.isSame(startOfMonth)) { this.viewStart = i - 1; }
      if (d.isSame(endOfMonth)) { this.viewEnd = i - 1; }
      if (d.isAfter(endOfMonth) && d.day() === 6) { break; }
    }
    this.days = days;
  }

  public preMonth() {
    const month = moment(this.viewDate).month();
    const date = moment(this.viewDate).month(month - 1);
    this.change(date);
    this.convertEvent(this.events);
  }

  public nextMonth() {
    const month = moment(this.viewDate).month();
    const date = moment(this.viewDate).month(month + 1);
    this.change(date);
    this.convertEvent(this.events);
  }

  public convertEvent(data: any) {
    this.map = [];
    for (const d of data) {
      const date = d.dtUse;
      const time = d.ddTimeFrame;
      const dateIndex = this.findDateIndex(date);
      const timeIndex = this.findTimeIndex(time);
      if (dateIndex >= 0 && timeIndex >= 0) {
        if (!this.map[dateIndex]) { this.map[dateIndex] = []; }
        this.map[dateIndex][timeIndex] = d;
      }
    }
  }

  public findDateIndex(date: Date | number | string): number {
    const d = moment(date);
    const day = moment(this.viewDate);
    const start = moment().year(day.year()).month(day.month()).date(this.days[this.viewStart]);
    const end = moment().year(day.year()).month(day.month()).date(this.days[this.viewEnd]);
    if ((d.format('YYYY-MM-DD') === start.format('YYYY-MM-DD') ||
      d.isSameOrAfter(start)) && d.isSameOrBefore(end)) {
      return d.date() + this.viewStart - 1;
    }
    return -1;
  }

  public findTimeIndex(time: Date | number | string): number {
    for (let i = 0; i < this.TIME.length; i++) {
      if (this.TIME[i].key === time) { return i; }
    }
    return -1;
  }

  public getColor(dateIndex: number, timeIndex: number): string {
    return this.map[dateIndex] && this.map[dateIndex][timeIndex] ?
      this.color[this.map[dateIndex][timeIndex].ddStatusUse] : this.color.enabled;
  }

  public getTooltip(dateIndex: number, timeIndex: number): string {
    const event = this.map[dateIndex] && this.map[dateIndex][timeIndex] ?
      this.map[dateIndex][timeIndex] : 'enabled';
    if (event.ddStatusUse === 'reserve') {
      return '预留用途：' + event.obligateInfo;
    } else {
      return '';
    }
  }

  public getMenu(dateIndex: number, timeIndex: number): any[] {
    const status = this.map[dateIndex] && this.map[dateIndex][timeIndex] ?
      this.map[dateIndex][timeIndex].ddStatusUse : 'enabled';
    switch (status) {
      case 'disabled':
        return [{ label: '启用', key: 'enabled' }];
      case 'reserve':
        return [{ label: '空出', key: 'enabled' }];
      case 'enabled':
      default:
        return [{ label: '禁用', key: 'disabled' }, { label: '预留', key: 'reserve' }];
    }
  }

  public openConfim(index: number, x: number) {
    this.dialog.open(ConfirmEntryComponent, {
      width: '25%',
      data: {
        actions: this.getMenu(index, x)
      }
    })
      .afterClosed()
      .filter((_: any) => _)
      .subscribe((_: any) => {
        this.changeStatus(index, x, _);
      });
  }

  public changeStatus(dateIndex: number, timeIndex: number, status: string) {
    const data = {
      dtUse: moment(this.viewDate).date(this.days[dateIndex]).format('YYYY-MM-DD'),
      ddTimeFrame: this.TIME[timeIndex].key,
      ddStatusUse: status,
      who: '',
      obligateInfo: ''
    };
    if (data.ddStatusUse === 'reserve') {
      this.notificationService.prompt('请填写预留用途').filter((_: any) => _)
        .subscribe((_: any) => {
          data.who = JSON.parse(localStorage.getItem('user') || `{id:null}`).id;
          data.obligateInfo = _;
          this.selectEvent.emit(data);
        });
    } else {
      this.selectEvent.emit(data);
    }
  }

  public enabledMonth() {
    const data = {
      status: 'enabled',
      dtUse: moment(this.viewDate).format('YYYY-MM-DD'),
      TIME: this.TIME
    };
    this.monthStatus.emit(data);
  }

  public disabledMonth() {
    const data = {
      status: 'disabled',
      dtUse: moment(this.viewDate).format('YYYY-MM-DD'),
      TIME: this.TIME
    };
    this.monthStatus.emit(data);
  }

}
