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
var fuse_js_1 = require("../../../../util/fuse-js");
var Observable_1 = require("rxjs/Observable");
var MhDynamicSelectEntryComponent = /** @class */ (function () {
    function MhDynamicSelectEntryComponent(dialogRef, dialogData) {
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this.selections = [];
        this.multiple = false;
        this.title = '';
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
    }
    MhDynamicSelectEntryComponent.prototype.ngOnInit = function () {
        this.selections = this.dialogData.selections;
        this.multiple = this.dialogData.multiple;
        this.title = this.dialogData.title;
        var data = this.dialogData.default;
        if (this.multiple) {
            for (var _i = 0, _a = this.selections; _i < _a.length; _i++) {
                var selection = _a[_i];
                selection.checked = false;
            }
            if (Array.isArray(data)) {
                for (var _b = 0, data_1 = data; _b < data_1.length; _b++) {
                    var d = data_1[_b];
                    for (var i = 0; i < this.selections.length; i++) {
                        if (this.selections[i].key === d) {
                            this.selections[i].checked = true;
                            break;
                        }
                    }
                }
            }
        }
        this.initFuse();
    };
    MhDynamicSelectEntryComponent.prototype.initFuse = function () {
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
    MhDynamicSelectEntryComponent.prototype.select = function (item) {
        this.dialogRef.close(item);
    };
    MhDynamicSelectEntryComponent.prototype.multChange = function (selection) {
        selection.checked = !selection.checked;
    };
    MhDynamicSelectEntryComponent.prototype.multSelect = function () {
        var arr = [];
        for (var _i = 0, _a = this.selections; _i < _a.length; _i++) {
            var selection = _a[_i];
            if (selection.checked) {
                arr.push(selection);
            }
        }
        this.dialogRef.close(arr);
    };
    MhDynamicSelectEntryComponent.prototype.clear = function () {
        if (this.multiple) {
            this.dialogRef.close([{ key: null, value: '' }]);
        }
        else {
            this.dialogRef.close({ key: null, value: '' });
        }
    };
    MhDynamicSelectEntryComponent = __decorate([
        core_1.Component({
            selector: 'mh-dynamic-select-entry',
            templateUrl: './dynamic-select-entry.component.html'
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], MhDynamicSelectEntryComponent);
    return MhDynamicSelectEntryComponent;
}());
exports.MhDynamicSelectEntryComponent = MhDynamicSelectEntryComponent;
