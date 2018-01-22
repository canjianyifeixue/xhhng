import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { TdDataTableService } from '@covalent/core';
import { BaseTable } from '../table/index';
import { flyIn } from '../../animations/fly-in';
import { TdCollapseAnimation } from '@covalent/core';
import { NotificationService } from '../../services/index';
import { jsesc } from '../../util/jsesc';
import { TaskService } from './task.service';

@Component({
  selector: 'mh-task',
  templateUrl: './task.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [flyIn, TdCollapseAnimation()]
})
export class MhTaskComponent extends BaseTable implements OnInit {

  @Input() public key: string;
  @Input() public title: string;
  @Input() public columns: any[] = [
    { name: 'name', label: '任务名称', tooltip: '当前执行的节点名称' },
    { name: 'processName', label: '流程名称' },
    { name: 'createTime', label: '创建时间' },
    { name: 'operation', label: '操作' }
  ];

  @Input() public sortBy = '';
  @Input() public handleDialog = true;
  @Input() public customFilter: (data: any[]) => any[] = ((data: any) => data);
  @Input() public userId = '';

  public data: any[] = [];

  public formMode = false;
  public formControls: any;
  public formData: any;
  public formEditable = false;
  public selectedData: any;

  constructor(
    dataTableService: TdDataTableService,
    private notificationService: NotificationService,
    private taskService: TaskService,
    cdr: ChangeDetectorRef,
  ) {
    super(dataTableService, cdr);
  }

  public ngOnInit(): void {
    this.get();
  }

  public get() {
    this.taskService.getTaskList(this.userId, this.key).subscribe((data: any) => {
      this.data = this.filterBizData(data.items);
      this.filter();
    });
  }

  public trace(row: any) {
    window.open('/assets/activiti_modeler/diagram-viewer/index.html?' +
      `processDefinitionId=${row.processDefinitionId}&processInstanceId=${row.processInstanceId}`
    );
  }

  public handle(row: any) {
    // const form$ = this.taskService.getFormByProcessKey(row.processDefinitionId.split(':')[0]);
    // const data$ = this.taskService.getProcessInfo(row.processInstanceId);
    // const act$ = this.taskService.getDynamicField(row.id);
    // Observable.combineLatest(form$, data$, act$).subscribe(_ => {
    const [forms, data, act] = [...row._processData] || [{}, {}, {}];
    if (Object.keys(forms).length <= 0 || Object.keys(data).length <= 0) { this.notificationService.error('数据异常！'); return; }
    this.formControls = forms;
    const newData = Object.assign({}, data);
    const dataStr = newData.processData;
    newData.processData = JSON.parse(jsesc(dataStr));
    this.formData = newData;
    this.selectedData = row;
    this.formEditable = this.canEdit(act);
    this.formMode = true;
    // })
  }

  public save(data: any) {
    if (!data) { this.cancel(); return; }
    let processData = {};
    let bizFormData: any = null;
    if (data.formData) {
      for (const key of Object.keys(data.formData)) {
        processData = Object.assign(processData, data.formData[key]);
      }
      bizFormData = data.formData;
      delete data['formData'];
    } else {
      for (const key of Object.keys(this.formData.processData)) {
        processData = Object.assign(processData, this.formData.processData[key]);
      }
    }
    processData = Object.assign(processData, data);
    const formData = {
      userId: this.userId,
      taskId: this.selectedData.id,
      processInstanceId: this.selectedData.processInstanceId,
      formData: JSON.stringify(processData)
    };
    this.taskService.completeTask(formData)
      .flatMap((_: any) => {
        const v = {
          taskId: this.selectedData.id,
          state: this.selectedData.name,
          processVar: JSON.stringify(data),
          processData: JSON.stringify(bizFormData ? bizFormData : this.formData.processData)
        };
        let action$ = this.taskService.updateProcess(this.selectedData.processInstanceId, v);
        if (_.isFinish === true || _.isFinish === 'true') {
          action$ = action$.flatMap(() => this.taskService.finishProcess(this.selectedData.processInstanceId,
            JSON.parse(v.processVar)));
        }
        return action$;
      })
      .subscribe((_: any) => {
        this.notificationService.success('提交成功');
        this.get();
        this.cancel();
      });
  }

  public cancel() {
    this.formMode = false;
    this.formData = undefined;
    this.formControls = undefined;
    this.selectedData = undefined;
    this.formEditable = false;
  }

  public canEdit(form: any): boolean {
    if (!form.formData || !form.formData.formProperties) { return false; }
    for (const field of form.formData.formProperties) {
      if (field.id === 'editable' && field.writable === true) { return true; }
    }
    return false;
  }

  public filterBizData(data: any[]): any[] {
    const tasks = [];
    // filter columns
    for (const row of data) {
      for (const col of this.columns) {
        if (col.get instanceof Function) {
          row[col.name] = col.get(row);
          break;
        }
      }
      tasks.push(row);
    }
    const newTasks = this.customFilter(tasks);
    if (!newTasks) {
      // throw new Error('customFilter必须有一个返回值, type: any[]');
      return tasks;
    }
    return newTasks;
  }

  public hasColumn(name: string): boolean {
    for (const col of this.columns) {
      if (col.name === name) {
        return true;
      }
    }
    return false;
  }
}
