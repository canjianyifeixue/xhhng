import { Component, OnInit } from '@angular/core';

// declare const require: any;

// const modeler = require('bpmn-js/lib/Modeler');
// import * as Modeler from 'bpmn-js/lib/Modeler';
// const propertiesPanelModule = require('bpmn-js-properties-panel');
// const propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/bpmn');

@Component({
  selector: 'mh-bpmn-modeler',
  templateUrl: './modeler.component.html',
  styleUrls: ['./modeler.component.scss']
})
export class ModelerComponent implements OnInit {

  // private xml: any;
  // private viewer: any;

  public ngOnInit() {
    // this.viewer = new Modeler({ container: '#js-canvas' });
  }

}
