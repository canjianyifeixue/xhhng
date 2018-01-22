/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TreeViewComponent } from "./tree-view.component";
import { TreeModule } from "angular-tree-component";
import { MatIconModule, MatCheckboxModule } from "@angular/material";
var MhTreeViewModule = (function () {
    function MhTreeViewModule() {
    }
    MhTreeViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, TreeModule, MatIconModule, MatCheckboxModule],
                    exports: [TreeViewComponent],
                    declarations: [TreeViewComponent]
                },] },
    ];
    /** @nocollapse */
    MhTreeViewModule.ctorParameters = function () { return []; };
    return MhTreeViewModule;
}());
export { MhTreeViewModule };
function MhTreeViewModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MhTreeViewModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MhTreeViewModule.ctorParameters;
}
