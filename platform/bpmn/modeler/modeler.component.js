"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// declare const require: any;
// const modeler = require('bpmn-js/lib/Modeler');
// import * as Modeler from 'bpmn-js/lib/Modeler';
// const propertiesPanelModule = require('bpmn-js-properties-panel');
// const propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/bpmn');
var ModelerComponent = /** @class */ (function () {
    function ModelerComponent() {
    }
    // private xml: any;
    // private viewer: any;
    ModelerComponent.prototype.ngOnInit = function () {
        // this.viewer = new Modeler({ container: '#js-canvas' });
    };
    ModelerComponent = __decorate([
        core_1.Component({
            selector: 'mh-bpmn-modeler',
            templateUrl: './modeler.component.html',
            styleUrls: ['./modeler.component.scss']
        })
    ], ModelerComponent);
    return ModelerComponent;
}());
exports.ModelerComponent = ModelerComponent;
