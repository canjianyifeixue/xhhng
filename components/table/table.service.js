/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { TableEntryComponent } from "./table-entry.component";
import { MatDialog } from "@angular/material";
var TableService = (function () {
    function TableService(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?} opt
     * @return {?}
     */
    TableService.prototype.openTable = /**
     * @param {?} opt
     * @return {?}
     */
    function (opt) {
        return this.dialog.open(TableEntryComponent, {
            width: opt.width || '70%',
            data: {
                label: opt.label || '表格',
                data: opt.data || [],
                columns: opt.columns || null,
                select: opt.select || false,
                multiple: opt.multiple || false,
            }
        }).afterClosed().filter(function (_) { return _; });
    };
    TableService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TableService.ctorParameters = function () { return [
        { type: MatDialog, },
    ]; };
    return TableService;
}());
export { TableService };
function TableService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TableService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TableService.ctorParameters;
    /** @type {?} */
    TableService.prototype.dialog;
}
