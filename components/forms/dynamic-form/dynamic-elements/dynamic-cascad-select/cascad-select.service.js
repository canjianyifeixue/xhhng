/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
var CascadSelectService = (function () {
    function CascadSelectService(http) {
        this.http = http;
    }
    /**
     * @param {?} data
     * @param {?} selectedData
     * @param {?} keyField
     * @return {?}
     */
    CascadSelectService.prototype.initSelection = /**
     * @param {?} data
     * @param {?} selectedData
     * @param {?} keyField
     * @return {?}
     */
    function (data, selectedData, keyField) {
        var /** @type {?} */ selections = data;
        var /** @type {?} */ arr = [];
        for (var /** @type {?} */ i = 0; i < selectedData.length; i++) {
            var /** @type {?} */ select = selectedData[i];
            var /** @type {?} */ result = this.loopSelection(selections, select, keyField);
            if (result === 0) {
                break;
            }
            else if (result === -1) {
                return Observable.of(null);
            }
            else {
                arr.push(result);
                selections = result.children;
            }
        }
        selections = selections;
        selectedData = arr;
        return Observable.of({ selections: selections, selectedData: selectedData });
    };
    /**
     * @param {?} selections
     * @param {?} key
     * @param {?} keyField
     * @return {?}
     */
    CascadSelectService.prototype.loopSelection = /**
     * @param {?} selections
     * @param {?} key
     * @param {?} keyField
     * @return {?}
     */
    function (selections, key, keyField) {
        for (var _i = 0, selections_1 = selections; _i < selections_1.length; _i++) {
            var selection = selections_1[_i];
            var /** @type {?} */ k = key[keyField] || key;
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
    /**
     * @param {?} selectedData
     * @param {?} data
     * @param {?} selections
     * @param {?} selectDepth
     * @param {?} keyField
     * @param {?} valueField
     * @return {?}
     */
    CascadSelectService.prototype.initAsyncSelection = /**
     * @param {?} selectedData
     * @param {?} data
     * @param {?} selections
     * @param {?} selectDepth
     * @param {?} keyField
     * @param {?} valueField
     * @return {?}
     */
    function (selectedData, data, selections, selectDepth, keyField, valueField) {
        var /** @type {?} */ arr = [this.loadAsyncData(data, 0)];
        for (var /** @type {?} */ i = 1; i < selectedData.length; i++) {
            arr.push(this.loadAsyncData(data, i, selectedData[i - 1]));
        }
        return this.loadAsyncSelection(arr, selectedData, selections, selectDepth, keyField, valueField);
    };
    /**
     * @param {?} arr
     * @param {?} selectedData
     * @param {?} selections
     * @param {?} selectDepth
     * @param {?} keyField
     * @param {?} valueField
     * @return {?}
     */
    CascadSelectService.prototype.loadAsyncSelection = /**
     * @param {?} arr
     * @param {?} selectedData
     * @param {?} selections
     * @param {?} selectDepth
     * @param {?} keyField
     * @param {?} valueField
     * @return {?}
     */
    function (arr, selectedData, selections, selectDepth, keyField, valueField) {
        return Observable.combineLatest.apply(Observable, arr).map(function (_) {
            var /** @type {?} */ array = [];
            for (var /** @type {?} */ i = 0; i < _.length - 1; i++) {
                var /** @type {?} */ key = typeof selectedData[i] === 'string' ? selectedData[i] : selectedData[i].key;
                var /** @type {?} */ items = _[i].items;
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
    /**
     * @param {?} data
     * @param {?} index
     * @param {?=} value
     * @return {?}
     */
    CascadSelectService.prototype.loadAsyncData = /**
     * @param {?} data
     * @param {?} index
     * @param {?=} value
     * @return {?}
     */
    function (data, index, value) {
        var /** @type {?} */ urls = data.split(';');
        var /** @type {?} */ url = urls[index];
        if (value) {
            url = url.split('${value}').join(value);
        }
        return this.http.get(url);
    };
    CascadSelectService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CascadSelectService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['http',] },] },
    ]; };
    return CascadSelectService;
}());
export { CascadSelectService };
function CascadSelectService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CascadSelectService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CascadSelectService.ctorParameters;
    /** @type {?} */
    CascadSelectService.prototype.http;
}
