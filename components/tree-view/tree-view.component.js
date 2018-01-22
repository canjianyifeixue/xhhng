/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
/**
 * 树结构相关方法封装
 */
var TreeViewComponent = (function () {
    function TreeViewComponent() {
        this.icon = 'adjust';
        this.nodes = [];
        this.multiple = false;
        this.nodeName = 'name';
        this.nodeIcon = 'icon';
        this.selected = new EventEmitter();
        this.options = {
            animateExpand: true,
            animateSpeed: 5,
        };
    }
    /**
     * 选择树形节点
     * @param {?} event 所选择的属性节点
     * @return {?}
     */
    TreeViewComponent.prototype.select = /**
     * 选择树形节点
     * @param {?} event 所选择的属性节点
     * @return {?}
     */
    function (event) {
        this.selected.emit(event.node.data);
    };
    /**
     * 根据当前节点的状态来检测改变父节点，子节点的状态
     * @param {?} node
     * @param {?} $event
     * @return {?}
     */
    TreeViewComponent.prototype.check = /**
     * 根据当前节点的状态来检测改变父节点，子节点的状态
     * @param {?} node
     * @param {?} $event
     * @return {?}
     */
    function (node, $event) {
        this.updateChildNodesCheckBox(node, $event.checked);
        this.updateParentNodesCheckBox(node.parent);
    };
    /**
     * 更新子节点的复选框
     * @param {?} node 当前节点
     * @param {?} checked 勾选状态
     * @return {?}
     */
    TreeViewComponent.prototype.updateChildNodesCheckBox = /**
     * 更新子节点的复选框
     * @param {?} node 当前节点
     * @param {?} checked 勾选状态
     * @return {?}
     */
    function (node, checked) {
        var _this = this;
        node.data.checked = checked;
        if (node.children) {
            node.children.forEach(function (child) { return _this.updateChildNodesCheckBox(child, checked); });
        }
    };
    /**
     * 更新父节点的复选框
     * @param {?} node
     * @return {?}
     */
    TreeViewComponent.prototype.updateParentNodesCheckBox = /**
     * 更新父节点的复选框
     * @param {?} node
     * @return {?}
     */
    function (node) {
        if (node && node.level > 0 && node.children) {
            var /** @type {?} */ allChildChecked = true;
            var /** @type {?} */ noChildChecked = true;
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (!child.data.checked) {
                    allChildChecked = false;
                }
                else if (child.data.checked) {
                    noChildChecked = false;
                }
            }
            if (allChildChecked) {
                node.data.checked = true;
                node.data.indeterminate = false;
            }
            else if (noChildChecked) {
                node.data.checked = false;
                node.data.indeterminate = false;
            }
            else {
                node.data.checked = true;
                node.data.indeterminate = true;
            }
            this.updateParentNodesCheckBox(node.parent);
        }
    };
    TreeViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mh-tree-view',
                    template: "<tree-root [nodes]=\"nodes\" (activate)=\"select($event)\" [options]=\"options\"> <ng-template #treeNodeTemplate let-node let-index=\"index\"> <div layout=\"row\" layout-align=\" center\"> <mat-checkbox *ngIf=\"multiple\" [checked]=\"node.data.checked\" [indeterminate]=\"node.data.indeterminate\" (change)=\"check(node, $event)\" color=\"primary\"> <span>&nbsp;</span> </mat-checkbox> <mat-icon color=\"accent\">{{node.data[nodeIcon] || icon}}</mat-icon> <span class=\"push-left-xs\">{{ node.data[nodeName] }}</span> </div> </ng-template> </tree-root> ",
                },] },
    ];
    /** @nocollapse */
    TreeViewComponent.ctorParameters = function () { return []; };
    TreeViewComponent.propDecorators = {
        "icon": [{ type: Input },],
        "nodes": [{ type: Input },],
        "multiple": [{ type: Input },],
        "nodeName": [{ type: Input },],
        "nodeIcon": [{ type: Input },],
        "selected": [{ type: Output },],
    };
    return TreeViewComponent;
}());
export { TreeViewComponent };
function TreeViewComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TreeViewComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TreeViewComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TreeViewComponent.propDecorators;
    /** @type {?} */
    TreeViewComponent.prototype.icon;
    /** @type {?} */
    TreeViewComponent.prototype.nodes;
    /** @type {?} */
    TreeViewComponent.prototype.multiple;
    /** @type {?} */
    TreeViewComponent.prototype.nodeName;
    /** @type {?} */
    TreeViewComponent.prototype.nodeIcon;
    /** @type {?} */
    TreeViewComponent.prototype.selected;
    /** @type {?} */
    TreeViewComponent.prototype.options;
}
