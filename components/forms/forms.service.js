/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DynamicEntryComponent } from "./dynamic-form/index";
import { StepEntryComponent } from "./step-form/index";
import { SearchEntryComponent } from "./search-form/index";
var MhFormsService = (function () {
    function MhFormsService(dialog) {
        this.dialog = dialog;
    }
    /**
     * 打开动态表单
     * elements:动态表单ID
     * default:动态表单默认值(属性数等于组件数)
     * @param {?} opt
     *
     * @return {?}
     */
    MhFormsService.prototype.openDynamicForm = /**
     * 打开动态表单
     * elements:动态表单ID
     * default:动态表单默认值(属性数等于组件数)
     * @param {?} opt
     *
     * @return {?}
     */
    function (opt) {
        return this.dialog.open(DynamicEntryComponent, {
            width: opt.width || '70%',
            data: {
                title: opt.title || '动态表单',
                elements: opt.elements || [],
                default: opt.default || null,
                showActions: opt.showActions,
            }
        }).afterClosed().filter(function (_) { return _; });
    };
    /**
     * 打开步骤表单
     * @param {?} opt
     * @return {?}
     */
    MhFormsService.prototype.openStepForm = /**
     * 打开步骤表单
     * @param {?} opt
     * @return {?}
     */
    function (opt) {
        return this.dialog.open(StepEntryComponent, {
            width: opt.width || '70%',
            data: {
                title: opt.title || '步骤表单',
                forms: opt.forms || [],
                default: opt.default || null,
                showActions: opt.showActions,
            }
        }).afterClosed().filter(function (_) { return _; });
    };
    /**
     * 打开查询表单
     * @param {?} opt
     * @return {?}
     */
    MhFormsService.prototype.openSearchForm = /**
     * 打开查询表单
     * @param {?} opt
     * @return {?}
     */
    function (opt) {
        return this.dialog.open(SearchEntryComponent, {
            width: opt.width || '70%',
            data: {
                title: opt.title || '查询表单',
                elements: opt.elements || [],
                default: opt.default || null,
                showActions: opt.showActions,
            }
        }).afterClosed().filter(function (_) { return _; });
    };
    MhFormsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MhFormsService.ctorParameters = function () { return [
        { type: MatDialog, },
    ]; };
    return MhFormsService;
}());
export { MhFormsService };
function MhFormsService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhFormsService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhFormsService.ctorParameters;
    /** @type {?} */
    MhFormsService.prototype.dialog;
}
