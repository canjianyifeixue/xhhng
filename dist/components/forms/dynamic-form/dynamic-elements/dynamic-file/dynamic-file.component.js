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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var abstract_control_value_accesor_1 = require("../abstract-control-value-accesor");
exports.FILE_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MhDynamicFileComponent; }),
    multi: true,
};
var MhDynamicFileComponent = /** @class */ (function (_super) {
    __extends(MhDynamicFileComponent, _super);
    function MhDynamicFileComponent(notificationService, dynamicLoaderService) {
        var _this = _super.call(this) || this;
        _this.notificationService = notificationService;
        _this.dynamicLoaderService = dynamicLoaderService;
        _this.label = '';
        _this.maxlength = undefined;
        return _this;
    }
    Object.defineProperty(MhDynamicFileComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            var _this = this;
            if (v === null) {
                this._value = null;
            }
            else if (typeof v === 'string') {
                this.dynamicLoaderService.loadFiles(v)
                    .subscribe(function (_) {
                    // const file = new File([_.blob], _.name)
                    _this._value = _;
                    _this.onChange(_);
                });
            }
            else if (v instanceof File || v instanceof FileList || Array.isArray(v)) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    MhDynamicFileComponent.prototype.select = function (files) {
        if (this.maxlength) {
            if (files instanceof FileList) {
                var err = false;
                for (var i = 0; i < files.length; i++) {
                    var file = files.item(i);
                    if (file.size > this.maxlength) {
                        err = true;
                        break;
                    }
                }
                if (err) {
                    this.notificationService.error('文件太大！');
                    this.control.setValue(null);
                }
            }
            else if (files instanceof File) {
                if (files.size > this.maxlength) {
                    this.notificationService.error('文件太大！');
                    this.control.setValue(null);
                }
            }
        }
    };
    MhDynamicFileComponent.prototype.preview = function (path) {
        this.dynamicLoaderService.download(path).subscribe();
    };
    MhDynamicFileComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-file',
            templateUrl: './dynamic-file.component.html',
            // changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [exports.FILE_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        __param(0, core_1.Inject('notify'))
    ], MhDynamicFileComponent);
    return MhDynamicFileComponent;
}(abstract_control_value_accesor_1.AbstractControlValueAccessor));
exports.MhDynamicFileComponent = MhDynamicFileComponent;
