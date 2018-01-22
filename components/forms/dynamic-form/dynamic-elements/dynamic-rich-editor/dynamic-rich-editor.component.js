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
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { AbstractControlValueAccessor } from "../abstract-control-value-accesor";
import { Observable } from "rxjs/Observable";
/**
 * @record
 */
export function SummernoteOptions() { }
function SummernoteOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SummernoteOptions.prototype.airMode;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.buttons;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.callbacks;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.codemirror;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.colors;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.dialogsInBody;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.dialogsFade;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.direction;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.disableDragAndDrop;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.focus;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.fontNames;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.fontNamesIgnoreCheck;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.height;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.hint;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.icons;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.insertTableMaxSize;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.keyMap;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.lang;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.lineHeights;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.minHeight;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.maxHeight;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.maximumImageFileSize;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.modules;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.popover;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.placeholder;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.shortcuts;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.styleTags;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.styleWithSpan;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.tabsize;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.tableClassName;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.textareaAutoSync;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.toolbar;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.tooltip;
    /** @type {?|undefined} */
    SummernoteOptions.prototype.width;
}
export var /** @type {?} */ RICH_EDITOR_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MhDynamicRichEditorComponent; }),
    multi: true,
};
var MhDynamicRichEditorComponent = (function (_super) {
    __extends(MhDynamicRichEditorComponent, _super);
    function MhDynamicRichEditorComponent(element) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.label = '';
        _this.options = {
            height: 400,
            lang: 'zh-CN',
        };
        _this.config = {};
        _this._value = '';
        return _this;
    }
    Object.defineProperty(MhDynamicRichEditorComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._value) {
                this._value = value;
                this.refresh(value);
                this.onChange(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    MhDynamicRichEditorComponent.prototype.refresh = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        $(this.element.nativeElement).find('.summernote').summernote(this.options);
        $(this.element.nativeElement).find('.summernote').summernote('code', value);
    };
    /**
     * @return {?}
     */
    MhDynamicRichEditorComponent.prototype.isEmpty = /**
     * @return {?}
     */
    function () {
        return /** @type {?} */ ((/** @type {?} */ ($(this.element.nativeElement).find('.summernote').summernote('isEmpty'))));
    };
    /**
     * @return {?}
     */
    MhDynamicRichEditorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.options = Object.assign({}, this.options, this.config || {});
        this.refresh(this.value);
        this.interval$ = Observable.interval()
            .map(function () { return _this.getCode(); })
            .distinctUntilChanged()
            .subscribe(function (_) {
            _this._value = _;
            _this.onChange(_);
        });
    };
    /**
     * @return {?}
     */
    MhDynamicRichEditorComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        $(this.element.nativeElement).find('.summernote').summernote('destroy');
        this.interval$.unsubscribe();
    };
    /**
     * @return {?}
     */
    MhDynamicRichEditorComponent.prototype.getCode = /**
     * @return {?}
     */
    function () {
        return $(this.element.nativeElement).find('.summernote').summernote('code');
    };
    MhDynamicRichEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-dynamic-rich-editor',
                    template: "<div class=\"dynamic-rich-deitor-wrapper\"> <p>{{label}}</p> <div class=\"summernote\"></div> </div>",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [RICH_EDITOR_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MhDynamicRichEditorComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    return MhDynamicRichEditorComponent;
}(AbstractControlValueAccessor));
export { MhDynamicRichEditorComponent };
function MhDynamicRichEditorComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhDynamicRichEditorComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhDynamicRichEditorComponent.ctorParameters;
    /** @type {?} */
    MhDynamicRichEditorComponent.prototype.control;
    /** @type {?} */
    MhDynamicRichEditorComponent.prototype.label;
    /** @type {?} */
    MhDynamicRichEditorComponent.prototype.options;
    /** @type {?} */
    MhDynamicRichEditorComponent.prototype.config;
    /** @type {?} */
    MhDynamicRichEditorComponent.prototype.interval$;
    /** @type {?} */
    MhDynamicRichEditorComponent.prototype._value;
    /** @type {?} */
    MhDynamicRichEditorComponent.prototype.element;
}
