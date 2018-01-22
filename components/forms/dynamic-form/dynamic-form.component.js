/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MhDynamicLoaderService } from "./dynamic-loader.service";
import { MhDynamicFormService } from "./dynamic-form.service";
import { Observable } from "rxjs/Observable";
import { timer } from "rxjs/observable/timer";
import { toPromise } from "rxjs/operator/toPromise";
import { moment } from "../../../util/moment";
var MhDynamicFormComponent = (function () {
    function MhDynamicFormComponent(_formBuilder, _dynamicFormsService, _dynamicLoaderService, _cdr) {
        this._formBuilder = _formBuilder;
        this._dynamicFormsService = _dynamicFormsService;
        this._dynamicLoaderService = _dynamicLoaderService;
        this._cdr = _cdr;
        this.hasError = false;
        this.errorInfo = '';
        this.change = new EventEmitter();
        this.inited = false;
        this._renderedElements = [];
        this.dynamicForm = this._formBuilder.group({});
    }
    Object.defineProperty(MhDynamicFormComponent.prototype, "elements", {
        get: /**
         * @return {?}
         */
        function () {
            return this._renderedElements;
        },
        set: /**
         * @param {?} elements
         * @return {?}
         */
        function (elements) {
            var _this = this;
            elements = elements || [];
            if (typeof elements === 'string') {
                this._dynamicLoaderService.loadElements(elements).subscribe(function (data) {
                    _this._loaderElements(data);
                });
            }
            else {
                this._loaderElements(elements);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhDynamicFormComponent.prototype, "default", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v && typeof v === 'object') {
                var /** @type {?} */ vl = Object.keys(v).length;
                var /** @type {?} */ cl = Object.keys(this.dynamicForm.controls).length;
                this._default = v;
                if (cl === vl) {
                    this.setValue();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhDynamicFormComponent.prototype, "form", {
        /**
         * Getter property for dynamic [FormGroup].
         */
        get: /**
         * Getter property for dynamic [FormGroup].
         * @return {?}
         */
        function () {
            return this.dynamicForm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhDynamicFormComponent.prototype, "valid", {
        /**
         * Getter property for [valid] of dynamic [FormGroup].
         */
        get: /**
         * Getter property for [valid] of dynamic [FormGroup].
         * @return {?}
         */
        function () {
            if (this.dynamicForm) {
                return this.dynamicForm.valid;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhDynamicFormComponent.prototype, "value", {
        /**
         * Getter property for [value] of dynamic [FormGroup].
         */
        get: /**
         * Getter property for [value] of dynamic [FormGroup].
         * @return {?}
         */
        function () {
            if (this.dynamicForm) {
                // return this.dynamicForm.value;
                var /** @type {?} */ value = {};
                for (var /** @type {?} */ name_1 in this.dynamicForm.controls) {
                    if (name_1) {
                        var /** @type {?} */ v = this.dynamicForm.controls[name_1].value;
                        if (v instanceof Date) {
                            v = moment(v).toISOString();
                        }
                        // if (typeof v === 'string') {
                        //   v = v.split(`\"`).join(`\\"`);
                        //   v = v.split(`\'`).join(`\\'`);
                        // }
                        value[name_1] = v;
                    }
                }
                return value;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhDynamicFormComponent.prototype, "errors", {
        /**
         * Getter property for [errors] of dynamic [FormGroup].
         */
        get: /**
         * Getter property for [errors] of dynamic [FormGroup].
         * @return {?}
         */
        function () {
            if (this.dynamicForm) {
                var /** @type {?} */ errors = {};
                for (var /** @type {?} */ name_2 in this.dynamicForm.controls) {
                    if (name_2) {
                        errors[name_2] = this.dynamicForm.controls[name_2].errors;
                    }
                }
                return errors;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhDynamicFormComponent.prototype, "controls", {
        /**
         * Getter property for [controls] of dynamic [FormGroup].
         */
        get: /**
         * Getter property for [controls] of dynamic [FormGroup].
         * @return {?}
         */
        function () {
            if (this.dynamicForm) {
                return this.dynamicForm.controls;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MhDynamicFormComponent.prototype.refresh = /**
     * @return {?}
     */
    function () {
        this._loaderElements(this._elements);
    };
    /**
     * @return {?}
     */
    MhDynamicFormComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._dynamicFormsService.registerChange().subscribe(function (_) {
            _this.change.emit(_);
            _this.validateAsync();
        });
    };
    /**
     * @param {?} elements
     * @return {?}
     */
    MhDynamicFormComponent.prototype._loaderElements = /**
     * @param {?} elements
     * @return {?}
     */
    function (elements) {
        var _this = this;
        this._clearRemovedElements(elements);
        this._renderedElements = [];
        var /** @type {?} */ duplicates = [];
        var /** @type {?} */ count = 0;
        var _loop_1 = function (i) {
            var /** @type {?} */ elem = elements[i];
            this_1._dynamicFormsService.validateDynamicElementName(elem.name);
            if (duplicates.indexOf(elem.name) > -1) {
                throw new Error("name\u5C5E\u6027\u91CD\u590D: \"" + elem.name + "\" \u91CD\u590D");
            }
            duplicates.push(elem.name);
            var /** @type {?} */ controls$ = this_1._dynamicLoaderService.loadControls(elem.controls, elem.type);
            var /** @type {?} */ selections$ = this_1._dynamicLoaderService.loadSelections(elem.selections, elem.type, elem.selectionParams);
            Observable.combineLatest(controls$, selections$).subscribe(function (data) {
                elements[i].controls = data[0];
                elements[i].selections = data[1];
                if (++count === elements.length) {
                    _this._rerenderElements(elements);
                }
            });
        };
        var this_1 = this;
        for (var /** @type {?} */ i = 0; i < elements.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * @param {?} elements
     * @return {?}
     */
    MhDynamicFormComponent.prototype._rerenderElements = /**
     * @param {?} elements
     * @return {?}
     */
    function (elements) {
        var _this = this;
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var elem = elements_1[_i];
            if (!this.dynamicForm.get(elem.name)) {
                this.dynamicForm.addControl(elem.name, this._dynamicFormsService.createFormControl(elem));
            }
            else {
                var /** @type {?} */ e = this.dynamicForm.get(elem.name);
                if (e) {
                    e.setValidators(this._dynamicFormsService.createValidators(elem));
                }
            }
            this._renderedElements.push(Object.assign({}, elem));
        }
        this.inited = true;
        this._elements = elements;
        this.setValue();
        this.init();
        this.detectChanges();
        toPromise.call(timer()).then(function () {
            // call a markForCheck so elements are rendered correctly in OnPush
            // call a markForCheck so elements are rendered correctly in OnPush
            _this._cdr.markForCheck();
        });
    };
    /**
     * @param {?} elements
     * @return {?}
     */
    MhDynamicFormComponent.prototype._clearRemovedElements = /**
     * @param {?} elements
     * @return {?}
     */
    function (elements) {
        var _this = this;
        for (var /** @type {?} */ i = 0; i < this._renderedElements.length; i++) {
            for (var /** @type {?} */ j = 0; j < elements.length; j++) {
                // check if the name of the element is still there removed
                if (this._renderedElements[i].name === elements[j].name) {
                    delete this._renderedElements[i];
                    break;
                }
            }
        }
        // remove elements that were removed from the array
        this._renderedElements.forEach(function (elem) {
            _this.dynamicForm.removeControl(elem.name);
        });
    };
    /**
     * @return {?}
     */
    MhDynamicFormComponent.prototype.setValue = /**
     * @return {?}
     */
    function () {
        if (this.inited && this._default) {
            this.form.setValue(this._default);
        }
    };
    /**
     * @return {?}
     */
    MhDynamicFormComponent.prototype.validateAsync = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ e = false;
        if (this.dynamicForm) {
            for (var _i = 0, _a = Object.keys(this.dynamicForm.controls); _i < _a.length; _i++) {
                var name_3 = _a[_i];
                var /** @type {?} */ err = this.dynamicForm.controls[name_3].errors;
                if (err && err["async"]) {
                    e = true;
                    this.hasError = true;
                    this.errorInfo = err["async"];
                }
            }
        }
        if (!e) {
            this.hasError = false;
            this.errorInfo = '';
        }
    };
    /**
     * @return {?}
     */
    MhDynamicFormComponent.prototype.detectChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            if (_this._cdr !== null &&
                _this._cdr !== undefined &&
                !(/** @type {?} */ (_this._cdr)).destroyed) {
                _this._cdr.detectChanges();
            }
        }, 250);
    };
    MhDynamicFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-form',
                    template: "<form [formGroup]=\"dynamicForm\" novalidate> <div layout=\"row\" layout-wrap layout-margin layout-align=\"start center\"> <td-message *ngIf=\"hasError\" flex=\"100\" label=\"错误!\" [sublabel]=\"errorInfo\" color=\"warn\" icon=\"error\"></td-message> <ng-template let-element ngFor [ngForOf]=\"elements\"> <mh-dynamic-element flex-xs=\"100\" [formControlName]=\"element.name\" [dynamicControl]=\"dynamicForm.controls[element.name]\" [id]=\"element.name\" [label]=\"element.label || element.name\" [type]=\"element.type\" [required]=\"element.required\" [readonly]=\"element.readonly\" [min]=\"element.min\" [max]=\"element.max\" [selections]=\"element.selections\" [pattern]=\"element.pattern\" [config]=\"element.config\" [maxlength]=\"element.maxlength\" [flex]=\"element.flex\" [controls]=\"element.controls\" [multiple]=\"element.multiple\"> </mh-dynamic-element> </ng-template> <ng-content></ng-content> </div> </form> ",
                },] },
    ];
    /** @nocollapse */
    MhDynamicFormComponent.ctorParameters = function () { return [
        { type: FormBuilder, },
        { type: MhDynamicFormService, },
        { type: MhDynamicLoaderService, },
        { type: ChangeDetectorRef, },
    ]; };
    MhDynamicFormComponent.propDecorators = {
        "elements": [{ type: Input, args: ['elements',] },],
        "default": [{ type: Input, args: ['default',] },],
        "change": [{ type: Output, args: ['change',] },],
    };
    return MhDynamicFormComponent;
}());
export { MhDynamicFormComponent };
function MhDynamicFormComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicFormComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicFormComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MhDynamicFormComponent.propDecorators;
    /** @type {?} */
    MhDynamicFormComponent.prototype.dynamicForm;
    /** @type {?} */
    MhDynamicFormComponent.prototype.hasError;
    /** @type {?} */
    MhDynamicFormComponent.prototype.errorInfo;
    /** @type {?} */
    MhDynamicFormComponent.prototype._default;
    /** @type {?} */
    MhDynamicFormComponent.prototype.change;
    /** @type {?} */
    MhDynamicFormComponent.prototype.inited;
    /** @type {?} */
    MhDynamicFormComponent.prototype._renderedElements;
    /** @type {?} */
    MhDynamicFormComponent.prototype._elements;
    /** @type {?} */
    MhDynamicFormComponent.prototype._formBuilder;
    /** @type {?} */
    MhDynamicFormComponent.prototype._dynamicFormsService;
    /** @type {?} */
    MhDynamicFormComponent.prototype._dynamicLoaderService;
    /** @type {?} */
    MhDynamicFormComponent.prototype._cdr;
}
