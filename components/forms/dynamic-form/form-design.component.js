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
var dynamic_form_entity_1 = require("./dynamic-form.entity");
var dynamic_dialog_entry_component_1 = require("./dynamic-elements/dynamic-dialog-entry.component");
var controlDemo = [
    {
        name: 'input',
        label: '文本框',
        type: dynamic_form_entity_1.MhDynamicFormElement.Input,
        flex: 45,
        default: null,
        required: false,
        max: null,
        min: null,
        pattern: null,
        validateUrl: null,
        config: {
            patternErrors: null,
            icon: null,
            iconColor: null,
            suffix: null
        },
        maxlength: null
    }, {
        name: 'number',
        label: '数字框',
        type: dynamic_form_entity_1.MhDynamicFormElement.Number,
        flex: 45,
        default: null,
        required: false,
        max: null,
        min: null,
        pattern: null,
        validateUrl: null,
        config: {
            patternErrors: null,
            icon: null,
            iconColor: null,
            suffix: null
        },
        maxlength: null
    }, {
        name: 'password',
        label: '密码框',
        type: dynamic_form_entity_1.MhDynamicFormElement.Password,
        flex: 45,
        default: null,
        required: false,
        max: null,
        min: null,
        pattern: null,
        validateUrl: null,
        config: {
            patternErrors: null,
            icon: null,
            iconColor: null,
            suffix: null
        },
        maxlength: null
    }, {
        name: 'textarea',
        label: '多行文本框',
        type: dynamic_form_entity_1.MhDynamicFormElement.Textarea,
        flex: 95,
        default: null,
        required: false,
        max: null,
        min: null,
        pattern: null,
        validateUrl: null,
        config: { patternErrors: null },
        maxlength: null
    }, {
        name: 'slider',
        label: '滑块',
        type: dynamic_form_entity_1.MhDynamicFormElement.Slider,
        flex: 45,
        default: null,
        required: false,
        max: null,
        min: null,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'datepicker',
        label: '时间框',
        type: dynamic_form_entity_1.MhDynamicFormElement.DatePicker,
        flex: 45,
        default: null,
        required: false,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'slidetoggle',
        label: '开关',
        type: dynamic_form_entity_1.MhDynamicFormElement.SlideToggle,
        flex: 20,
        default: false,
        required: false,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'checkbox',
        label: '复选框',
        type: dynamic_form_entity_1.MhDynamicFormElement.Checkbox,
        flex: 20,
        default: false,
        required: false,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'checkboxgroup',
        label: '复选组',
        type: dynamic_form_entity_1.MhDynamicFormElement.CheckboxGroup,
        flex: 45,
        selections: [],
        default: [],
        required: false,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'select',
        label: '选择框',
        type: dynamic_form_entity_1.MhDynamicFormElement.Select,
        flex: 45,
        selections: [],
        default: null,
        required: false,
        multiple: false,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'chips',
        label: '标签和自动补全',
        type: dynamic_form_entity_1.MhDynamicFormElement.Chips,
        flex: 45,
        selections: [],
        default: [],
        required: false,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'dialog-select',
        label: '弹窗选择框',
        type: dynamic_form_entity_1.MhDynamicFormElement.DialogSelect,
        flex: 45,
        selections: [],
        default: null,
        required: false,
        multiple: false,
        maxlength: null,
        validateUrl: null,
        config: { showField: null, valueField: null, width: null }
    }, {
        name: 'cascad-select',
        label: '级联选择框',
        type: dynamic_form_entity_1.MhDynamicFormElement.CascadSelect,
        flex: 45,
        default: null,
        required: false,
        selections: [],
        validateUrl: null,
        config: { depth: [], showField: null, valueField: null }
    }, {
        name: 'radio',
        label: '单选组',
        type: dynamic_form_entity_1.MhDynamicFormElement.Radio,
        flex: 45,
        selections: [],
        default: null,
        required: false,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'file',
        label: '文件上传',
        type: dynamic_form_entity_1.MhDynamicFormElement.File,
        flex: 45,
        default: null,
        required: false,
        multiple: false,
        maxlength: null,
        validateUrl: null,
        config: {
            accept: null
        }
    }, {
        name: 'dataform',
        label: '数据表单',
        type: dynamic_form_entity_1.MhDynamicFormElement.DataForm,
        flex: 95,
        controls: [],
        selections: [],
        default: [],
        required: false,
        maxlength: null,
        validateUrl: null,
        config: { stateMode: false }
    }, {
        name: 'rich-editor',
        label: '富文本编辑器',
        type: dynamic_form_entity_1.MhDynamicFormElement.RichEditor,
        flex: 95,
        default: null,
        maxlength: null,
        validateUrl: null,
    }
];
var MhFormDesignComponent = /** @class */ (function () {
    function MhFormDesignComponent(dialog, dragulaService, notificationService, loaderService) {
        var _this = this;
        this.dialog = dialog;
        this.dragulaService = dragulaService;
        this.notificationService = notificationService;
        this.loaderService = loaderService;
        this.controlTag = 'mat-NAV-LIST';
        this.elementTag = 'DIV';
        this.h3Name = '_$none_';
        this.bagName = 'bag';
        this.selectControls = [];
        this.controls = [];
        this.elements = [];
        this.nameArr = [];
        this.selectedindex = -1;
        this.dragOpt = {
            moves: function (e) {
                if (e.getAttribute('name') === _this.h3Name) {
                    return false;
                }
                var bool = _this.validate();
                if (!bool) {
                    _this.notificationService.error('控件标识填写不规范或重复！');
                }
                return bool;
            },
        };
    }
    Object.defineProperty(MhFormDesignComponent.prototype, "valid", {
        get: function () {
            return this.validate();
        },
        enumerable: true,
        configurable: true
    });
    MhFormDesignComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.controls = this.getDemo();
        this.registerDrop();
        this.loaderService.loadOptions().subscribe(function (data) {
            _this.options = data;
        });
    };
    MhFormDesignComponent.prototype.getDemo = function () {
        var arr = [];
        for (var _i = 0, controlDemo_1 = controlDemo; _i < controlDemo_1.length; _i++) {
            var c = controlDemo_1[_i];
            arr = arr.concat([Object.assign({}, c)]);
        }
        return arr;
    };
    MhFormDesignComponent.prototype.registerDrop = function () {
        var _this = this;
        this.dragulaService.drop.map(function (value) {
            if (value[2].tagName === _this.elementTag
                && value[3].tagName === _this.controlTag) {
                if (value[4] === null || value[4].getAttribute('name') === _this.h3Name) {
                    _this.selectedindex = _this.elements.length - 1;
                }
                else {
                    var preNodeIndex = _this.getElementIndex(value[4].getAttribute('name'));
                    _this.selectedindex = preNodeIndex - 1;
                }
                var newObj = Object.assign({}, _this.elements[_this.selectedindex]);
                // const newObj = JSON.parse(JSON.stringify(this.elements[this.selectedindex]));
                newObj.name = '';
                _this.elements[_this.selectedindex] = newObj;
                _this.syncNameArr();
            }
            else if (value[2].tagName === _this.controlTag
                && value[3].tagName === _this.elementTag) {
                _this.selectedindex = -1;
            }
            else if (value[2].tagName === _this.controlTag
                && value[3].tagName === _this.controlTag) {
                // nothing to do
            }
            else if (value[2].tagName === _this.elementTag
                && value[3].tagName === _this.elementTag) {
                if (value[4] === null || value[4].getAttribute('name') === 'none') {
                    _this.selectedindex = _this.elements.length - 1;
                }
                else {
                    var preNodeIndex = _this.getElementIndex(value[4].getAttribute('name'));
                    _this.selectedindex = preNodeIndex - 1;
                }
            }
            return;
        }).subscribe(function () {
            _this.controls = _this.getDemo();
        });
    };
    MhFormDesignComponent.prototype.validate = function () {
        this.syncNameArr();
        var arr = [];
        for (var _i = 0, _a = this.nameArr; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            if (name_1 === null
                || name_1.length <= 0
                || !name_1.match(/^[A-Za-z_]([A-Za-z0-9_])*$/)
                || arr.indexOf(name_1) >= 0) {
                return false;
            }
            arr.push(name_1);
        }
        return true;
    };
    MhFormDesignComponent.prototype.syncNameArr = function () {
        this.nameArr = [];
        for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
            var e = _a[_i];
            this.nameArr = this.nameArr.concat([
                e.name
            ]);
        }
    };
    MhFormDesignComponent.prototype.elementClick = function (element) {
        this.selectedindex = this.elements.indexOf(element);
    };
    MhFormDesignComponent.prototype.getElementIndex = function (name) {
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].name === name) {
                return i;
            }
        }
        return -1;
    };
    MhFormDesignComponent.prototype.open = function (type, field) {
        var _this = this;
        var label = '';
        var selections = [];
        switch (type) {
            case 'datasource':
                label = '选择数据源';
                selections = this.options.datasource.slice();
                for (var _i = 0, selections_1 = selections; _i < selections_1.length; _i++) {
                    var s = selections_1[_i];
                    delete s['sql'];
                    delete s['params'];
                    delete s['columns'];
                }
                break;
            case 'dictionary':
                label = '选择数据字典';
                selections = this.options.dictionary.slice();
                for (var _a = 0, selections_2 = selections; _a < selections_2.length; _a++) {
                    var s = selections_2[_a];
                    delete s['map'];
                }
                break;
            case 'dataform':
                label = '选择数据表单';
                selections = this.options.dataform.slice();
                for (var _b = 0, selections_3 = selections; _b < selections_3.length; _b++) {
                    var s = selections_3[_b];
                    delete s['controls'];
                }
                break;
        }
        var dialogRef = this.dialog.open(dynamic_dialog_entry_component_1.MhDynamicDialogEntryComponent, {
            width: '70%',
            data: { label: label, data: selections, columns: [] }
        });
        dialogRef.afterClosed().filter(function (data) { return data; }).subscribe(function (data) {
            _this.elements[_this.selectedindex][field] = data.id;
        });
    };
    MhFormDesignComponent.prototype.checkDefault = function (type) {
        if (type === 'input'
            || type === 'number'
            || type === 'password'
            || type === 'textarea'
            || type === 'slider'
            || type === 'slide-toggle'
            || type === 'datepicker'
            || type === 'checkbox'
            || type === 'rich-editor'
            || type === 'cascad-select') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.checkMaxlength = function (type) {
        if (type === 'input'
            || type === 'number'
            || type === 'password'
            || type === 'textarea'
            || type === 'file'
            || type === 'rich-editor') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.checkMinMax = function (type) {
        if (type === 'input'
            || type === 'number'
            || type === 'textarea'
            || type === 'slider') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.checkPattern = function (type) {
        if (type === 'input'
            || type === 'number'
            || type === 'password'
            || type === 'textarea') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.checkDatasource = function (type) {
        if (type === 'dialog-select'
            || type === 'data-form') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.checkDictionary = function (type) {
        if (type === 'checkbox-group'
            || type === 'chips'
            || type === 'radio'
            || type === 'select'
            || type === 'cascad-select') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.checkControls = function (type) {
        if (type === 'data-form') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.checkSelectFIeld = function (type) {
        if (type === 'dialog-select'
            || type === 'cascad-select') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.checkMultiple = function (type) {
        if (type === 'dialog-select'
            || type === 'select'
            || type === 'file') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.checkUploadAccept = function (type) {
        if (type === 'file') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.checkIcon = function (type) {
        if (type === 'input'
            || type === 'number'
            || type === 'password') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.checkSuffix = function (type) {
        if (type === 'input'
            || type === 'number'
            || type === 'password') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.checkDepth = function (type) {
        if (type === 'cascad-select') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.checkEntryWidth = function (type) {
        if (type === 'dialog-select') {
            return true;
        }
        return false;
    };
    MhFormDesignComponent.prototype.ngOnDestroy = function () {
        this.elements = [];
    };
    __decorate([
        core_1.ViewChild('panelForm')
    ], MhFormDesignComponent.prototype, "panelForm", void 0);
    __decorate([
        core_1.Input()
    ], MhFormDesignComponent.prototype, "elements", void 0);
    MhFormDesignComponent = __decorate([
        core_1.Component({
            selector: 'mh-form-design',
            templateUrl: './form-design.component.html',
        }),
        __param(2, core_1.Inject('notify'))
    ], MhFormDesignComponent);
    return MhFormDesignComponent;
}());
exports.MhFormDesignComponent = MhFormDesignComponent;
