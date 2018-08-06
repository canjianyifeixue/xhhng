/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CascadSelectService } from "./cascad-select.service";
import { fusejs as Fuse } from "../../../../../util/fuse-js";
import { Observable } from "rxjs/Observable";
var MhCascadSelectEntryComponent = (function () {
    function MhCascadSelectEntryComponent(dialogRef, cascadSelectService, dialogData) {
        // this.cascadSelectService = new CascadSelectService(http);
        this.dialogRef = dialogRef;
        this.cascadSelectService = cascadSelectService;
        this.dialogData = dialogData;
        this.data = [];
        this.selections = [];
        this.selectedData = [];
        this.title = '';
        this.async = false;
        this.keyField = 'key';
        this.valueField = 'value';
        this.depth = 0;
        this.selectDepth = 0;
        this.backupSelections = [];
        this.searchTerm = '';
        this.fuseOptions = {
            threshold: 0.1,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 2,
            keys: [],
        };
    }
    /**
     * @return {?}
     */
    MhCascadSelectEntryComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
        }
        else {
            this.initSelection();
        }
    };
    /**
     * @return {?}
     */
    MhCascadSelectEntryComponent.prototype.initSelection = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.cascadSelectService.initSelection(this.data, this.selectedData, this.keyField).subscribe(function (_) {
            _this.selections = _.selections;
            _this.selectedData = _.selectedData;
            _this.initFuse();
        });
    };
    /**
     * @return {?}
     */
    MhCascadSelectEntryComponent.prototype.initAsyncSelection = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.cascadSelectService.initAsyncSelection(this.selectedData, this.data, this.selections, this.selectDepth, this.keyField, this.valueField).subscribe(function (_) {
            _this.selectDepth = _.selectDepth;
            _this.selectedData = _.selectedData;
            _this.selections = _.selections;
            _this.initFuse();
        });
    };
    /**
     * @param {?} arr
     * @return {?}
     */
    MhCascadSelectEntryComponent.prototype.loadAsyncSelection = /**
     * @param {?} arr
     * @return {?}
     */
    function (arr) {
        var _this = this;
        this.cascadSelectService.loadAsyncSelection(arr, this.selectedData, this.selections, this.selectDepth, this.keyField, this.valueField).subscribe(function (_) {
            _this.selectDepth = _.selectDepth;
            _this.selectedData = _.selectedData;
            _this.selections = _.selections;
            _this.initFuse();
        });
    };
    /**
     * @param {?} selection
     * @return {?}
     */
    MhCascadSelectEntryComponent.prototype.select = /**
     * @param {?} selection
     * @return {?}
     */
    function (selection) {
        var _this = this;
        this.selectedData = this.selectedData.concat([{ key: selection[this.keyField], value: selection[this.valueField] }]);
        if (this.async && this.depth > this.selectDepth + 1) {
            this.selectDepth += 1;
            this.cascadSelectService.loadAsyncData(this.data, this.selectDepth, selection[this.keyField]).subscribe(function (_) {
                _this.selections = _.items;
            });
            return;
        }
        if (!this.async && selection.children) {
            this.selections = selection.children;
            return;
        }
        this.dialogRef.close(this.selectedData);
        this.selectedData = [];
    };
    /**
     * @return {?}
     */
    MhCascadSelectEntryComponent.prototype.initFuse = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.fuseOptions.keys = ['key', 'value'];
        this.backupSelections = this.selections.slice();
        this.fuse = new Fuse(this.selections, this.fuseOptions);
        Observable.interval()
            .map(function (_) { return _this.searchTerm; })
            .distinctUntilChanged()
            .subscribe(function (_) {
            if (_ && _.length > 0) {
                _this.selections = _this.fuse.search(_this.searchTerm);
            }
            else {
                _this.selections = _this.backupSelections;
            }
        });
    };
    /**
     * @return {?}
     */
    MhCascadSelectEntryComponent.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.selectedData = [];
        this.dialogRef.close([]);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    MhCascadSelectEntryComponent.prototype.pop = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.selectedData = this.selectedData.slice(0, index);
        if (this.async) {
            var /** @type {?} */ arr = [this.cascadSelectService.loadAsyncData(this.data, 0)];
            for (var /** @type {?} */ i = 0; i < this.selectedData.length; i++) {
                arr.push(this.cascadSelectService.loadAsyncData(this.data, i + 1, this.selectedData[i].key));
            }
            this.loadAsyncSelection(arr);
        }
        else {
            this.initSelection();
        }
    };
    MhCascadSelectEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-cascad-select-entry',
                    template: "<h4 mat-dialog-title>{{title}}</h4> <mat-dialog-content> <div layout=\"row\" class=\"entry-search\"> <mat-form-field flex=\"90\"> <input matInput type=\"text\" [(ngModel)]=\"searchTerm\" placeholder=\"请输入查询条件\"> </mat-form-field> <button flex=\"10\" flex-offset=\"10\" mat-icon-button matTooltip=\"清空\" matTooltipPosition=\"above\" (click)=\"clear()\"><mat-icon color=\"warn\">close</mat-icon></button> </div> <div> <span *ngFor=\"let s of selectedData;let last=last;let index=index\"> <a (click)=\"pop(index)\">{{s.value}}</a> <span *ngIf=\"!last\">/</span> </span> </div> <mat-nav-list> <td-virtual-scroll-container [style.height.vh]=\"52\" [data]=\"selections\"> <ng-template let-selection=\"row\" let-index=\"index\" let-last=\"last\" tdVirtualScrollRow> <mat-list-item (click)=\"select(selection)\"> {{selection[valueField]}} </mat-list-item> <mat-divider *ngIf=\"!last\"></mat-divider> </ng-template> </td-virtual-scroll-container> </mat-nav-list> </mat-dialog-content> ",
                    providers: [CascadSelectService]
                },] },
    ];
    /** @nocollapse */
    MhCascadSelectEntryComponent.ctorParameters = function () { return [
        { type: MatDialogRef, },
        { type: CascadSelectService, },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
    ]; };
    return MhCascadSelectEntryComponent;
}());
export { MhCascadSelectEntryComponent };
function MhCascadSelectEntryComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhCascadSelectEntryComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhCascadSelectEntryComponent.ctorParameters;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.data;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.selections;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.selectedData;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.title;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.async;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.keyField;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.valueField;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.depth;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.selectDepth;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.fuse;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.backupSelections;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.searchTerm;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.fuseOptions;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.dialogRef;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.cascadSelectService;
    /** @type {?} */
    MhCascadSelectEntryComponent.prototype.dialogData;
}
