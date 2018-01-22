"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchFormComponent = /** @class */ (function () {
    function SearchFormComponent(httpUtilService, dateAdapter) {
        this.httpUtilService = httpUtilService;
        this._elements = [];
        this.value = {};
        this.selected = new core_1.EventEmitter();
        this.defaultValue = this.value;
        dateAdapter.setLocale('zh-CN');
    }
    Object.defineProperty(SearchFormComponent.prototype, "elements", {
        get: function () {
            return this._elements;
        },
        set: function (v) {
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
    SearchFormComponent.prototype.isObject = function (value) {
        return typeof value === 'object';
    };
    SearchFormComponent.prototype.dateSelect = function (value, name) {
        this.value[name] = value;
        this.change();
    };
    SearchFormComponent.prototype.change = function () {
        this.selected.emit(this.value);
    };
    SearchFormComponent.prototype.reset = function () {
        this.value = this.defaultValue;
        this.change();
    };
    __decorate([
        core_1.Input('elements')
    ], SearchFormComponent.prototype, "elements", null);
    __decorate([
        core_1.Input('value')
    ], SearchFormComponent.prototype, "value", void 0);
    __decorate([
        core_1.Output('selected')
    ], SearchFormComponent.prototype, "selected", void 0);
    SearchFormComponent = __decorate([
        core_1.Component({
            selector: 'mh-search-form',
            templateUrl: './search-form.component.html',
        })
    ], SearchFormComponent);
    return SearchFormComponent;
}());
exports.SearchFormComponent = SearchFormComponent;
