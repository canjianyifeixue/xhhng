import { Component, OnInit, Input, ViewChild, Inject, OnDestroy } from '@angular/core';

import { DragulaService } from 'ng2-dragula';
import { MhDynamicFormElement, MhDynamicFormElementConfig } from './dynamic-form.entity';
import { MatDialog } from '@angular/material';
import { MhDynamicDialogEntryComponent } from './dynamic-elements/dynamic-dialog-entry.component';
import { MhDynamicLoaderService } from './dynamic-loader.service';

const controlDemo: MhDynamicFormElementConfig[] = [
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

@Component({
  selector: 'mh-form-design',
  templateUrl: './form-design.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MhFormDesignComponent implements OnInit, OnDestroy {

  @ViewChild('panelForm') public panelForm: any;

  public controlTag = 'mat-NAV-LIST';
  public elementTag = 'DIV';
  public h3Name = '_$none_';
  public bagName = 'bag';

  public options: any;

  public selectControls: any[] = [];

  public controls: MhDynamicFormElementConfig[] = [];

  @Input() public elements: any[] = [];

  public nameArr: string[] = [];

  public selectedindex = -1;

  get valid(): boolean {
    return this.validate();
  }

  public dragOpt: any = {
    moves: (e: any) => {
      if (e.getAttribute('name') === this.h3Name) {
        return false;
      }
      const bool = this.validate();
      if (!bool) {
        this.notificationService.error('控件标识填写不规范或重复！');
      }
      return bool;
    },
  };

  constructor(
    private dialog: MatDialog,
    private dragulaService: DragulaService,
    @Inject('notify') private notificationService: any,
    private loaderService: MhDynamicLoaderService,
  ) { }

  public ngOnInit() {
    this.controls = this.getDemo();
    this.registerDrop();
    this.loaderService.loadOptions().subscribe((data: any) => {
      this.options = data;
    });
  }

  public getDemo(): any[] {
    let arr: any[] = [];
    for (const c of controlDemo) {
      arr = [...arr, Object.assign({}, c)];
    }
    return arr;
  }

  public registerDrop() {
    this.dragulaService.drop.map((value: any) => {
      if (value[2].tagName === this.elementTag
        && value[3].tagName === this.controlTag) {
        if (value[4] === null || value[4].getAttribute('name') === this.h3Name) {
          this.selectedindex = this.elements.length - 1;
        } else {
          const preNodeIndex = this.getElementIndex(value[4].getAttribute('name'));
          this.selectedindex = preNodeIndex - 1;
        }
        const newObj = Object.assign({}, this.elements[this.selectedindex]);
        // const newObj = JSON.parse(JSON.stringify(this.elements[this.selectedindex]));
        newObj.name = '';
        this.elements[this.selectedindex] = newObj;
        this.syncNameArr();
      } else if (value[2].tagName === this.controlTag
        && value[3].tagName === this.elementTag) {
        this.selectedindex = -1;
      } else if (value[2].tagName === this.controlTag
        && value[3].tagName === this.controlTag) {
        // nothing to do
      } else if (value[2].tagName === this.elementTag
        && value[3].tagName === this.elementTag) {
        if (value[4] === null || value[4].getAttribute('name') === 'none') {
          this.selectedindex = this.elements.length - 1;
        } else {
          const preNodeIndex = this.getElementIndex(value[4].getAttribute('name'));
          this.selectedindex = preNodeIndex - 1;
        }
      }
      return;
    }).subscribe(() => {
      this.controls = this.getDemo();
    });
  }

  public validate(): boolean {
    this.syncNameArr();
    const arr = [];
    for (const name of this.nameArr) {
      if (name === null
        || name.length <= 0
        || !name.match(/^[A-Za-z_]([A-Za-z0-9_])*$/)
        || arr.indexOf(name) >= 0) {
        return false;
      }
      arr.push(name);
    }
    return true;
  }
  public syncNameArr() {
    this.nameArr = [];
    for (const e of this.elements) {
      this.nameArr = [
        ...this.nameArr,
        e.name
      ];
    }
  }

  public elementClick(element: any) {
    this.selectedindex = this.elements.indexOf(element);
  }

  public getElementIndex(name: string) {
    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].name === name) {
        return i;
      }
    }
    return -1;
  }

  public open(type: string, field: string) {
    let label = '';
    let selections = [];
    switch (type) {
      case 'datasource':
        label = '选择数据源';
        selections = [...this.options.datasource];
        for (const s of selections) {
          delete s['sql'];
          delete s['params'];
          delete s['columns'];
        }
        break;
      case 'dictionary':
        label = '选择数据字典';
        selections = [...this.options.dictionary];
        for (const s of selections) {
          delete s['map'];
        }
        break;
      case 'dataform':
        label = '选择数据表单';
        selections = [...this.options.dataform];
        for (const s of selections) {
          delete s['controls'];
        }
        break;
    }
    const dialogRef = this.dialog.open(MhDynamicDialogEntryComponent, {
      width: '70%',
      data: { label, data: selections, columns: [] }
    });
    dialogRef.afterClosed().filter((data: any) => data).subscribe((data: any) => {
      this.elements[this.selectedindex][field] = data.id;
    });
  }

  public checkDefault(type: string): boolean {
    if (type === 'input'
      || type === 'number'
      || type === 'password'
      || type === 'textarea'
      || type === 'slider'
      || type === 'slide-toggle'
      || type === 'datepicker'
      || type === 'checkbox'
      || type === 'rich-editor'
      || type === 'cascad-select'
    ) {
      return true;
    }
    return false;
  }

  public checkMaxlength(type: string): boolean {
    if (type === 'input'
      || type === 'number'
      || type === 'password'
      || type === 'textarea'
      || type === 'file'
      || type === 'rich-editor'
    ) {
      return true;
    }
    return false;
  }

  public checkMinMax(type: string): boolean {
    if (type === 'input'
      || type === 'number'
      || type === 'textarea'
      || type === 'slider'
    ) {
      return true;
    }
    return false;
  }

  public checkPattern(type: string): boolean {
    if (type === 'input'
      || type === 'number'
      || type === 'password'
      || type === 'textarea'
    ) {
      return true;
    }
    return false;
  }

  public checkDatasource(type: string): boolean {
    if (type === 'dialog-select'
      || type === 'data-form'
    ) {
      return true;
    }
    return false;
  }

  public checkDictionary(type: string): boolean {
    if (type === 'checkbox-group'
      || type === 'chips'
      || type === 'radio'
      || type === 'select'
      || type === 'cascad-select'
    ) {
      return true;
    }
    return false;
  }

  public checkControls(type: string): boolean {
    if (type === 'data-form'
    ) {
      return true;
    }
    return false;
  }

  public checkSelectFIeld(type: string): boolean {
    if (type === 'dialog-select'
      || type === 'cascad-select'
    ) {
      return true;
    }
    return false;
  }

  public checkMultiple(type: string): boolean {
    if (type === 'dialog-select'
      || type === 'select'
      || type === 'file'
    ) {
      return true;
    }
    return false;
  }

  public checkUploadAccept(type: string): boolean {
    if (type === 'file'
    ) {
      return true;
    }
    return false;
  }

  public checkIcon(type: string): boolean {
    if (type === 'input'
      || type === 'number'
      || type === 'password'
    ) {
      return true;
    }
    return false;
  }

  public checkSuffix(type: string): boolean {
    if (type === 'input'
      || type === 'number'
      || type === 'password'
    ) {
      return true;
    }
    return false;
  }

  public checkDepth(type: string): boolean {
    if (type === 'cascad-select'
    ) {
      return true;
    }
    return false;
  }

  public checkEntryWidth(type: string): boolean {
    if (type === 'dialog-select'
    ) {
      return true;
    }
    return false;
  }

  public ngOnDestroy() {
    this.elements = [];
  }
}
