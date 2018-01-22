/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { fusejs as Fuse } from "../../../../util/fuse-js";
import { Observable } from "rxjs/Observable";
var MhDynamicSelectEntryComponent = (function () {
    function MhDynamicSelectEntryComponent(dialogRef, dialogData) {
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this.selections = [];
        this.multiple = false;
        this.title = '';
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
    MhDynamicSelectEntryComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.selections = this.dialogData.selections;
        this.multiple = this.dialogData.multiple;
        this.title = this.dialogData.title;
        var /** @type {?} */ data = this.dialogData.default;
        if (this.multiple) {
            for (var _i = 0, _a = this.selections; _i < _a.length; _i++) {
                var selection = _a[_i];
                selection.checked = false;
            }
            if (Array.isArray(data)) {
                for (var _b = 0, data_1 = data; _b < data_1.length; _b++) {
                    var d = data_1[_b];
                    for (var /** @type {?} */ i = 0; i < this.selections.length; i++) {
                        if (this.selections[i].key === d) {
                            this.selections[i].checked = true;
                            break;
                        }
                    }
                }
            }
        }
        this.initFuse();
    };
    /**
     * @return {?}
     */
    MhDynamicSelectEntryComponent.prototype.initFuse = /**
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
     * @param {?} item
     * @return {?}
     */
    MhDynamicSelectEntryComponent.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.dialogRef.close(item);
    };
    /**
     * @param {?} selection
     * @return {?}
     */
    MhDynamicSelectEntryComponent.prototype.multChange = /**
     * @param {?} selection
     * @return {?}
     */
    function (selection) {
        selection.checked = !selection.checked;
    };
    /**
     * @return {?}
     */
    MhDynamicSelectEntryComponent.prototype.multSelect = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ arr = [];
        for (var _i = 0, _a = this.selections; _i < _a.length; _i++) {
            var selection = _a[_i];
            if (selection.checked) {
                arr.push(selection);
            }
        }
        this.dialogRef.close(arr);
    };
    /**
     * @return {?}
     */
    MhDynamicSelectEntryComponent.prototype.clear = /**
     * @return {?}
     */
    function () {
        if (this.multiple) {
            this.dialogRef.close([{ key: null, value: '' }]);
        }
        else {
            this.dialogRef.close({ key: null, value: '' });
        }
    };
    MhDynamicSelectEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-select-entry',
                    template: "<h4 mat-dialog-title>{{title}}</h4> <mat-dialog-content> <div layout=\"row\" class=\"entry-search\"> <mat-form-field flex=\"80\"> <input matInput type=\"text\" [(ngModel)]=\"searchTerm\" placeholder=\"请输入查询条件\"> </mat-form-field> <button flex=\"10\" *ngIf=\"!multiple\" flex-offset=\"10\" mat-icon-button matTooltip=\"清空\" matTooltipPosition=\"above\" (click)=\"clear()\"><mat-icon color=\"warn\">close</mat-icon></button> <button flex=\"10\" *ngIf=\"multiple\" mat-icon-button matTooltip=\"清空\" matTooltipPosition=\"above\" (click)=\"clear()\"><mat-icon color=\"warn\">close</mat-icon></button> <button flex=\"10\" *ngIf=\"multiple\" mat-icon-button matTooltip=\"确认\" matTooltipPosition=\"above\" (click)=\"multSelect()\"><mat-icon color=\"accent\">check</mat-icon></button> </div> <mat-nav-list> <td-virtual-scroll-container [style.height.vh]=\"55\" [data]=\"selections\"> <ng-template let-selection=\"row\" let-index=\"index\" let-last=\"last\" tdVirtualScrollRow> <mat-list-item *ngIf=\"!multiple\" (click)=\"select(selection)\"> {{selection.value}} </mat-list-item> <mat-list-item *ngIf=\"multiple\" (click)=\"multChange(selection)\"> <mat-checkbox [(ngModel)]=\"selection.checked\" color=\"primary\" (click)=\"multChange(selection)\"> <span>{{selection.value}}</span> </mat-checkbox> </mat-list-item> <mat-divider *ngIf=\"!last\"></mat-divider> </ng-template> </td-virtual-scroll-container> </mat-nav-list> </mat-dialog-content> "
                },] },
    ];
    /** @nocollapse */
    MhDynamicSelectEntryComponent.ctorParameters = function () { return [
        { type: MatDialogRef, },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
    ]; };
    return MhDynamicSelectEntryComponent;
}());
export { MhDynamicSelectEntryComponent };
function MhDynamicSelectEntryComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicSelectEntryComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicSelectEntryComponent.ctorParameters;
    /** @type {?} */
    MhDynamicSelectEntryComponent.prototype.selections;
    /** @type {?} */
    MhDynamicSelectEntryComponent.prototype.multiple;
    /** @type {?} */
    MhDynamicSelectEntryComponent.prototype.title;
    /** @type {?} */
    MhDynamicSelectEntryComponent.prototype.fuse;
    /** @type {?} */
    MhDynamicSelectEntryComponent.prototype.backupSelections;
    /** @type {?} */
    MhDynamicSelectEntryComponent.prototype.searchTerm;
    /** @type {?} */
    MhDynamicSelectEntryComponent.prototype.fuseOptions;
    /** @type {?} */
    MhDynamicSelectEntryComponent.prototype.dialogRef;
    /** @type {?} */
    MhDynamicSelectEntryComponent.prototype.dialogData;
}
