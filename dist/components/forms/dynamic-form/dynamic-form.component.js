"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var timer_1 = require("rxjs/observable/timer");
var toPromise_1 = require("rxjs/operator/toPromise");
var moment_1 = require("../../../util/moment");
var MhDynamicFormComponent = /** @class */ (function () {
    function MhDynamicFormComponent(_formBuilder, _dynamicFormsService, _dynamicLoaderService, _cdr) {
        this._formBuilder = _formBuilder;
        this._dynamicFormsService = _dynamicFormsService;
        this._dynamicLoaderService = _dynamicLoaderService;
        this._cdr = _cdr;
        this.hasError = false;
        this.errorInfo = '';
        this.change = new core_1.EventEmitter();
        this.inited = false;
        this._renderedElements = [];
        this.dynamicForm = this._formBuilder.group({});
    }
    Object.defineProperty(MhDynamicFormComponent.prototype, "elements", {
        get: function () {
            return this._renderedElements;
        },
        set: function (elements) {
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
        set: function (v) {
            if (v && typeof v === 'object') {
                var vl = Object.keys(v).length;
                var cl = Object.keys(this.dynamicForm.controls).length;
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
        get: function () {
            return this.dynamicForm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhDynamicFormComponent.prototype, "valid", {
        /**
         * Getter property for [valid] of dynamic [FormGroup].
         */
        get: function () {
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
        get: function () {
            if (this.dynamicForm) {
                // return this.dynamicForm.value;
                var value = {};
                for (var name_1 in this.dynamicForm.controls) {
                    if (name_1) {
                        var v = this.dynamicForm.controls[name_1].value;
                        if (v instanceof Date) {
                            v = moment_1.moment(v).toISOString();
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
        get: function () {
            if (this.dynamicForm) {
                var errors = {};
                for (var name_2 in this.dynamicForm.controls) {
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
        get: function () {
            if (this.dynamicForm) {
                return this.dynamicForm.controls;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    MhDynamicFormComponent.prototype.refresh = function () {
        this._loaderElements(this._elements);
    };
    MhDynamicFormComponent.prototype.init = function () {
        var _this = this;
        this._dynamicFormsService.registerChange().subscribe(function (_) {
            _this.change.emit(_);
            _this.validateAsync();
        });
    };
    MhDynamicFormComponent.prototype._loaderElements = function (elements) {
        var _this = this;
        this._clearRemovedElements(elements);
        this._renderedElements = [];
        var duplicates = [];
        var count = 0;
        var _loop_1 = function (i) {
            var elem = elements[i];
            this_1._dynamicFormsService.validateDynamicElementName(elem.name);
            if (duplicates.indexOf(elem.name) > -1) {
                throw new Error("name\u5C5E\u6027\u91CD\u590D: \"" + elem.name + "\" \u91CD\u590D");
            }
            duplicates.push(elem.name);
            var controls$ = this_1._dynamicLoaderService.loadControls(elem.controls, elem.type);
            var selections$ = this_1._dynamicLoaderService.loadSelections(elem.selections, elem.type, elem.selectionParams);
            Observable_1.Observable.combineLatest(controls$, selections$).subscribe(function (data) {
                elements[i].controls = data[0];
                elements[i].selections = data[1];
                if (++count === elements.length) {
                    _this._rerenderElements(elements);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < elements.length; i++) {
            _loop_1(i);
        }
    };
    MhDynamicFormComponent.prototype._rerenderElements = function (elements) {
        var _this = this;
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var elem = elements_1[_i];
            if (!this.dynamicForm.get(elem.name)) {
                this.dynamicForm.addControl(elem.name, this._dynamicFormsService.createFormControl(elem));
            }
            else {
                var e = this.dynamicForm.get(elem.name);
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
        toPromise_1.toPromise.call(timer_1.timer()).then(function () {
            // call a markForCheck so elements are rendered correctly in OnPush
            _this._cdr.markForCheck();
        });
    };
    MhDynamicFormComponent.prototype._clearRemovedElements = function (elements) {
        var _this = this;
        for (var i = 0; i < this._renderedElements.length; i++) {
            for (var j = 0; j < elements.length; j++) {
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
    MhDynamicFormComponent.prototype.setValue = function () {
        if (this.inited && this._default) {
            this.form.setValue(this._default);
        }
    };
    MhDynamicFormComponent.prototype.validateAsync = function () {
        var e = false;
        if (this.dynamicForm) {
            for (var _i = 0, _a = Object.keys(this.dynamicForm.controls); _i < _a.length; _i++) {
                var name_3 = _a[_i];
                var err = this.dynamicForm.controls[name_3].errors;
                if (err && err.async) {
                    e = true;
                    this.hasError = true;
                    this.errorInfo = err.async;
                }
            }
        }
        if (!e) {
            this.hasError = false;
            this.errorInfo = '';
        }
    };
    MhDynamicFormComponent.prototype.detectChanges = function () {
        var _this = this;
        setTimeout(function () {
            if (_this._cdr !== null &&
                _this._cdr !== undefined &&
                !_this._cdr.destroyed) {
                _this._cdr.detectChanges();
            }
        }, 250);
    };
    __decorate([
        core_1.Input('elements')
    ], MhDynamicFormComponent.prototype, "elements", null);
    __decorate([
        core_1.Input('default')
    ], MhDynamicFormComponent.prototype, "default", null);
    __decorate([
        core_1.Output('change')
    ], MhDynamicFormComponent.prototype, "change", void 0);
    MhDynamicFormComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-form',
            templateUrl: './dynamic-form.component.html',
        })
    ], MhDynamicFormComponent);
    return MhDynamicFormComponent;
}());
exports.MhDynamicFormComponent = MhDynamicFormComponent;
