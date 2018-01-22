"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var moment_1 = require("../../util/moment");
var WeekViewComponent = /** @class */ (function () {
    function WeekViewComponent(_dataTableService, httpUtilService, cdr, dateAdapter) {
        this._dataTableService = _dataTableService;
        this.httpUtilService = httpUtilService;
        this.cdr = cdr;
        this.select = new core_1.EventEmitter();
        this.viewDate = new Date();
        this.headColor = 'white';
        this.headBgColor = '#97d8a3';
        this.subColor = 'white';
        this.subBgColor = '#97d8a3';
        this.rowHeadColor = 'white';
        this.rowHeadBgColor = '#97d8a3';
        this.color = {
            enabled: '#fde9d9',
            disabled: '#FF6666',
            reserve: '#FFA726'
        };
        this.TIME = []; // 时间段
        this.STATUS = []; // 场地状态
        this.days = []; // 日期
        this.events = []; //
        this.map = []; //
        this.places = []; // 场地列表
        this.cols = 8;
        this.filteredData = [];
        this.filteredTotal = 0;
        this.fromRow = 1;
        this.currentPage = 1;
        this.pageSize = 5;
        dateAdapter.setLocale('zh-CN');
    }
    WeekViewComponent.prototype.detectChanges = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.cdr !== null &&
                _this.cdr !== undefined &&
                !_this.cdr.destroyed) {
                _this.cdr.detectChanges();
            }
        }, 250);
    };
    WeekViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        var time$ = this.httpUtilService.getDictionaryData('05d588c8-1cf4-478f-861a-08746bc9eee8');
        var status$ = this.httpUtilService.getDictionaryData('3f0b06e5-8c7e-4138-8a33-3e2b25eb5351');
        var place$ = this.httpUtilService.getTableData('453069c1-cff7-4952-8ece-196cc5333be2', { ddCampus: this.ddCampus });
        Observable_1.Observable.combineLatest(time$, status$, place$).subscribe(function (_) {
            _this.TIME = _[0];
            _this.STATUS = _[1];
            _this.places = _[2].items;
            _this.init();
            _this.detectChanges();
        });
    };
    WeekViewComponent.prototype.init = function () {
        var _this = this;
        this.events = [];
        if (this.places.length <= 0) {
            this.cols = 8 * this.TIME.length;
            this.dateChange(this.viewDate);
        }
        var _loop_1 = function (i) {
            var p = this_1.places[i];
            this_1.httpUtilService.getTableData('fb933538-292b-4613-b79e-6b961536289e', { ddPlace: p.id })
                .subscribe(function (_) {
                _.items.forEach(function (e) { return _this.events = _this.events.concat([e]); });
                if (i === _this.places.length - 1) {
                    _this.cols = 8 * _this.TIME.length;
                    _this.dateChange(_this.viewDate);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.places.length; i++) {
            _loop_1(i);
        }
    };
    WeekViewComponent.prototype.dateChange = function (date) {
        this.viewDate = new Date(date);
        var day = moment_1.moment(date).format('e');
        var sunday = moment_1.moment(date).subtract(day, 'days');
        var days = [];
        for (var i = 0; i < 7; i++) {
            var d = moment_1.moment(sunday).add(i, 'days').format('YYYY-MM-DD');
            days.push({ date: d });
        }
        this.days = days;
        this.filter();
    };
    WeekViewComponent.prototype.preWeek = function () {
        this.dateChange(moment_1.moment(this.viewDate).subtract(7, 'days'));
    };
    WeekViewComponent.prototype.nextWeek = function () {
        this.dateChange(moment_1.moment(this.viewDate).add(7, 'days'));
    };
    WeekViewComponent.prototype.page = function (pagingEvent) {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
        this.filter();
    };
    WeekViewComponent.prototype.filter = function () {
        var newData = this.places;
        this.filteredTotal = newData.length;
        newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
        this.filteredData = newData;
        this.initMap();
    };
    WeekViewComponent.prototype.initMap = function () {
        this.map = [];
        for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
            var e = _a[_i];
            var date = moment_1.moment(e.dtUse).format('YYYY-MM-DD');
            var time = e.ddTimeFrame;
            var rowIndex = this.findRowIndex(e.ddPlace);
            var dateIndex = this.findDateIndex(date);
            var timeIndex = this.findTimeIndex(time);
            if (rowIndex >= 0 && dateIndex >= 0 && timeIndex >= 0) {
                if (!this.map[rowIndex]) {
                    this.map[rowIndex] = [];
                }
                if (!this.map[rowIndex][dateIndex]) {
                    this.map[rowIndex][dateIndex] = [];
                }
                this.map[rowIndex][dateIndex][timeIndex] = e;
            }
        }
    };
    WeekViewComponent.prototype.findRowIndex = function (place) {
        for (var i = 0; i < this.filteredData.length; i++) {
            if (this.filteredData[i].id === place) {
                return i;
            }
        }
        return -1;
    };
    WeekViewComponent.prototype.findDateIndex = function (date) {
        for (var i = 0; i < this.days.length; i++) {
            if (this.days[i].date === date) {
                return i;
            }
        }
        return -1;
    };
    WeekViewComponent.prototype.findTimeIndex = function (time) {
        for (var i = 0; i < this.TIME.length; i++) {
            if (this.TIME[i].key === time) {
                return i;
            }
        }
        return -1;
    };
    WeekViewComponent.prototype.getColor = function (rowIndex, dateIndex, timeIndex) {
        return this.map[rowIndex] && this.map[rowIndex][dateIndex] && this.map[rowIndex][dateIndex][timeIndex] ?
            this.color[this.map[rowIndex][dateIndex][timeIndex].ddStatusUse] : this.color.enabled;
    };
    WeekViewComponent.prototype.getTooltip = function (rowIndex) {
        var data = this.filteredData[rowIndex];
        return "\u5730\u5740\uFF1A" + data.address + "    \u89C4\u6A21\uFF1A" + data.placeScale + "    \u63CF\u8FF0\uFF1A" + data.descPlace;
    };
    WeekViewComponent.prototype.apply = function (rowIndex, dateIndex, timeIndex) {
        var data = {
            ddPlace: this.filteredData[rowIndex].ddPlace,
            descPlace: this.filteredData[rowIndex].descPlace,
            address: this.filteredData[rowIndex].address,
            dtUse: this.days[dateIndex].date,
            ddTimeFrame: this.TIME[timeIndex].key
        };
        this.select.emit(data);
    };
    __decorate([
        core_1.Input()
    ], WeekViewComponent.prototype, "ddCampus", void 0);
    __decorate([
        core_1.Output()
    ], WeekViewComponent.prototype, "select", void 0);
    WeekViewComponent = __decorate([
        core_1.Component({
            selector: 'mh-week-view',
            templateUrl: './week-view.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })
    ], WeekViewComponent);
    return WeekViewComponent;
}());
exports.WeekViewComponent = WeekViewComponent;
