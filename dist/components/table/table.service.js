"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var table_entry_component_1 = require("./table-entry.component");
var TableService = /** @class */ (function () {
    function TableService(dialog) {
        this.dialog = dialog;
    }
    TableService.prototype.openTable = function (opt) {
        return this.dialog.open(table_entry_component_1.TableEntryComponent, {
            width: opt.width || '70%',
            data: {
                label: opt.label || '表格',
                data: opt.data || [],
                columns: opt.columns || null,
                select: opt.select || false,
                multiple: opt.multiple || false,
            }
        }).afterClosed().filter(function (_) { return _; });
    };
    TableService = __decorate([
        core_1.Injectable()
    ], TableService);
    return TableService;
}());
exports.TableService = TableService;
