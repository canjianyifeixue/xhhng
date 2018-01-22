import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mh-tree-view',
  templateUrl: './tree-view.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * 树结构相关方法封装
 */
export class TreeViewComponent {

  @Input() public icon = 'adjust';
  @Input() public nodes: any[] = [];
  @Input() public multiple = false;
  @Input() public nodeName = 'name';
  @Input() public nodeIcon = 'icon';
  @Output() public selected = new EventEmitter<any>();
  public options: any = {
    animateExpand: true,
    animateSpeed: 5,
  };

  /**
   * 选择树形节点
   * @param event 所选择的属性节点
   */
  public select(event: any) {
    this.selected.emit(event.node.data);
  }

  /**
   * 根据当前节点的状态来检测改变父节点，子节点的状态
   * @param node
   * @param
   */
  public check(node: any, $event: any) {
    this.updateChildNodesCheckBox(node, $event.checked);
    this.updateParentNodesCheckBox(node.parent);
  }

  /**
   * 更新子节点的复选框
   * @param node 当前节点
   * @param checked 勾选状态
   */
  public updateChildNodesCheckBox(node: any, checked: any) {
    node.data.checked = checked;
    if (node.children) {
      node.children.forEach((child: any) => this.updateChildNodesCheckBox(child, checked));
    }
  }

  /**
   * 更新父节点的复选框
   */
  public updateParentNodesCheckBox(node: any) {
    if (node && node.level > 0 && node.children) {
      let allChildChecked = true;
      let noChildChecked = true;

      for (const child of node.children) {
        if (!child.data.checked) {
          allChildChecked = false;
        } else if (child.data.checked) {
          noChildChecked = false;
        }
      }

      if (allChildChecked) {
        node.data.checked = true;
        node.data.indeterminate = false;
      } else if (noChildChecked) {
        node.data.checked = false;
        node.data.indeterminate = false;
      } else {
        node.data.checked = true;
        node.data.indeterminate = true;
      }
      this.updateParentNodesCheckBox(node.parent);
    }
  }
}
