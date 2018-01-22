import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MhDynamicFormElementConfig, MhDynamicFormElement, MhFormsService } from '../forms/index';

@Component({
  selector: 'mh-task-form',
  templateUrl: './task-form.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit {

  @Input() public forms: any;
  @Input() public data: any;
  @Input() public editable = false;
  @Output() public close = new EventEmitter<any>();
  @Input() public showDialog = true;

  public opinion: any;
  public formData: any;
  public default: any;
  public elements: MhDynamicFormElementConfig[] = [];

  constructor(
    private formsService: MhFormsService,
  ) { }

  public ngOnInit() {
    this.default = this.data.processData;
    if (this.editable) {
      this.opinion = JSON.parse(this.data.processVar).opinion;
      this.elements = [
        {
          name: 'complete',
          label: '是否重新提交',
          type: MhDynamicFormElement.Radio,
          selections: [{ key: 'true', value: '重新提交' }, { key: 'false', value: '废弃' }],
          flex: 45,
          required: true
        }];
    } else {
      this.elements = [
        {
          name: 'complete',
          label: '审核结果',
          type: MhDynamicFormElement.Radio,
          selections: [{ key: 'true', value: '通过' }, { key: 'false', value: '驳回' }],
          flex: 45,
          required: true
        },
        {
          name: 'opinion',
          label: '审核意见',
          type: MhDynamicFormElement.Textarea,
          flex: 95
        }
      ];
    }

  }

  public open() {
    this.formsService.openStepForm({
      forms: this.forms,
      default: this.default,
      title: '数据审核',
      showActions: this.editable
    }).subscribe((_: any) => {
      if (this.editable) { this.formData = _; }
    });
  }

  public save(value: any) {
    if (this.editable && this.formData) {
      this.close.emit(Object.assign(value, { formData: this.formData }));
    } else {
      this.close.emit(value);
    }
  }

  public cancel() {
    this.close.emit();
  }

}
