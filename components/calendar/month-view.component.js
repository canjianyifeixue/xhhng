/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { moment } from "../../util/moment";
import { HttpUtilService } from "../../services/index";
import { Observable } from "rxjs/Observable";
import { NotificationService } from "../../services/index";
import { ConfirmEntryComponent } from "./confirm-entry.component";
import { MatDialog, DateAdapter } from "@angular/material";
var MonthViewComponent = (function () {
    function MonthViewComponent(httpUtilService, notificationService, cdr, dialog, dateAdapter) {
        var _this = this;
        this.httpUtilService = httpUtilService;
        this.notificationService = notificationService;
        this.cdr = cdr;
        this.dialog = dialog;
        this.viewDate = new Date();
        this._events = [];
        this.selectEvent = new EventEmitter();
        this.monthStatus = new EventEmitter();
        this.WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        this.TIME = [];
        this.STATUS = [];
        this.days = [];
        this.map = [];
        this.color = {
            enabled: '#fde9d9',
            disabled: '#FF6666',
            reserve: '#FFA726'
        };
        this.rowHeadColor = 'white';
        this.rowHeadBgColor = '#97d8a3';
        this.columnColor = 'white';
        this.columnBgColor = '#97d8a3';
        this.disabledCellColor = '#a6a6a6';
        this.disabledCellBgColor = 'lightgray';
        dateAdapter.setLocale('zh-CN');
        var /** @type {?} */ time$ = this.httpUtilService.getDictionaryData('05d588c8-1cf4-478f-861a-08746bc9eee8');
        var /** @type {?} */ status$ = this.httpUtilService.getDictionaryData('3f0b06e5-8c7e-4138-8a33-3e2b25eb5351');
        Observable.combineLatest(time$, status$).subscribe(function (_) {
            _this.TIME = _[0];
            _this.STATUS = _[1];
            _this.init();
        });
    }
    Object.defineProperty(MonthViewComponent.prototype, "events", {
        get: /**
         * @return {?}
         */
        function () {
            return this._events;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._events = v;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MonthViewComponent.prototype.detectChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            if (_this.cdr !== null &&
                _this.cdr !== undefined &&
                !(/** @type {?} */ (_this.cdr)).destroyed) {
                _this.cdr.detectChanges();
            }
        }, 250);
    };
    /**
     * @return {?}
     */
    MonthViewComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        this.change(this.viewDate);
        this.convertEvent(this.events);
        this.detectChanges();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MonthViewComponent.prototype.change = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.viewDate = new Date(date);
        var /** @type {?} */ days = [];
        var /** @type {?} */ startOfMonth = moment(date).startOf('month').format('YYYY-MM-DD');
        var /** @type {?} */ endOfMonth = moment(date).endOf('month').format('YYYY-MM-DD');
        for (var /** @type {?} */ i = 1;; i++) {
            var /** @type {?} */ s = i - 1 - moment(startOfMonth).day();
            var /** @type {?} */ d = moment(startOfMonth).add(s, 'days');
            days.push(d.date());
            if (d.isSame(startOfMonth)) {
                this.viewStart = i - 1;
            }
            if (d.isSame(endOfMonth)) {
                this.viewEnd = i - 1;
            }
            if (d.isAfter(endOfMonth) && d.day() === 6) {
                break;
            }
        }
        this.days = days;
    };
    /**
     * @return {?}
     */
    MonthViewComponent.prototype.preMonth = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ month = moment(this.viewDate).month();
        var /** @type {?} */ date = moment(this.viewDate).month(month - 1);
        this.change(date);
        this.convertEvent(this.events);
    };
    /**
     * @return {?}
     */
    MonthViewComponent.prototype.nextMonth = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ month = moment(this.viewDate).month();
        var /** @type {?} */ date = moment(this.viewDate).month(month + 1);
        this.change(date);
        this.convertEvent(this.events);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    MonthViewComponent.prototype.convertEvent = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.map = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var d = data_1[_i];
            var /** @type {?} */ date = d.dtUse;
            var /** @type {?} */ time = d.ddTimeFrame;
            var /** @type {?} */ dateIndex = this.findDateIndex(date);
            var /** @type {?} */ timeIndex = this.findTimeIndex(time);
            if (dateIndex >= 0 && timeIndex >= 0) {
                if (!this.map[dateIndex]) {
                    this.map[dateIndex] = [];
                }
                this.map[dateIndex][timeIndex] = d;
            }
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MonthViewComponent.prototype.findDateIndex = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        var /** @type {?} */ d = moment(date);
        var /** @type {?} */ day = moment(this.viewDate);
        var /** @type {?} */ start = moment().year(day.year()).month(day.month()).date(this.days[this.viewStart]);
        var /** @type {?} */ end = moment().year(day.year()).month(day.month()).date(this.days[this.viewEnd]);
        if ((d.format('YYYY-MM-DD') === start.format('YYYY-MM-DD') ||
            d.isSameOrAfter(start)) && d.isSameOrBefore(end)) {
            return d.date() + this.viewStart - 1;
        }
        return -1;
    };
    /**
     * @param {?} time
     * @return {?}
     */
    MonthViewComponent.prototype.findTimeIndex = /**
     * @param {?} time
     * @return {?}
     */
    function (time) {
        for (var /** @type {?} */ i = 0; i < this.TIME.length; i++) {
            if (this.TIME[i].key === time) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @param {?} dateIndex
     * @param {?} timeIndex
     * @return {?}
     */
    MonthViewComponent.prototype.getColor = /**
     * @param {?} dateIndex
     * @param {?} timeIndex
     * @return {?}
     */
    function (dateIndex, timeIndex) {
        return this.map[dateIndex] && this.map[dateIndex][timeIndex] ?
            this.color[this.map[dateIndex][timeIndex].ddStatusUse] : this.color["enabled"];
    };
    /**
     * @param {?} dateIndex
     * @param {?} timeIndex
     * @return {?}
     */
    MonthViewComponent.prototype.getTooltip = /**
     * @param {?} dateIndex
     * @param {?} timeIndex
     * @return {?}
     */
    function (dateIndex, timeIndex) {
        var /** @type {?} */ event = this.map[dateIndex] && this.map[dateIndex][timeIndex] ?
            this.map[dateIndex][timeIndex] : 'enabled';
        if (event.ddStatusUse === 'reserve') {
            return '预留用途：' + event.obligateInfo;
        }
        else {
            return '';
        }
    };
    /**
     * @param {?} dateIndex
     * @param {?} timeIndex
     * @return {?}
     */
    MonthViewComponent.prototype.getMenu = /**
     * @param {?} dateIndex
     * @param {?} timeIndex
     * @return {?}
     */
    function (dateIndex, timeIndex) {
        var /** @type {?} */ status = this.map[dateIndex] && this.map[dateIndex][timeIndex] ?
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
    };
    /**
     * @param {?} index
     * @param {?} x
     * @return {?}
     */
    MonthViewComponent.prototype.openConfim = /**
     * @param {?} index
     * @param {?} x
     * @return {?}
     */
    function (index, x) {
        var _this = this;
        this.dialog.open(ConfirmEntryComponent, {
            width: '25%',
            data: {
                actions: this.getMenu(index, x)
            }
        })
            .afterClosed()
            .filter(function (_) { return _; })
            .subscribe(function (_) {
            _this.changeStatus(index, x, _);
        });
    };
    /**
     * @param {?} dateIndex
     * @param {?} timeIndex
     * @param {?} status
     * @return {?}
     */
    MonthViewComponent.prototype.changeStatus = /**
     * @param {?} dateIndex
     * @param {?} timeIndex
     * @param {?} status
     * @return {?}
     */
    function (dateIndex, timeIndex, status) {
        var _this = this;
        var /** @type {?} */ data = {
            dtUse: moment(this.viewDate).date(this.days[dateIndex]).format('YYYY-MM-DD'),
            ddTimeFrame: this.TIME[timeIndex].key,
            ddStatusUse: status,
            who: '',
            obligateInfo: ''
        };
        if (data.ddStatusUse === 'reserve') {
            this.notificationService.prompt('请填写预留用途').filter(function (_) { return _; })
                .subscribe(function (_) {
                data.who = JSON.parse(localStorage.getItem('user') || "{id:null}").id;
                data.obligateInfo = _;
                _this.selectEvent.emit(data);
            });
        }
        else {
            this.selectEvent.emit(data);
        }
    };
    /**
     * @return {?}
     */
    MonthViewComponent.prototype.enabledMonth = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ data = {
            status: 'enabled',
            dtUse: moment(this.viewDate).format('YYYY-MM-DD'),
            TIME: this.TIME
        };
        this.monthStatus.emit(data);
    };
    /**
     * @return {?}
     */
    MonthViewComponent.prototype.disabledMonth = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ data = {
            status: 'disabled',
            dtUse: moment(this.viewDate).format('YYYY-MM-DD'),
            TIME: this.TIME
        };
        this.monthStatus.emit(data);
    };
    MonthViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-month-view',
                    template: "<div layout=\"column\" style=\"margin:0 10px 10px 10px\"> <div flex layout=\"row\" layout-margin> <div layout=\"row\" layout-margin layout-align=\"center center\"> <button flex mat-icon-button matTooltip=\"上一月\" matTooltipPosition=\"above\" (click)=\"preMonth()\"> <mat-icon>chevron_left</mat-icon> </button> <mat-form-field (click)=\"picker.open()\" style=\"margin-left:20px\"> <input matInput [matDatepicker]=\"picker\" placeholder=\"选择月份\" readonly [value]=\"viewDate\"> <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle> </mat-form-field> <mat-datepicker #picker startView=\"year\" [startAt]=\"viewDate\" (selectedChanged)=\"change($event)\"></mat-datepicker> <button flex mat-icon-button matTooltip=\"下一月\" matTooltipPosition=\"above\" (click)=\"nextMonth()\"> <mat-icon>chevron_right</mat-icon> </button> </div> <span flex></span> <button mat-button (click)=\"enabledMonth()\"> <mat-icon color=\"accent\">camera</mat-icon>启用本月 </button> <button mat-button (click)=\"disabledMonth()\"> <mat-icon color=\"warn\">block</mat-icon>关闭本月 </button> <span flex></span> <div layout=\"row\" layout-margin layout-align=\"center center\"> <ng-template ngFor [ngForOf]=\"STATUS\" let-s> <div style=\"width:20px;height:20px;margin:0 10px\" [style.background]=\"color[s.key]\"></div>{{s.value}} </ng-template> </div> </div> <mat-grid-list flex cols=\"8\" rowHeight=\"40px\" class=\"calendar-title\"> <mat-grid-tile colspan=\"1\" rowspan=\"1\" [style.background]=\"columnBgColor\" [style.color]=\"columnColor\">时间段</mat-grid-tile> <mat-grid-tile *ngFor=\"let w of WEEK\" colspan=\"1\" rowspan=\"1\" [style.background]=\"columnBgColor\" [style.color]=\"columnColor\">{{w}}</mat-grid-tile> </mat-grid-list> <mat-divider></mat-divider> <div flex class=\"calendar-body\"> <mat-grid-list flex cols=\"8\" rowHeight=\"30px\"> <ng-template ngFor [ngForOf]=\"days\" let-d let-index=\"index\"> <mat-grid-tile *ngIf=\"index%7===0\" colspan=\"1\" rowspan=\"1\" [style.background]=\"rowHeadBgColor\" [style.color]=\"rowHeadColor\">{{TIME[0]?.value}}</mat-grid-tile> <mat-grid-tile colspan=\"1\" [rowspan]=\"TIME.length\"> <div *ngIf=\"index<viewStart || index>viewEnd\" style=\"width:100%;height:100%\" [style.background]=\"disabledCellBgColor\" [style.color]=\"disabledCellColor\" layout=\"row\" layout-align=\"center center\"> <div flex=\"45\"></div> <span flex>{{d}}</span> <div flex=\"45\"></div> </div> <!-- <mat-menu #menu=\"matMenu\"> <button mat-menu-item *ngFor=\"let m of getMenu(index, x)\" (click)=\"changeStatus(index, x, m.key)\">{{m.label}}</button> </mat-menu> --> <div *ngIf=\"index>=viewStart && index<=viewEnd\" class=\"column\"> <ng-template ngFor [ngForOf]=\"TIME\" let-time let-x=\"index\"> <button flex style=\"line-height:30px;width:100%\" [ngStyle]=\"{'border-top':x===0?'solid white 2px':'solid white 1px'}\" mat-button [style.background]=\"getColor(index, x)\" [matTooltip]=\"getTooltip(index, x)\" (click)=\"openConfim(index, x)\" matTooltipPosition=\"above\"> <span *ngIf=\"x===1\">{{d}}</span> <mat-icon *ngIf=\"x!==1\"></mat-icon> </button> </ng-template> </div> </mat-grid-tile> <ng-template *ngIf=\"(index+1)%7===0\" ngFor [ngForOf]=\"TIME\" let-t let-i=\"index\"> <mat-grid-tile *ngIf=\"!(i===0)\" colspan=\"1\" rowspan=\"1\" [style.background]=\"rowHeadBgColor\" [style.color]=\"rowHeadColor\">{{t.value}}</mat-grid-tile> </ng-template> </ng-template> </mat-grid-list> </div> </div> ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MonthViewComponent.ctorParameters = function () { return [
        { type: HttpUtilService, },
        { type: NotificationService, },
        { type: ChangeDetectorRef, },
        { type: MatDialog, },
        { type: DateAdapter, },
    ]; };
    MonthViewComponent.propDecorators = {
        "viewDate": [{ type: Input },],
        "events": [{ type: Input },],
        "selectEvent": [{ type: Output },],
        "monthStatus": [{ type: Output },],
    };
    return MonthViewComponent;
}());
export { MonthViewComponent };
function MonthViewComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MonthViewComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MonthViewComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MonthViewComponent.propDecorators;
    /** @type {?} */
    MonthViewComponent.prototype.viewDate;
    /** @type {?} */
    MonthViewComponent.prototype._events;
    /** @type {?} */
    MonthViewComponent.prototype.selectEvent;
    /** @type {?} */
    MonthViewComponent.prototype.monthStatus;
    /** @type {?} */
    MonthViewComponent.prototype.WEEK;
    /** @type {?} */
    MonthViewComponent.prototype.TIME;
    /** @type {?} */
    MonthViewComponent.prototype.STATUS;
    /** @type {?} */
    MonthViewComponent.prototype.days;
    /** @type {?} */
    MonthViewComponent.prototype.map;
    /** @type {?} */
    MonthViewComponent.prototype.viewStart;
    /** @type {?} */
    MonthViewComponent.prototype.viewEnd;
    /** @type {?} */
    MonthViewComponent.prototype.color;
    /** @type {?} */
    MonthViewComponent.prototype.rowHeadColor;
    /** @type {?} */
    MonthViewComponent.prototype.rowHeadBgColor;
    /** @type {?} */
    MonthViewComponent.prototype.columnColor;
    /** @type {?} */
    MonthViewComponent.prototype.columnBgColor;
    /** @type {?} */
    MonthViewComponent.prototype.disabledCellColor;
    /** @type {?} */
    MonthViewComponent.prototype.disabledCellBgColor;
    /** @type {?} */
    MonthViewComponent.prototype.httpUtilService;
    /** @type {?} */
    MonthViewComponent.prototype.notificationService;
    /** @type {?} */
    MonthViewComponent.prototype.cdr;
    /** @type {?} */
    MonthViewComponent.prototype.dialog;
}
