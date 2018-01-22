/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChildren, QueryList } from "@angular/core";
import { StepState } from "@covalent/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";
var MhStepFormComponent = (function () {
    function MhStepFormComponent() {
        var _this = this;
        this._forms = [];
        this.mode = 'horizontal';
        this.actives = [];
        this.disableds = [];
        this.states = [];
        this.interval$ = Observable.interval()
            .map(function (_) {
            var /** @type {?} */ forms = _this.dynamicForms.toArray();
            var /** @type {?} */ value = {};
            var /** @type {?} */ valid = true;
            for (var /** @type {?} */ i = 0; i < forms.length; i++) {
                var /** @type {?} */ form = forms[i];
                var /** @type {?} */ id = _this.forms[i].id;
                value[id] = form.value;
                if (!form.valid) {
                    valid = false;
                }
            }
            return { value: value, valid: valid };
        }).subscribe(function (_) { _this.value = _.value; _this.valid = _.valid; });
    }
    Object.defineProperty(MhStepFormComponent.prototype, "forms", {
        get: /**
         * @return {?}
         */
        function () {
            return this._forms;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._forms = v;
            this.initArr();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MhStepFormComponent.prototype, "default", {
        get: /**
         * @return {?}
         */
        function () {
            return this._default;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ value = [];
            for (var /** @type {?} */ i = 0; i < this.forms.length; i++) {
                var /** @type {?} */ id = this.forms[i].id;
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
    /**
     * @return {?}
     */
    MhStepFormComponent.prototype.initArr = /**
     * @return {?}
     */
    function () {
        this.actives = [];
        this.disableds = [];
        this.states = [];
        this._default = [];
        for (var /** @type {?} */ i = 0; i < this._forms.length; i++) {
            this.actives[i] = i === 0 ? true : false;
            this.disableds[i] = i === 0 ? false : true;
            this.states[i] = i === 0 ? StepState.Required : StepState.None;
            this._default[i] = null;
        }
    };
    /**
     * @param {?} index
     * @param {?} data
     * @return {?}
     */
    MhStepFormComponent.prototype.pre = /**
     * @param {?} index
     * @param {?} data
     * @return {?}
     */
    function (index, data) {
        var _this = this;
        this.disableds[index - 1] = false;
        this.actives[index] = false;
        this.disableds[index] = true;
        setTimeout(function () { return _this.actives[index - 1] = true; });
        this.states[index] = StepState.None;
        this.states[index - 1] = StepState.Required;
    };
    /**
     * @param {?} index
     * @param {?} data
     * @return {?}
     */
    MhStepFormComponent.prototype.next = /**
     * @param {?} index
     * @param {?} data
     * @return {?}
     */
    function (index, data) {
        var _this = this;
        this.disableds[index + 1] = false;
        this.actives[index] = false;
        this.disableds[index] = true;
        setTimeout(function () { return _this.actives[index + 1] = true; });
        this.states[index] = StepState.Complete;
        this.states[index + 1] = StepState.Required;
    };
    /**
     * @return {?}
     */
    MhStepFormComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.interval$.unsubscribe();
    };
    MhStepFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-step-form',
                    template: "<td-steps [mode]=\"mode\"> <ng-template ngFor [ngForOf]=\"forms\" let-form let-index=\"index\" let-last=\"last\"> <td-step #step [sublabel]=\"'第 '+(index+1)+' 步'\" [active]=\"actives[index]\" [state]=\"states[index]\" [disabled]=\"disableds[index]\"> <mh-dynamic-form #dynamicForm [elements]=\"form.controls?form.controls:form\" [default]=\"default[index]\"> </mh-dynamic-form> <ng-template td-step-actions alian=\"end\"> <button *ngIf=\"index!==0\" mat-button (click)=\"pre(index,dynamicForm.value)\"><mat-icon color=\"warn\">chevron_left</mat-icon>上一步</button> <button *ngIf=\"!last\" [disabled]=\"!dynamicForm.valid\" mat-button (click)=\"next(index,dynamicForm.value)\"><mat-icon color=\"accent\">chevron_right</mat-icon>下一步</button> </ng-template> </td-step> </ng-template> </td-steps> ",
                },] },
    ];
    /** @nocollapse */
    MhStepFormComponent.ctorParameters = function () { return []; };
    MhStepFormComponent.propDecorators = {
        "dynamicForms": [{ type: ViewChildren, args: ['dynamicForm',] },],
        "forms": [{ type: Input },],
        "default": [{ type: Input },],
        "mode": [{ type: Input },],
    };
    return MhStepFormComponent;
}());
export { MhStepFormComponent };
function MhStepFormComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhStepFormComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhStepFormComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MhStepFormComponent.propDecorators;
    /** @type {?} */
    MhStepFormComponent.prototype.dynamicForms;
    /** @type {?} */
    MhStepFormComponent.prototype._forms;
    /** @type {?} */
    MhStepFormComponent.prototype._default;
    /** @type {?} */
    MhStepFormComponent.prototype.mode;
    /** @type {?} */
    MhStepFormComponent.prototype.actives;
    /** @type {?} */
    MhStepFormComponent.prototype.disableds;
    /** @type {?} */
    MhStepFormComponent.prototype.states;
    /** @type {?} */
    MhStepFormComponent.prototype.value;
    /** @type {?} */
    MhStepFormComponent.prototype.valid;
    /** @type {?} */
    MhStepFormComponent.prototype.interval$;
}
