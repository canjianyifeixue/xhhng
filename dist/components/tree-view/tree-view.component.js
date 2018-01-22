"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TreeViewComponent = /** @class */ (function () {
    function TreeViewComponent() {
        this.icon = 'adjust';
        this.nodes = [];
        this.multiple = false;
        this.nodeName = 'name';
        this.nodeIcon = 'icon';
        this.selected = new core_1.EventEmitter();
        this.options = {
            animateExpand: true,
            animateSpeed: 5,
        };
    }
    /**
     * 选择树形节点
     * @param event 所选择的属性节点
     */
    TreeViewComponent.prototype.select = function (event) {
        this.selected.emit(event.node.data);
    };
    /**
     * 根据当前节点的状态来检测改变父节点，子节点的状态
     * @param node
     * @param
     */
    TreeViewComponent.prototype.check = function (node, $event) {
        this.updateChildNodesCheckBox(node, $event.checked);
        this.updateParentNodesCheckBox(node.parent);
    };
    /**
     * 更新子节点的复选框
     * @param node 当前节点
     * @param checked 勾选状态
     */
    TreeViewComponent.prototype.updateChildNodesCheckBox = function (node, checked) {
        var _this = this;
        node.data.checked = checked;
        if (node.children) {
            node.children.forEach(function (child) { return _this.updateChildNodesCheckBox(child, checked); });
        }
    };
    /**
     * 更新父节点的复选框
     */
    TreeViewComponent.prototype.updateParentNodesCheckBox = function (node) {
        if (node && node.level > 0 && node.children) {
            var allChildChecked = true;
            var noChildChecked = true;
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
    __decorate([
        core_1.Input()
    ], TreeViewComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], TreeViewComponent.prototype, "nodes", void 0);
    __decorate([
        core_1.Input()
    ], TreeViewComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input()
    ], TreeViewComponent.prototype, "nodeName", void 0);
    __decorate([
        core_1.Input()
    ], TreeViewComponent.prototype, "nodeIcon", void 0);
    __decorate([
        core_1.Output()
    ], TreeViewComponent.prototype, "selected", void 0);
    TreeViewComponent = __decorate([
        core_1.Component({
            selector: 'mh-tree-view',
            templateUrl: './tree-view.component.html',
        })
        /**
         * 树结构相关方法封装
         */
    ], TreeViewComponent);
    return TreeViewComponent;
}());
exports.TreeViewComponent = TreeViewComponent;
