"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ToolService = /** @class */ (function () {
    function ToolService() {
    }
    /**
     * params:
     * - before: object
     * - after: object
     *
     * 筛选出值不相等的属性，返回一个新对象
     */
    ToolService.prototype.filterField = function (before, after) {
        var result = {};
        for (var _i = 0, _a = Object.keys(after); _i < _a.length; _i++) {
            var field = _a[_i];
            if (typeof after[field] === 'object' && after[field] !== []) {
                result[field] = after[field];
            }
            else if (after[field] !== before[field] && after[field] !== null) {
                result[field] = after[field];
            }
        }
        return result;
    };
    ToolService.prototype.encodeString = function (str) {
        return str;
    };
    ToolService.prototype.decodeString = function (str) {
        return '';
    };
    ToolService = __decorate([
        core_1.Injectable()
    ], ToolService);
    return ToolService;
}());
exports.ToolService = ToolService;
