"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@covalent/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/observable/fromEvent");
var MhStepFormComponent = /** @class */ (function () {
    function MhStepFormComponent() {
        var _this = this;
        this._forms = [];
        this.mode = 'horizontal';
        this.actives = [];
        this.disableds = [];
        this.states = [];
        this.interval$ = Observable_1.Observable.interval()
            .map(function (_) {
            var forms = _this.dynamicForms.toArray();
            var value = {};
            var valid = true;
            for (var i = 0; i < forms.length; i++) {
                var form = forms[i];
                var id = _this.forms[i].id;
                value[id] = form.value;
                if (!form.valid) {
                    valid = false;
                }
            }
            return { value: value, valid: valid };
        }).subscribe(function (_) { _this.value = _.value; _this.valid = _.valid; });
    }
    Object.defineProperty(MhStepFormComponent.prototype, "forms", {
        get: function () {
            return this._forms;
        },
        set: function (v) {
            this._forms = v;
            this.initArr();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhStepFormComponent.prototype, "default", {
        get: function () {
            return this._default;
        },
        set: function (v) {
            var value = [];
            for (var i = 0; i < this.forms.length; i++) {
                var id = this.forms[i].id;
                if (v) {
                    value[i] = v[id] || null;
                }
                else {
                    value[i] = null;
                }
            }
            this._default = value;
        },
        enumerable: true,
        configurable: true
    });
    MhStepFormComponent.prototype.initArr = function () {
        this.actives = [];
        this.disableds = [];
        this.states = [];
        this._default = [];
        for (var i = 0; i < this._forms.length; i++) {
            this.actives[i] = i === 0 ? true : false;
            this.disableds[i] = i === 0 ? false : true;
            this.states[i] = i === 0 ? core_2.StepState.Required : core_2.StepState.None;
            this._default[i] = null;
        }
    };
    MhStepFormComponent.prototype.pre = function (index, data) {
        var _this = this;
        this.disableds[index - 1] = false;
        this.actives[index] = false;
        this.disableds[index] = true;
        setTimeout(function () { return _this.actives[index - 1] = true; });
        this.states[index] = core_2.StepState.None;
        this.states[index - 1] = core_2.StepState.Required;
    };
    MhStepFormComponent.prototype.next = function (index, data) {
        var _this = this;
        this.disableds[index + 1] = false;
        this.actives[index] = false;
        this.disableds[index] = true;
        setTimeout(function () { return _this.actives[index + 1] = true; });
        this.states[index] = core_2.StepState.Complete;
        this.states[index + 1] = core_2.StepState.Required;
    };
    MhStepFormComponent.prototype.ngOnDestroy = function () {
        this.interval$.unsubscribe();
    };
    __decorate([
        core_1.ViewChildren('dynamicForm')
    ], MhStepFormComponent.prototype, "dynamicForms", void 0);
    __decorate([
        core_1.Input()
    ], MhStepFormComponent.prototype, "forms", null);
    __decorate([
        core_1.Input()
    ], MhStepFormComponent.prototype, "default", null);
    __decorate([
        core_1.Input()
    ], MhStepFormComponent.prototype, "mode", void 0);
    MhStepFormComponent = __decorate([
        core_1.Component({
            selector: 'mh-step-form',
            templateUrl: './step-form.component.html',
        })
    ], MhStepFormComponent);
    return MhStepFormComponent;
}());
exports.MhStepFormComponent = MhStepFormComponent;
