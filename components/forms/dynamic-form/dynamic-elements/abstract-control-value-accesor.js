/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ noop = function () {
    // empty method
};
var ɵ0 = noop;
/**
 * @abstract
 */
var /**
 * @abstract
 */
AbstractControlValueAccessor = (function () {
    function AbstractControlValueAccessor() {
        /**
         * Implemented as part of ControlValueAccessor.
         */
        this._value = undefined;
        this.onChange = function (_) { return noop; };
        this.onTouched = function () { return noop; };
    }
    Object.defineProperty(AbstractControlValueAccessor.prototype, "value", {
        // get/set accessor (needed for ControlValueAccessor)
        get: /**
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._value) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    AbstractControlValueAccessor.prototype.writeValue = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AbstractControlValueAccessor.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AbstractControlValueAccessor.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    return AbstractControlValueAccessor;
}());
/**
 * @abstract
 */
export { AbstractControlValueAccessor };
function AbstractControlValueAccessor_tsickle_Closure_declarations() {
    /**
     * Implemented as part of ControlValueAccessor.
     * @type {?}
     */
    AbstractControlValueAccessor.prototype._value;
    /** @type {?} */
    AbstractControlValueAccessor.prototype.onChange;
    /** @type {?} */
    AbstractControlValueAccessor.prototype.onTouched;
}
export { ɵ0 };
