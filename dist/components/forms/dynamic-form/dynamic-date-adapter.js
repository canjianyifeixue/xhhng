"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = require("@angular/material");
var moment_1 = require("../../../util/moment");
var MhDateAdapter = /** @class */ (function (_super) {
    __extends(MhDateAdapter, _super);
    function MhDateAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MhDateAdapter.prototype.format = function (date, displayFormat) {
        return moment_1.moment(date).format('YYYY-MM-DD');
    };
    MhDateAdapter.prototype.parse = function (value) {
        if (typeof value === 'string' && value.length <= 0) {
            return null;
        }
        return moment_1.moment(value).toDate();
    };
    return MhDateAdapter;
}(material_1.NativeDateAdapter));
exports.MhDateAdapter = MhDateAdapter;
