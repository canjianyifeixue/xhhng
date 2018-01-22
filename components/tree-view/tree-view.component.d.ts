import { EventEmitter } from '@angular/core';
export declare class TreeViewComponent {
    icon: string;
    nodes: any[];
    multiple: boolean;
    nodeName: string;
    nodeIcon: string;
    selected: EventEmitter<any>;
    options: any;
    /**
     * 选择树形节点
     * @param event 所选择的属性节点
     */
    select(event: any): void;
    /**
     * 根据当前节点的状态来检测改变父节点，子节点的状态
     * @param node
     * @param
     */
    check(node: any, $event: any): void;
    /**
     * 更新子节点的复选框
     * @param node 当前节点
     * @param checked 勾选状态
     */
    updateChildNodesCheckBox(node: any, checked: any): void;
    /**
     * 更新父节点的复选框
     */
    updateParentNodesCheckBox(node: any): void;
}
