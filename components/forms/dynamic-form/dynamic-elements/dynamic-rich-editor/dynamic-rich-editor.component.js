"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var abstract_control_value_accesor_1 = require("../abstract-control-value-accesor");
var Observable_1 = require("rxjs/Observable");
exports.RICH_EDITOR_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MhDynamicRichEditorComponent; }),
    multi: true,
};
var MhDynamicRichEditorComponent = /** @class */ (function (_super) {
    __extends(MhDynamicRichEditorComponent, _super);
    function MhDynamicRichEditorComponent(element) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.label = '';
        _this.options = {
            height: 400,
            lang: 'zh-CN',
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
            ],
        };
        _this.config = {};
        _this._value = '';
        return _this;
    }
    Object.defineProperty(MhDynamicRichEditorComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (value !== this._value) {
                this._value = value;
                this.refresh(value);
                this.onChange(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    MhDynamicRichEditorComponent.prototype.refresh = function (value) {
        $(this.element.nativeElement).find('.summernote').summernote(this.options);
        $(this.element.nativeElement).find('.summernote').summernote('code', value);
    };
    MhDynamicRichEditorComponent.prototype.isEmpty = function () {
        return $(this.element.nativeElement).find('.summernote').summernote('isEmpty');
    };
    MhDynamicRichEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = Object.assign({}, this.options, this.config || {});
        this.refresh(this.value);
        this.interval$ = Observable_1.Observable.interval()
            .map(function () { return _this.getCode(); })
            .distinctUntilChanged()
            .subscribe(function (_) {
            _this._value = _;
            _this.onChange(_);
        });
    };
    MhDynamicRichEditorComponent.prototype.ngOnDestroy = function () {
        $(this.element.nativeElement).find('.summernote').summernote('destroy');
        this.interval$.unsubscribe();
    };
    MhDynamicRichEditorComponent.prototype.getCode = function () {
        return $(this.element.nativeElement).find('.summernote').summernote('code');
    };
    MhDynamicRichEditorComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-rich-editor',
            templateUrl: './dynamic-rich-editor.component.html',
            // changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [exports.RICH_EDITOR_INPUT_CONTROL_VALUE_ACCESSOR]
        })
    ], MhDynamicRichEditorComponent);
    return MhDynamicRichEditorComponent;
}(abstract_control_value_accesor_1.AbstractControlValueAccessor));
exports.MhDynamicRichEditorComponent = MhDynamicRichEditorComponent;
