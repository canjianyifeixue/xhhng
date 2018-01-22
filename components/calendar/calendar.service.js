"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var week_entry_component_1 = require("./week-entry.component");
var MhCalendarService = /** @class */ (function () {
    function MhCalendarService(dialog) {
        this.dialog = dialog;
    }
    MhCalendarService.prototype.openWeekView = function (opt) {
        return this.dialog.open(week_entry_component_1.WeekEntryComponent, {
            width: '80%',
            data: {
                title: opt.title || '场地选择',
                ddCampus: opt.ddCampus
            }
        }).afterClosed().filter(function (_) { return _; });
    };
    MhCalendarService = __decorate([
        core_1.Injectable()
    ], MhCalendarService);
    return MhCalendarService;
}());
exports.MhCalendarService = MhCalendarService;
