var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NativeDateAdapter } from "@angular/material";
import { moment } from "../../../util/moment";
var MhDateAdapter = (function (_super) {
    __extends(MhDateAdapter, _super);
    function MhDateAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    MhDateAdapter.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    function (date, displayFormat) {
        return moment(date).format('YYYY-MM-DD');
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MhDateAdapter.prototype.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value === 'string' && value.length <= 0) {
            return null;
        }
        return moment(value).toDate();
    };
    return MhDateAdapter;
}(NativeDateAdapter));
export { MhDateAdapter };
