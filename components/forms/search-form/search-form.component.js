/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { HttpUtilService } from "../../../services/index";
import { DateAdapter } from "@angular/material";
/**
 * @record
 */
export function ISearchConfig() { }
function ISearchConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    ISearchConfig.prototype.name;
    /** @type {?} */
    ISearchConfig.prototype.label;
    /** @type {?} */
    ISearchConfig.prototype.type;
    /** @type {?|undefined} */
    ISearchConfig.prototype.selections;
}
var SearchFormComponent = (function () {
    function SearchFormComponent(httpUtilService, dateAdapter) {
        this.httpUtilService = httpUtilService;
        this._elements = [];
        this.value = {};
        this.selected = new EventEmitter();
        this.defaultValue = this.value;
        dateAdapter.setLocale('zh-CN');
    }
    Object.defineProperty(SearchFormComponent.prototype, "elements", {
        get: /**
         * @return {?}
         */
        function () {
            return this._elements;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var _this = this;
            v.forEach(function (c) {
                if (typeof c.selections === 'string') {
                    _this.httpUtilService.getDictionaryData(c.selections).subscribe(function (_) { return c.selections = _; });
                    c.selections = [];
                }
            });
            this._elements = v;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    SearchFormComponent.prototype.isObject = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'object';
    };
    /**
     * @param {?} value
     * @param {?} name
     * @return {?}
     */
    SearchFormComponent.prototype.dateSelect = /**
     * @param {?} value
     * @param {?} name
     * @return {?}
     */
    function (value, name) {
        this.value[name] = value;
        this.change();
    };
    /**
     * @return {?}
     */
    SearchFormComponent.prototype.change = /**
     * @return {?}
     */
    function () {
        this.selected.emit(this.value);
    };
    /**
     * @return {?}
     */
    SearchFormComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.value = this.defaultValue;
        this.change();
    };
    SearchFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-search-form',
                    template: "<form #searchForm=\"ngForm\"> <div layout=\"row\" layout-wrap layout-margin layout-align=\"start center\"> <div flex-xs=\"50\" flex-gt-xs=\"25\" layout=\"row\" *ngFor=\"let control of elements\" [ngSwitch]=\"control.type\"> <mat-checkbox flex=\"95\" (change)=\"change()\" *ngSwitchCase=\"'boolean'\" [(ngModel)]=\"value[control.name]\" [name]=\"control.name\"> {{control.label}} </mat-checkbox> <mat-form-field flex=\"95\" *ngSwitchCase=\"'enum'\"> <mat-select (change)=\"change()\" [name]=\"control.name\" [(ngModel)]=\"value[control.name]\" [placeholder]=\"control.label\"> <ng-template ngFor let-opt [ngForOf]=\"control.selections\"> <mat-option *ngIf=\"isObject(opt)\" [value]=\"opt.key\">{{opt.value}}</mat-option> <mat-option *ngIf=\"!isObject(opt)\" [value]=\"opt\">{{opt}}</mat-option> </ng-template> </mat-select> </mat-form-field> <mat-form-field flex=\"95\" *ngSwitchCase=\"'date'\" (click)=\"picker.open()\"> <input matInput [matDatepicker]=\"picker\" [name]=\"control.name\" [(ngModel)]=\"value[control.name]\" [placeholder]=\"control.label\" readonly> <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle> </mat-form-field> <mat-datepicker #picker (selectedChanged)=\"dateSelect($event,control.name)\"></mat-datepicker> </div> </div> </form> ",
                },] },
    ];
    /** @nocollapse */
    SearchFormComponent.ctorParameters = function () { return [
        { type: HttpUtilService, },
        { type: DateAdapter, },
    ]; };
    SearchFormComponent.propDecorators = {
        "elements": [{ type: Input, args: ['elements',] },],
        "value": [{ type: Input, args: ['value',] },],
        "selected": [{ type: Output, args: ['selected',] },],
    };
    return SearchFormComponent;
}());
export { SearchFormComponent };
function SearchFormComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SearchFormComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SearchFormComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SearchFormComponent.propDecorators;
    /** @type {?} */
    SearchFormComponent.prototype.defaultValue;
    /** @type {?} */
    SearchFormComponent.prototype._elements;
    /** @type {?} */
    SearchFormComponent.prototype.value;
    /** @type {?} */
    SearchFormComponent.prototype.selected;
    /** @type {?} */
    SearchFormComponent.prototype.httpUtilService;
}
