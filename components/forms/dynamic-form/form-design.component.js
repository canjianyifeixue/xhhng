/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild, Inject } from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { MhDynamicFormElement } from "./dynamic-form.entity";
import { MatDialog } from "@angular/material";
import { MhDynamicDialogEntryComponent } from "./dynamic-elements/dynamic-dialog-entry.component";
import { MhDynamicLoaderService } from "./dynamic-loader.service";
var /** @type {?} */ controlDemo = [
    {
        name: 'input',
        label: '文本框',
        type: MhDynamicFormElement.Input,
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
        type: MhDynamicFormElement.Number,
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
        type: MhDynamicFormElement.Password,
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
        type: MhDynamicFormElement.Textarea,
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
        type: MhDynamicFormElement.Slider,
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
        type: MhDynamicFormElement.DatePicker,
        flex: 45,
        default: null,
        required: false,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'slidetoggle',
        label: '开关',
        type: MhDynamicFormElement.SlideToggle,
        flex: 20,
        default: false,
        required: false,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'checkbox',
        label: '复选框',
        type: MhDynamicFormElement.Checkbox,
        flex: 20,
        default: false,
        required: false,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'checkboxgroup',
        label: '复选组',
        type: MhDynamicFormElement.CheckboxGroup,
        flex: 45,
        selections: [],
        default: [],
        required: false,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'select',
        label: '选择框',
        type: MhDynamicFormElement.Select,
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
        type: MhDynamicFormElement.Chips,
        flex: 45,
        selections: [],
        default: [],
        required: false,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'dialog-select',
        label: '弹窗选择框',
        type: MhDynamicFormElement.DialogSelect,
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
        type: MhDynamicFormElement.CascadSelect,
        flex: 45,
        default: null,
        required: false,
        selections: [],
        validateUrl: null,
        config: { depth: [], showField: null, valueField: null }
    }, {
        name: 'radio',
        label: '单选组',
        type: MhDynamicFormElement.Radio,
        flex: 45,
        selections: [],
        default: null,
        required: false,
        maxlength: null,
        validateUrl: null,
    }, {
        name: 'file',
        label: '文件上传',
        type: MhDynamicFormElement.File,
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
        type: MhDynamicFormElement.DataForm,
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
        type: MhDynamicFormElement.RichEditor,
        flex: 95,
        default: null,
        maxlength: null,
        validateUrl: null,
    }
];
var MhFormDesignComponent = (function () {
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
                var /** @type {?} */ bool = _this.validate();
                if (!bool) {
                    _this.notificationService.error('控件标识填写不规范或重复！');
                }
                return bool;
            },
        };
    }
    Object.defineProperty(MhFormDesignComponent.prototype, "valid", {
        get: /**
         * @return {?}
         */
        function () {
            return this.validate();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MhFormDesignComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.controls = this.getDemo();
        this.registerDrop();
        this.loaderService.loadOptions().subscribe(function (data) {
            _this.options = data;
        });
    };
    /**
     * @return {?}
     */
    MhFormDesignComponent.prototype.getDemo = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ arr = [];
        for (var _i = 0, controlDemo_1 = controlDemo; _i < controlDemo_1.length; _i++) {
            var c = controlDemo_1[_i];
            arr = arr.concat([Object.assign({}, c)]);
        }
        return arr;
    };
    /**
     * @return {?}
     */
    MhFormDesignComponent.prototype.registerDrop = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dragulaService.drop.map(function (value) {
            if (value[2].tagName === _this.elementTag
                && value[3].tagName === _this.controlTag) {
                if (value[4] === null || value[4].getAttribute('name') === _this.h3Name) {
                    _this.selectedindex = _this.elements.length - 1;
                }
                else {
                    var /** @type {?} */ preNodeIndex = _this.getElementIndex(value[4].getAttribute('name'));
                    _this.selectedindex = preNodeIndex - 1;
                }
                var /** @type {?} */ newObj = Object.assign({}, _this.elements[_this.selectedindex]);
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
                    var /** @type {?} */ preNodeIndex = _this.getElementIndex(value[4].getAttribute('name'));
                    _this.selectedindex = preNodeIndex - 1;
                }
            }
            return;
        }).subscribe(function () {
            _this.controls = _this.getDemo();
        });
    };
    /**
     * @return {?}
     */
    MhFormDesignComponent.prototype.validate = /**
     * @return {?}
     */
    function () {
        this.syncNameArr();
        var /** @type {?} */ arr = [];
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
    /**
     * @return {?}
     */
    MhFormDesignComponent.prototype.syncNameArr = /**
     * @return {?}
     */
    function () {
        this.nameArr = [];
        for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
            var e = _a[_i];
            this.nameArr = this.nameArr.concat([
                e.name
            ]);
        }
    };
    /**
     * @param {?} element
     * @return {?}
     */
    MhFormDesignComponent.prototype.elementClick = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        this.selectedindex = this.elements.indexOf(element);
    };
    /**
     * @param {?} name
     * @return {?}
     */
    MhFormDesignComponent.prototype.getElementIndex = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        for (var /** @type {?} */ i = 0; i < this.elements.length; i++) {
            if (this.elements[i].name === name) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @param {?} type
     * @param {?} field
     * @return {?}
     */
    MhFormDesignComponent.prototype.open = /**
     * @param {?} type
     * @param {?} field
     * @return {?}
     */
    function (type, field) {
        var _this = this;
        var /** @type {?} */ label = '';
        var /** @type {?} */ selections = [];
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
        var /** @type {?} */ dialogRef = this.dialog.open(MhDynamicDialogEntryComponent, {
            width: '70%',
            data: { label: label, data: selections, columns: [] }
        });
        dialogRef.afterClosed().filter(function (data) { return data; }).subscribe(function (data) {
            _this.elements[_this.selectedindex][field] = data.id;
        });
    };
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkDefault = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
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
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkMaxlength = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
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
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkMinMax = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'input'
            || type === 'number'
            || type === 'textarea'
            || type === 'slider') {
            return true;
        }
        return false;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkPattern = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'input'
            || type === 'number'
            || type === 'password'
            || type === 'textarea') {
            return true;
        }
        return false;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkDatasource = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'dialog-select'
            || type === 'data-form') {
            return true;
        }
        return false;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkDictionary = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'checkbox-group'
            || type === 'chips'
            || type === 'radio'
            || type === 'select'
            || type === 'cascad-select') {
            return true;
        }
        return false;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkControls = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'data-form') {
            return true;
        }
        return false;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkSelectFIeld = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'dialog-select'
            || type === 'cascad-select') {
            return true;
        }
        return false;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkMultiple = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'dialog-select'
            || type === 'select'
            || type === 'file') {
            return true;
        }
        return false;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkUploadAccept = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'file') {
            return true;
        }
        return false;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkIcon = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'input'
            || type === 'number'
            || type === 'password') {
            return true;
        }
        return false;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkSuffix = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'input'
            || type === 'number'
            || type === 'password') {
            return true;
        }
        return false;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkDepth = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'cascad-select') {
            return true;
        }
        return false;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    MhFormDesignComponent.prototype.checkEntryWidth = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'dialog-select') {
            return true;
        }
        return false;
    };
    /**
     * @return {?}
     */
    MhFormDesignComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.elements = [];
    };
    MhFormDesignComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-form-design',
                    template: "<div layout=\"row\"> <div flex=\"20\"> <td-expansion-panel label=\"控件\" [expand]=\"true\"> <mat-nav-list [dragula]=\"bagName\" [dragulaModel]=\"controls\" [dragulaOptions]=\"dragOpt\"> <mat-list-item *ngFor=\"let control of controls\" [id]=\"control.name\"> <mat-icon>call_made</mat-icon><span>{{control.label}}</span> </mat-list-item> </mat-nav-list> </td-expansion-panel> </div> <div flex=\"60\"> <td-expansion-panel label=\"表单面板\" [expand]=\"true\"> <div style=\"min-height:300px\" layout=\"row\" layout-wrap layout-margin layout-align=\"start center\" [dragula]=\"bagName\" [dragulaOptions]=\"dragOpt\" [dragulaModel]=\"elements\"> <div *ngFor=\"let element of elements\" [ngSwitch]=\"element.type\" [attr.flex]=\"element.flex\" (click)=\"elementClick(element)\" [attr.name]=\"element.name\"> <mat-form-field *ngSwitchCase=\"'number'\"> <input matInput [(ngModel)]=\"element.default\" [placeholder]=\"element.label\" [type]=\"element.type\" [required]=\"element.required\" [min]=\"element.min\" [max]=\"element.max\" [pattern]=\"element.pattern\" [maxlength]=\"element.maxlength\"> <mat-hint *ngIf=\"element.maxlength\" align=\"end\">{{element.default?.length}} / {{element.maxlength}}</mat-hint> </mat-form-field> <mat-form-field *ngSwitchCase=\"'input'\"> <input matInput [(ngModel)]=\"element.default\" [placeholder]=\"element.label\" [type]=\"element.type\" [required]=\"element.required\" [min]=\"element.min\" [max]=\"element.max\" [pattern]=\"element.pattern\" [maxlength]=\"element.maxlength\"> <mat-hint *ngIf=\"element.maxlength\" align=\"end\">{{element.default?.length}} / {{element.maxlength}}</mat-hint> </mat-form-field> <mat-form-field *ngSwitchCase=\"'password'\"> <input matInput [(ngModel)]=\"element.default\" [placeholder]=\"element.label\" [type]=\"element.type\" [required]=\"element.required\" [min]=\"element.min\" [max]=\"element.max\" [pattern]=\"element.pattern\" [maxlength]=\"element.maxlength\"> <mat-hint *ngIf=\"element.maxlength\" align=\"end\">{{element.default?.length}} / {{element.maxlength}}</mat-hint> </mat-form-field> <mat-form-field *ngSwitchCase=\"'textarea'\"> <textarea matInput rows=\"4\" [(ngModel)]=\"element.default\" [placeholder]=\"element.label\" [required]=\"element.required\" [pattern]=\"element.pattern\" [maxlength]=\"element.maxlength\"></textarea> <mat-hint *ngIf=\"element.maxlength\" align=\"end\">{{element.default?.length}} / {{element.maxlength}}</mat-hint> </mat-form-field> <div *ngSwitchCase=\"'slider'\" class=\"relative push-top\"> <label class=\"mat-input-placeholder mat-float td-slider-label\" [class.mat-focused]=\"slider._isActive\"> {{element.label}} <span *ngIf=\"element.required\" class=\"mat-placeholder-required\">*</span></label> <mat-slider #slider [(ngModel)]=\"element.default\" thumbLabel tickInterval=\"auto\" [required]=\"element.required\" [min]=\"element.min\" [max]=\"element.max\" [maxlength]=\"element.maxlength\"> </mat-slider> </div> <mat-form-field *ngSwitchCase=\"'date-picker'\"> <input matInput readonly [(ngModel)]=\"element.default\" [placeholder]=\"element.label+' (预览查看)'\" type=\"text\" [required]=\"element.required\"> </mat-form-field> <div *ngSwitchCase=\"'slide-toggle'\"> <mat-slide-toggle [(ngModel)]=\"element.default\" [required]=\"element.required\"> {{element.label}} </mat-slide-toggle> </div> <div *ngSwitchCase=\"'checkbox'\"> <mat-checkbox [(ngModel)]=\"element.default\" [required]=\"element.required\"> {{element.label}} </mat-checkbox> </div> <div *ngSwitchCase=\"'checkbox-group'\"> <label>{{element.label+' (预览查看)'}}</label> </div> <mat-form-field *ngSwitchCase=\"'select'\"> <input matInput readonly [(ngModel)]=\"element.default\" [placeholder]=\"element.label+' (预览查看)'\" [type]=\"element.type\" [required]=\"element.required\"> </mat-form-field> <mat-form-field *ngSwitchCase=\"'chips'\"> <input matInput readonly [(ngModel)]=\"element.default\" [placeholder]=\"element.label+' (预览查看)'\" [type]=\"element.type\" [required]=\"element.required\"> </mat-form-field> <div *ngSwitchCase=\"'radio'\"> <label>{{element.label+' (预览查看)'}}</label> </div> <mat-form-field *ngSwitchCase=\"'dialog-select'\"> <input matInput readonly [(ngModel)]=\"element.default\" [placeholder]=\"element.label+' (预览查看)'\" [type]=\"element.type\" [required]=\"element.required\"> </mat-form-field> <mat-form-field *ngSwitchCase=\"'data-form'\"> <input matInput readonly [(ngModel)]=\"element.default\" [placeholder]=\"element.label+' (预览查看)'\" [type]=\"element.type\" [required]=\"element.required\"> </mat-form-field> <mat-form-field *ngSwitchCase=\"'file'\"> <input matInput readonly [(ngModel)]=\"element.default\" [placeholder]=\"element.label+' (预览查看)'\" type=\"text\" [required]=\"element.required\"> </mat-form-field> <mat-form-field *ngSwitchCase=\"'cascad-select'\"> <input matInput readonly [(ngModel)]=\"element.default\" [placeholder]=\"element.label+' (预览查看)'\" type=\"text\" [required]=\"element.required\"> </mat-form-field> <mat-form-field *ngSwitchCase=\"'rich-editor'\"> <input matInput readonly [(ngModel)]=\"element.default\" [placeholder]=\"element.label+' (预览查看)'\" type=\"text\" [required]=\"element.required\"> </mat-form-field> </div> <div [attr.name]=\"h3Name\" flex=\"100\" *ngIf=\"elements.length === 0\" layout=\"row\" layout-align=\"center center\"> <h3>请将控件拖放至此区域</h3> </div> </div> </td-expansion-panel> </div> <div flex=\"20\"> <td-expansion-panel label=\"属性\" [expand]=\"true\"> <form #panelForm=\"ngForm\" *ngIf=\"selectedindex >= 0\"> <div layout=\"row\" layout-wrap layout-margin> <mat-form-field flex=\"100\"> <input matInput type=\"text\" name=\"name\" placeholder=\"控件标识\" [(ngModel)]=\"elements[selectedindex].name\" required> </mat-form-field> <mat-form-field flex=\"100\"> <input matInput type=\"text\" name=\"label\" placeholder=\"控件名称\" [(ngModel)]=\"elements[selectedindex].label\" required> </mat-form-field> <mat-form-field flex=\"100\"> <input matInput type=\"text\" name=\"type\" placeholder=\"控件类型\" [(ngModel)]=\"elements[selectedindex].type\" required> </mat-form-field> <mat-form-field flex=\"100\"> <input matInput type=\"number\" name=\"flex\" placeholder=\"控件宽度(%)\" [(ngModel)]=\"elements[selectedindex].flex\" required> </mat-form-field> <mat-form-field flex=\"100\"> <input matInput type=\"text\" name=\"validateUrl\" placeholder=\"校验URL\" [matTooltip]=\"'请求方式:post; body:{value:??}; 额外参数使用query'\" [(ngModel)]=\"elements[selectedindex].validateUrl\"> </mat-form-field> <mat-checkbox flex=\"100\" name=\"required\" [(ngModel)]=\"elements[selectedindex].required\"> <span>是否必填</span> </mat-checkbox> <mat-checkbox flex=\"100\" *ngIf=\"checkMultiple(elements[selectedindex].type)\" name=\"multiple\" [(ngModel)]=\"elements[selectedindex].multiple\"> <span>是否允许多选</span> </mat-checkbox> <mat-form-field flex=\"100\" *ngIf=\"checkDefault(elements[selectedindex].type)\"> <input matInput type=\"text\" name=\"default\" placeholder=\"默认值\" [(ngModel)]=\"elements[selectedindex].default\"> </mat-form-field> <mat-form-field flex=\"100\" *ngIf=\"checkMaxlength(elements[selectedindex].type)\"> <input matInput type=\"number\" name=\"maxlength\" [placeholder]=\"elements[selectedindex].type == 'file'?'文件最大尺寸':'最大长度'\" [(ngModel)]=\"elements[selectedindex].maxlength\"> </mat-form-field> <mat-form-field flex=\"100\" *ngIf=\"checkMinMax(elements[selectedindex].type)\"> <input matInput type=\"number\" name=\"min\" placeholder=\"最小值\" [(ngModel)]=\"elements[selectedindex].min\"> </mat-form-field> <mat-form-field flex=\"100\" *ngIf=\"checkMinMax(elements[selectedindex].type)\"> <input matInput type=\"number\" name=\"max\" placeholder=\"最大值\" [(ngModel)]=\"elements[selectedindex].max\"> </mat-form-field> <mat-form-field flex=\"100\" *ngIf=\"checkPattern(elements[selectedindex].type)\"> <input matInput type=\"text\" name=\"pattern\" placeholder=\"正则验证\" [(ngModel)]=\"elements[selectedindex].pattern\"> </mat-form-field> <mat-form-field flex=\"100\" *ngIf=\"checkControls(elements[selectedindex].type)\" (click)=\"open('dataform','controls')\"> <input matInput readonly type=\"text\" name=\"controls\" placeholder=\"数据表单\" [(ngModel)]=\"elements[selectedindex].controls\"> </mat-form-field> <mat-form-field flex=\"100\" *ngIf=\"checkDatasource(elements[selectedindex].type)\" (click)=\"open('datasource','selections')\"> <input matInput readonly type=\"text\" name=\"selections\" placeholder=\"数据源\" [(ngModel)]=\"elements[selectedindex].selections\"> </mat-form-field> <mat-form-field flex=\"100\" *ngIf=\"checkDictionary(elements[selectedindex].type)\" (click)=\"open('dictionary','selections')\"> <input matInput readonly type=\"text\" name=\"selections\" placeholder=\"数据字典\" [(ngModel)]=\"elements[selectedindex].selections\"> </mat-form-field> <mat-checkbox flex=\"100\" *ngIf=\"checkControls(elements[selectedindex].type)\" name=\"stateMode\" [(ngModel)]=\"elements[selectedindex].config.stateMode\"> <span>数据是否含状态</span> </mat-checkbox> <mat-form-field flex=\"100\" *ngIf=\"checkPattern(elements[selectedindex].type)\"> <input matInput type=\"text\" name=\"config\" placeholder=\"正则错误提示\" [(ngModel)]=\"elements[selectedindex].config.patternErrors\"> </mat-form-field> <mat-form-field flex=\"100\" *ngIf=\"checkSelectFIeld(elements[selectedindex].type)\"> <input matInput type=\"text\" name=\"showField\" placeholder=\"显示字段名\" matTooltip=\"需与[值字段名]同时设置并且非多选才生效\" [(ngModel)]=\"elements[selectedindex].config.showField\"> </mat-form-field> <mat-form-field flex=\"100\" *ngIf=\"checkSelectFIeld(elements[selectedindex].type)\"> <input matInput type=\"text\" name=\"valueField\" placeholder=\"值字段名\" matTooltip=\"需与[显示字段名]同时设置并且非多选才生效\" [(ngModel)]=\"elements[selectedindex].config.valueField\"> </mat-form-field> <mat-form-field flex=\"100\" *ngIf=\"checkEntryWidth(elements[selectedindex].type)\"> <input matInput type=\"text\" name=\"width\" placeholder=\"弹窗宽度(%)\" [(ngModel)]=\"elements[selectedindex].config.width\"> </mat-form-field> <mat-form-field flex=\"100\" *ngIf=\"checkUploadAccept(elements[selectedindex].type)\"> <input matInput type=\"text\" name=\"accept\" placeholder=\"上传文件格式\" [(ngModel)]=\"elements[selectedindex].config.accept\"> </mat-form-field> <mat-form-field flex=\"100\" *ngIf=\"checkIcon(elements[selectedindex].type)\"> <input matInput type=\"text\" name=\"icon\" placeholder=\"图标\" [(ngModel)]=\"elements[selectedindex].config.icon\"> </mat-form-field> <mat-select flex=\"100\" *ngIf=\"checkIcon(elements[selectedindex].type)\" name=\"iconColor\" placeholder=\"图标颜色\" [(ngModel)]=\"elements[selectedindex].config.iconColor\"> <mat-option value=\"\"></mat-option> <mat-option value=\"accent\">accent</mat-option> <mat-option value=\"primary\">primary</mat-option> <mat-option value=\"warn\">warn</mat-option> </mat-select> <mat-form-field flex=\"100\" *ngIf=\"checkSuffix(elements[selectedindex].type)\"> <input matInput type=\"text\" name=\"suffix\" placeholder=\"后缀(单位)\" [(ngModel)]=\"elements[selectedindex].config.suffix\"> </mat-form-field> <mat-form-field flex=\"100\" *ngIf=\"checkDepth(elements[selectedindex].type)\"> <textarea matInput rows=\"4\" name=\"depth\" placeholder=\"异步数据来源\" matTooltip=\"多层级用;隔开 ${value}代表上一级的key，填写此字段数据字典将不再生效\" [(ngModel)]=\"elements[selectedindex].config.depth\"></textarea> </mat-form-field> </div> </form> </td-expansion-panel> </div> </div> ",
                },] },
    ];
    /** @nocollapse */
    MhFormDesignComponent.ctorParameters = function () { return [
        { type: MatDialog, },
        { type: DragulaService, },
        { type: undefined, decorators: [{ type: Inject, args: ['notify',] },] },
        { type: MhDynamicLoaderService, },
    ]; };
    MhFormDesignComponent.propDecorators = {
        "panelForm": [{ type: ViewChild, args: ['panelForm',] },],
        "elements": [{ type: Input },],
    };
    return MhFormDesignComponent;
}());
export { MhFormDesignComponent };
function MhFormDesignComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhFormDesignComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhFormDesignComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MhFormDesignComponent.propDecorators;
    /** @type {?} */
    MhFormDesignComponent.prototype.panelForm;
    /** @type {?} */
    MhFormDesignComponent.prototype.controlTag;
    /** @type {?} */
    MhFormDesignComponent.prototype.elementTag;
    /** @type {?} */
    MhFormDesignComponent.prototype.h3Name;
    /** @type {?} */
    MhFormDesignComponent.prototype.bagName;
    /** @type {?} */
    MhFormDesignComponent.prototype.options;
    /** @type {?} */
    MhFormDesignComponent.prototype.selectControls;
    /** @type {?} */
    MhFormDesignComponent.prototype.controls;
    /** @type {?} */
    MhFormDesignComponent.prototype.elements;
    /** @type {?} */
    MhFormDesignComponent.prototype.nameArr;
    /** @type {?} */
    MhFormDesignComponent.prototype.selectedindex;
    /** @type {?} */
    MhFormDesignComponent.prototype.dragOpt;
    /** @type {?} */
    MhFormDesignComponent.prototype.dialog;
    /** @type {?} */
    MhFormDesignComponent.prototype.dragulaService;
    /** @type {?} */
    MhFormDesignComponent.prototype.notificationService;
    /** @type {?} */
    MhFormDesignComponent.prototype.loaderService;
}
