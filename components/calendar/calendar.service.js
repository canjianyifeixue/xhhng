/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { WeekEntryComponent } from "./week-entry.component";
var MhCalendarService = (function () {
    function MhCalendarService(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?} opt
     * @return {?}
     */
    MhCalendarService.prototype.openWeekView = /**
     * @param {?} opt
     * @return {?}
     */
    function (opt) {
        return this.dialog.open(WeekEntryComponent, {
            width: '80%',
            data: {
                title: opt.title || '场地选择',
                ddCampus: opt.ddCampus
            }
        }).afterClosed().filter(function (_) { return _; });
    };
    MhCalendarService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MhCalendarService.ctorParameters = function () { return [
        { type: MatDialog, },
    ]; };
    return MhCalendarService;
}());
export { MhCalendarService };
function MhCalendarService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhCalendarService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhCalendarService.ctorParameters;
    /** @type {?} */
    MhCalendarService.prototype.dialog;
}
