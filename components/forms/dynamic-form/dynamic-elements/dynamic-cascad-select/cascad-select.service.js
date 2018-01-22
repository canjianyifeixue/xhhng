"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var CascadSelectService = /** @class */ (function () {
    function CascadSelectService(http) {
        this.http = http;
    }
    CascadSelectService.prototype.initSelection = function (data, selectedData, keyField) {
        var selections = data;
        var arr = [];
        for (var i = 0; i < selectedData.length; i++) {
            var select = selectedData[i];
            var result = this.loopSelection(selections, select, keyField);
            if (result === 0) {
                break;
            }
            else if (result === -1) {
                return Observable_1.Observable.of(null);
            }
            else {
                arr.push(result);
                selections = result.children;
            }
        }
        selections = selections;
        selectedData = arr;
        return Observable_1.Observable.of({ selections: selections, selectedData: selectedData });
    };
    CascadSelectService.prototype.loopSelection = function (selections, key, keyField) {
        for (var _i = 0, selections_1 = selections; _i < selections_1.length; _i++) {
            var selection = selections_1[_i];
            var k = key[keyField] || key;
            if (selection[keyField] === k) {
                if (Array.isArray(selection.children) && selection.children.length > 0) {
                    return selection;
                }
                else {
                    return 0;
                }
            }
        }
        return -1;
    };
    CascadSelectService.prototype.initAsyncSelection = function (selectedData, data, selections, selectDepth, keyField, valueField) {
        var arr = [this.loadAsyncData(data, 0)];
        for (var i = 1; i < selectedData.length; i++) {
            arr.push(this.loadAsyncData(data, i, selectedData[i - 1]));
        }
        return this.loadAsyncSelection(arr, selectedData, selections, selectDepth, keyField, valueField);
    };
    CascadSelectService.prototype.loadAsyncSelection = function (arr, selectedData, selections, selectDepth, keyField, valueField) {
        return Observable_1.Observable.combineLatest.apply(Observable_1.Observable, arr).map(function (_) {
            var array = [];
            for (var i = 0; i < _.length - 1; i++) {
                var key = typeof selectedData[i] === 'string' ? selectedData[i] : selectedData[i].key;
                var items = _[i].items;
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    if (item[keyField] === key) {
                        array.push({ key: item[keyField], value: item[valueField] });
                        break;
                    }
                }
            }
            selectDepth = _.length - 1;
            selectedData = array;
            selections = _[_.length - 1].items;
            return {
                selectDepth: selectDepth,
                selectedData: selectedData,
                selections: selections
            };
        });
    };
    CascadSelectService.prototype.loadAsyncData = function (data, index, value) {
        var urls = data.split(';');
        var url = urls[index];
        if (value) {
            url = url.split('${value}').join(value);
        }
        return this.http.get(url);
    };
    CascadSelectService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject('http'))
    ], CascadSelectService);
    return CascadSelectService;
}());
exports.CascadSelectService = CascadSelectService;
