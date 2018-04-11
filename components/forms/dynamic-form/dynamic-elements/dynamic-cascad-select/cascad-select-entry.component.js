"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var cascad_select_service_1 = require("./cascad-select.service");
var fuse_js_1 = require("../../../../../util/fuse-js");
var Observable_1 = require("rxjs/Observable");
var MhCascadSelectEntryComponent = /** @class */ (function () {
    function MhCascadSelectEntryComponent(dialogRef, cascadSelectService, dialogData) {
        this.dialogRef = dialogRef;
        this.cascadSelectService = cascadSelectService;
        this.dialogData = dialogData;
        this.data = [];
        this.selections = [];
        this.selectedData = [];
        this.title = '';
        this.async = false;
        this.keyField = 'key';
        this.valueField = 'value';
        this.depth = 0;
        this.selectDepth = 0;
        this.backupSelections = [];
        this.searchTerm = '';
        this.fuseOptions = {
            threshold: 0.1,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 2,
            keys: [],
        };
        // this.cascadSelectService = new CascadSelectService(http);
    }
    MhCascadSelectEntryComponent.prototype.ngOnInit = function () {
        this.data = this.dialogData.selections;
        this.title = this.dialogData.title;
        this.async = this.dialogData.async;
        this.keyField = this.dialogData.keyField;
        this.valueField = this.dialogData.valueField;
        this.selectedData = this.dialogData.default || [];
        if (this.async) {
            this.depth = this.data.split(';').length;
            this.selectDepth = 0;
            this.initAsyncSelection();
        }
        else {
            this.initSelection();
        }
    };
    MhCascadSelectEntryComponent.prototype.initSelection = function () {
        var _this = this;
        this.cascadSelectService.initSelection(this.data, this.selectedData, this.keyField).subscribe(function (_) {
            _this.selections = _.selections;
            _this.selectedData = _.selectedData;
            _this.initFuse();
        });
    };
    MhCascadSelectEntryComponent.prototype.initAsyncSelection = function () {
        var _this = this;
        this.cascadSelectService.initAsyncSelection(this.selectedData, this.data, this.selections, this.selectDepth, this.keyField, this.valueField).subscribe(function (_) {
            _this.selectDepth = _.selectDepth;
            _this.selectedData = _.selectedData;
            _this.selections = _.selections;
            _this.initFuse();
        });
    };
    MhCascadSelectEntryComponent.prototype.loadAsyncSelection = function (arr) {
        var _this = this;
        this.cascadSelectService.loadAsyncSelection(arr, this.selectedData, this.selections, this.selectDepth, this.keyField, this.valueField).subscribe(function (_) {
            _this.selectDepth = _.selectDepth;
            _this.selectedData = _.selectedData;
            _this.selections = _.selections;
            _this.initFuse();
        });
    };
    MhCascadSelectEntryComponent.prototype.select = function (selection) {
        var _this = this;
        this.selectedData = this.selectedData.concat([{ key: selection[this.keyField], value: selection[this.valueField] }]);
        if (this.async && this.depth > this.selectDepth + 1) {
            this.selectDepth += 1;
            this.cascadSelectService.loadAsyncData(this.data, this.selectDepth, selection[this.keyField]).subscribe(function (_) {
                _this.selections = _.items;
            });
            return;
        }
        if (!this.async && selection.children) {
            this.selections = selection.children;
            return;
        }
        this.dialogRef.close(this.selectedData);
        this.selectedData = [];
    };
    MhCascadSelectEntryComponent.prototype.initFuse = function () {
        var _this = this;
        this.fuseOptions.keys = ['key', 'value'];
        this.backupSelections = this.selections.slice();
        this.fuse = new fuse_js_1.fusejs(this.selections, this.fuseOptions);
        Observable_1.Observable.interval()
            .map(function (_) { return _this.searchTerm; })
            .distinctUntilChanged()
            .subscribe(function (_) {
            if (_ && _.length > 0) {
                _this.selections = _this.fuse.search(_this.searchTerm);
            }
            else {
                _this.selections = _this.backupSelections;
            }
        });
    };
    MhCascadSelectEntryComponent.prototype.clear = function () {
        this.selectedData = [];
        this.dialogRef.close([]);
    };
    MhCascadSelectEntryComponent.prototype.pop = function (index) {
        this.selectedData = this.selectedData.slice(0, index);
        if (this.async) {
            var arr = [this.cascadSelectService.loadAsyncData(this.data, 0)];
            for (var i = 0; i < this.selectedData.length; i++) {
                arr.push(this.cascadSelectService.loadAsyncData(this.data, i + 1, this.selectedData[i].key));
            }
            this.loadAsyncSelection(arr);
        }
        else {
            this.initSelection();
        }
    };
    MhCascadSelectEntryComponent = __decorate([
        core_1.Component({
            selector: 'mh-cascad-select-entry',
            templateUrl: './cascad-select-entry.component.html',
            providers: [cascad_select_service_1.CascadSelectService]
        }),
        __param(2, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], MhCascadSelectEntryComponent);
    return MhCascadSelectEntryComponent;
}());
exports.MhCascadSelectEntryComponent = MhCascadSelectEntryComponent;
