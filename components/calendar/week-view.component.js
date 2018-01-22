/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { TdDataTableService } from "@covalent/core";
import { HttpUtilService } from "../../services/index";
import { Observable } from "rxjs/Observable";
import { moment } from "../../util/moment";
import { DateAdapter } from "@angular/material";
var WeekViewComponent = (function () {
    function WeekViewComponent(_dataTableService, httpUtilService, cdr, dateAdapter) {
        this._dataTableService = _dataTableService;
        this.httpUtilService = httpUtilService;
        this.cdr = cdr;
        this.select = new EventEmitter();
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
        this.TIME = [];
        this.STATUS = [];
        this.days = [];
        this.events = [];
        this.map = [];
        this.places = [];
        this.cols = 8;
        this.filteredData = [];
        this.filteredTotal = 0;
        this.fromRow = 1;
        this.currentPage = 1;
        this.pageSize = 5;
        dateAdapter.setLocale('zh-CN');
    }
    /**
     * @return {?}
     */
    WeekViewComponent.prototype.detectChanges = /**
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
    WeekViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ time$ = this.httpUtilService.getDictionaryData('05d588c8-1cf4-478f-861a-08746bc9eee8');
        var /** @type {?} */ status$ = this.httpUtilService.getDictionaryData('3f0b06e5-8c7e-4138-8a33-3e2b25eb5351');
        var /** @type {?} */ place$ = this.httpUtilService.getTableData('453069c1-cff7-4952-8ece-196cc5333be2', { ddCampus: this.ddCampus });
        Observable.combineLatest(time$, status$, place$).subscribe(function (_) {
            _this.TIME = _[0];
            _this.STATUS = _[1];
            _this.places = _[2].items;
            _this.init();
            _this.detectChanges();
        });
    };
    /**
     * @return {?}
     */
    WeekViewComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.events = [];
        if (this.places.length <= 0) {
            this.cols = 8 * this.TIME.length;
            this.dateChange(this.viewDate);
        }
        var _loop_1 = function (i) {
            var /** @type {?} */ p = this_1.places[i];
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
        for (var /** @type {?} */ i = 0; i < this.places.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    WeekViewComponent.prototype.dateChange = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.viewDate = new Date(date);
        var /** @type {?} */ day = moment(date).format('e');
        var /** @type {?} */ sunday = moment(date).subtract(day, 'days');
        var /** @type {?} */ days = [];
        for (var /** @type {?} */ i = 0; i < 7; i++) {
            var /** @type {?} */ d = moment(sunday).add(i, 'days').format('YYYY-MM-DD');
            days.push({ date: d });
        }
        this.days = days;
        this.filter();
    };
    /**
     * @return {?}
     */
    WeekViewComponent.prototype.preWeek = /**
     * @return {?}
     */
    function () {
        this.dateChange(moment(this.viewDate).subtract(7, 'days'));
    };
    /**
     * @return {?}
     */
    WeekViewComponent.prototype.nextWeek = /**
     * @return {?}
     */
    function () {
        this.dateChange(moment(this.viewDate).add(7, 'days'));
    };
    /**
     * @param {?} pagingEvent
     * @return {?}
     */
    WeekViewComponent.prototype.page = /**
     * @param {?} pagingEvent
     * @return {?}
     */
    function (pagingEvent) {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
        this.filter();
    };
    /**
     * @return {?}
     */
    WeekViewComponent.prototype.filter = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ newData = this.places;
        this.filteredTotal = newData.length;
        newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
        this.filteredData = newData;
        this.initMap();
    };
    /**
     * @return {?}
     */
    WeekViewComponent.prototype.initMap = /**
     * @return {?}
     */
    function () {
        this.map = [];
        for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
            var e = _a[_i];
            var /** @type {?} */ date = moment(e.dtUse).format('YYYY-MM-DD');
            var /** @type {?} */ time = e.ddTimeFrame;
            var /** @type {?} */ rowIndex = this.findRowIndex(e.ddPlace);
            var /** @type {?} */ dateIndex = this.findDateIndex(date);
            var /** @type {?} */ timeIndex = this.findTimeIndex(time);
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
    /**
     * @param {?} place
     * @return {?}
     */
    WeekViewComponent.prototype.findRowIndex = /**
     * @param {?} place
     * @return {?}
     */
    function (place) {
        for (var /** @type {?} */ i = 0; i < this.filteredData.length; i++) {
            if (this.filteredData[i].id === place) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    WeekViewComponent.prototype.findDateIndex = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        for (var /** @type {?} */ i = 0; i < this.days.length; i++) {
            if (this.days[i].date === date) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @param {?} time
     * @return {?}
     */
    WeekViewComponent.prototype.findTimeIndex = /**
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
     * @param {?} rowIndex
     * @param {?} dateIndex
     * @param {?} timeIndex
     * @return {?}
     */
    WeekViewComponent.prototype.getColor = /**
     * @param {?} rowIndex
     * @param {?} dateIndex
     * @param {?} timeIndex
     * @return {?}
     */
    function (rowIndex, dateIndex, timeIndex) {
        return this.map[rowIndex] && this.map[rowIndex][dateIndex] && this.map[rowIndex][dateIndex][timeIndex] ?
            this.color[this.map[rowIndex][dateIndex][timeIndex].ddStatusUse] : this.color["enabled"];
    };
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    WeekViewComponent.prototype.getTooltip = /**
     * @param {?} rowIndex
     * @return {?}
     */
    function (rowIndex) {
        var /** @type {?} */ data = this.filteredData[rowIndex];
        return "\u5730\u5740\uFF1A" + data.address + "    \u89C4\u6A21\uFF1A" + data.placeScale + "    \u63CF\u8FF0\uFF1A" + data.descPlace;
    };
    /**
     * @param {?} rowIndex
     * @param {?} dateIndex
     * @param {?} timeIndex
     * @return {?}
     */
    WeekViewComponent.prototype.apply = /**
     * @param {?} rowIndex
     * @param {?} dateIndex
     * @param {?} timeIndex
     * @return {?}
     */
    function (rowIndex, dateIndex, timeIndex) {
        var /** @type {?} */ data = {
            ddPlace: this.filteredData[rowIndex].ddPlace,
            descPlace: this.filteredData[rowIndex].descPlace,
            address: this.filteredData[rowIndex].address,
            dtUse: this.days[dateIndex].date,
            ddTimeFrame: this.TIME[timeIndex].key
        };
        this.select.emit(data);
    };
    WeekViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-week-view',
                    template: "<div layout=\"column\" style=\"margin:0 10px 10px 10px\"> <div flex layout=\"row\" layout-margin> <div layout=\"row\" layout-margin layout-align=\"center center\"> <button flex mat-icon-button matTooltip=\"上一周\" matTooltipPosition=\"above\" (click)=\"preWeek()\"><mat-icon>chevron_left</mat-icon></button> <mat-form-field (click)=\"picker.open()\" style=\"margin-left:20px\"> <input matInput [matDatepicker]=\"picker\" placeholder=\"选择日期\" readonly [value]=\"viewDate\"> <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle> </mat-form-field> <mat-datepicker #picker [startAt]=\"viewDate\" (selectedChanged)=\"dateChange($event)\"></mat-datepicker> <button flex mat-icon-button matTooltip=\"下一周\" matTooltipPosition=\"above\" (click)=\"nextWeek()\"><mat-icon>chevron_right</mat-icon></button> </div> <span flex></span> <div layout=\"row\" layout-margin layout-align=\"center center\"> <ng-template ngFor [ngForOf]=\"STATUS\" let-s> <div style=\"width:20px;height:20px;margin:0 10px\" [style.background]=\"color[s.key]\"></div>{{s.value}} </ng-template> </div> </div> <mat-grid-list [cols]=\"cols\" rowHeight=\"40px\"> <mat-grid-tile [colspan]=\"TIME.length\" rowspan=\"1\" [style.background]=\"headBgColor\" [style.color]=\"headColor\"></mat-grid-tile> <mat-grid-tile *ngFor=\"let day of days\" [colspan]=\"TIME.length\" rowspan=\"1\" [style.background]=\"headBgColor\" [style.color]=\"headColor\"> {{day.date}} </mat-grid-tile> </mat-grid-list> <mat-divider></mat-divider> <mat-grid-list [cols]=\"cols\" rowHeight=\"30px\"> <mat-grid-tile [colspan]=\"TIME.length\" rowspan=\"1\" [style.background]=\"subBgColor\" [style.color]=\"subColor\"></mat-grid-tile> <ng-template ngFor [ngForOf]=\"days\" let-day> <mat-grid-tile *ngFor=\"let time of TIME;let i=index\" colspan=\"1\" rowspan=\"1\" [style.background]=\"subBgColor\" [style.color]=\"subColor\"> {{TIME[i].value}} </mat-grid-tile> </ng-template> </mat-grid-list> <mat-divider></mat-divider> <ng-template *ngIf=\"places.length > 0\" ngFor [ngForOf]=\"filteredData\" let-item let-index=\"index\" let-last=\"last\"> <mat-grid-list [cols]=\"cols\" rowHeight=\"50px\"> <mat-grid-tile [colspan]=\"TIME.length\" rowspan=\"1\" [matTooltip]=\"getTooltip(index)\" matTooltipPosition=\"above\" [style.background]=\"rowHeadBgColor\" [style.color]=\"rowHeadColor\">{{item.ddPlace}}</mat-grid-tile> <ng-template ngFor [ngForOf]=\"days\" let-day let-ind=\"index\"> <mat-grid-tile *ngFor=\"let t of TIME;let i=index\" colspan=\"1\" rowspan=\"1\" [style.background]=\"getColor(index, ind ,i)\"> <button mat-button flex style=\"width:100%;height:100%\" [disabled]=\"getColor(index, ind ,i)!==color.enabled\" (click)=\"apply(index, ind ,i)\"></button> </mat-grid-tile> </ng-template> </mat-grid-list> <mat-divider></mat-divider> </ng-template> <div *ngIf=\"places.length <= 0\" layout=\"row\" layout-align=\"center center\"><h3>暂无场地</h3></div> <td-paging-bar #pagingBar [total]=\"filteredTotal\" [pageSize]=\"pageSize\" (change)=\"page($event)\"> <span td-paging-bar-label hide-xs>每行显示:</span> <mat-select [style.width.px]=\"50\" [(ngModel)]=\"pageSize\"> <mat-option *ngFor=\"let size of [5,10,15,20,50]\" [value]=\"size\"> {{size}} </mat-option> </mat-select> <span>{{'第 '+pagingBar.range+' 条   共 '+pagingBar.total+' 条'}}</span> </td-paging-bar> </div> ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    WeekViewComponent.ctorParameters = function () { return [
        { type: TdDataTableService, },
        { type: HttpUtilService, },
        { type: ChangeDetectorRef, },
        { type: DateAdapter, },
    ]; };
    WeekViewComponent.propDecorators = {
        "ddCampus": [{ type: Input },],
        "select": [{ type: Output },],
    };
    return WeekViewComponent;
}());
export { WeekViewComponent };
function WeekViewComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WeekViewComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WeekViewComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WeekViewComponent.propDecorators;
    /** @type {?} */
    WeekViewComponent.prototype.ddCampus;
    /** @type {?} */
    WeekViewComponent.prototype.select;
    /** @type {?} */
    WeekViewComponent.prototype.viewDate;
    /** @type {?} */
    WeekViewComponent.prototype.headColor;
    /** @type {?} */
    WeekViewComponent.prototype.headBgColor;
    /** @type {?} */
    WeekViewComponent.prototype.subColor;
    /** @type {?} */
    WeekViewComponent.prototype.subBgColor;
    /** @type {?} */
    WeekViewComponent.prototype.rowHeadColor;
    /** @type {?} */
    WeekViewComponent.prototype.rowHeadBgColor;
    /** @type {?} */
    WeekViewComponent.prototype.color;
    /** @type {?} */
    WeekViewComponent.prototype.TIME;
    /** @type {?} */
    WeekViewComponent.prototype.STATUS;
    /** @type {?} */
    WeekViewComponent.prototype.days;
    /** @type {?} */
    WeekViewComponent.prototype.events;
    /** @type {?} */
    WeekViewComponent.prototype.map;
    /** @type {?} */
    WeekViewComponent.prototype.places;
    /** @type {?} */
    WeekViewComponent.prototype.cols;
    /** @type {?} */
    WeekViewComponent.prototype.filteredData;
    /** @type {?} */
    WeekViewComponent.prototype.filteredTotal;
    /** @type {?} */
    WeekViewComponent.prototype.fromRow;
    /** @type {?} */
    WeekViewComponent.prototype.currentPage;
    /** @type {?} */
    WeekViewComponent.prototype.pageSize;
    /** @type {?} */
    WeekViewComponent.prototype._dataTableService;
    /** @type {?} */
    WeekViewComponent.prototype.httpUtilService;
    /** @type {?} */
    WeekViewComponent.prototype.cdr;
}
