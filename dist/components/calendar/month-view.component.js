"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var moment_1 = require("../../util/moment");
var Observable_1 = require("rxjs/Observable");
var confirm_entry_component_1 = require("./confirm-entry.component");
var MonthViewComponent = /** @class */ (function () {
    function MonthViewComponent(httpUtilService, notificationService, cdr, dialog, dateAdapter) {
        var _this = this;
        this.httpUtilService = httpUtilService;
        this.notificationService = notificationService;
        this.cdr = cdr;
        this.dialog = dialog;
        this.viewDate = new Date();
        this._events = [];
        this.selectEvent = new core_1.EventEmitter();
        this.monthStatus = new core_1.EventEmitter();
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
        var time$ = this.httpUtilService.getDictionaryData('05d588c8-1cf4-478f-861a-08746bc9eee8');
        var status$ = this.httpUtilService.getDictionaryData('3f0b06e5-8c7e-4138-8a33-3e2b25eb5351');
        Observable_1.Observable.combineLatest(time$, status$).subscribe(function (_) {
            _this.TIME = _[0];
            _this.STATUS = _[1];
            _this.init();
        });
    }
    Object.defineProperty(MonthViewComponent.prototype, "events", {
        get: function () {
            return this._events;
        },
        set: function (v) {
            this._events = v;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    MonthViewComponent.prototype.detectChanges = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.cdr !== null &&
                _this.cdr !== undefined &&
                !_this.cdr.destroyed) {
                _this.cdr.detectChanges();
            }
        }, 250);
    };
    MonthViewComponent.prototype.init = function () {
        this.change(this.viewDate);
        this.convertEvent(this.events);
        this.detectChanges();
    };
    MonthViewComponent.prototype.change = function (date) {
        this.viewDate = new Date(date);
        var days = [];
        var startOfMonth = moment_1.moment(date).startOf('month').format('YYYY-MM-DD');
        var endOfMonth = moment_1.moment(date).endOf('month').format('YYYY-MM-DD');
        for (var i = 1;; i++) {
            var s = i - 1 - moment_1.moment(startOfMonth).day();
            var d = moment_1.moment(startOfMonth).add(s, 'days');
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
    MonthViewComponent.prototype.preMonth = function () {
        var month = moment_1.moment(this.viewDate).month();
        var date = moment_1.moment(this.viewDate).month(month - 1);
        this.change(date);
        this.convertEvent(this.events);
    };
    MonthViewComponent.prototype.nextMonth = function () {
        var month = moment_1.moment(this.viewDate).month();
        var date = moment_1.moment(this.viewDate).month(month + 1);
        this.change(date);
        this.convertEvent(this.events);
    };
    MonthViewComponent.prototype.convertEvent = function (data) {
        this.map = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var d = data_1[_i];
            var date = d.dtUse;
            var time = d.ddTimeFrame;
            var dateIndex = this.findDateIndex(date);
            var timeIndex = this.findTimeIndex(time);
            if (dateIndex >= 0 && timeIndex >= 0) {
                if (!this.map[dateIndex]) {
                    this.map[dateIndex] = [];
                }
                this.map[dateIndex][timeIndex] = d;
            }
        }
    };
    MonthViewComponent.prototype.findDateIndex = function (date) {
        var d = moment_1.moment(date);
        var day = moment_1.moment(this.viewDate);
        var start = moment_1.moment().year(day.year()).month(day.month()).date(this.days[this.viewStart]);
        var end = moment_1.moment().year(day.year()).month(day.month()).date(this.days[this.viewEnd]);
        if ((d.format('YYYY-MM-DD') === start.format('YYYY-MM-DD') ||
            d.isSameOrAfter(start)) && d.isSameOrBefore(end)) {
            return d.date() + this.viewStart - 1;
        }
        return -1;
    };
    MonthViewComponent.prototype.findTimeIndex = function (time) {
        for (var i = 0; i < this.TIME.length; i++) {
            if (this.TIME[i].key === time) {
                return i;
            }
        }
        return -1;
    };
    MonthViewComponent.prototype.getColor = function (dateIndex, timeIndex) {
        return this.map[dateIndex] && this.map[dateIndex][timeIndex] ?
            this.color[this.map[dateIndex][timeIndex].ddStatusUse] : this.color.enabled;
    };
    MonthViewComponent.prototype.getTooltip = function (dateIndex, timeIndex) {
        var event = this.map[dateIndex] && this.map[dateIndex][timeIndex] ?
            this.map[dateIndex][timeIndex] : 'enabled';
        if (event.ddStatusUse === 'reserve') {
            return '预留用途：' + event.obligateInfo;
        }
        else {
            return '';
        }
    };
    MonthViewComponent.prototype.getMenu = function (dateIndex, timeIndex) {
        var status = this.map[dateIndex] && this.map[dateIndex][timeIndex] ?
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
    MonthViewComponent.prototype.openConfim = function (index, x) {
        var _this = this;
        this.dialog.open(confirm_entry_component_1.ConfirmEntryComponent, {
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
    MonthViewComponent.prototype.changeStatus = function (dateIndex, timeIndex, status) {
        var _this = this;
        var data = {
            dtUse: moment_1.moment(this.viewDate).date(this.days[dateIndex]).format('YYYY-MM-DD'),
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
    MonthViewComponent.prototype.enabledMonth = function () {
        var data = {
            status: 'enabled',
            dtUse: moment_1.moment(this.viewDate).format('YYYY-MM-DD'),
            TIME: this.TIME
        };
        this.monthStatus.emit(data);
    };
    MonthViewComponent.prototype.disabledMonth = function () {
        var data = {
            status: 'disabled',
            dtUse: moment_1.moment(this.viewDate).format('YYYY-MM-DD'),
            TIME: this.TIME
        };
        this.monthStatus.emit(data);
    };
    __decorate([
        core_1.Input()
    ], MonthViewComponent.prototype, "viewDate", void 0);
    __decorate([
        core_1.Input()
    ], MonthViewComponent.prototype, "events", null);
    __decorate([
        core_1.Output()
    ], MonthViewComponent.prototype, "selectEvent", void 0);
    __decorate([
        core_1.Output()
    ], MonthViewComponent.prototype, "monthStatus", void 0);
    MonthViewComponent = __decorate([
        core_1.Component({
            selector: 'mh-month-view',
            templateUrl: './month-view.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })
    ], MonthViewComponent);
    return MonthViewComponent;
}());
exports.MonthViewComponent = MonthViewComponent;
