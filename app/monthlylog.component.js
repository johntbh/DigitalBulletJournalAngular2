"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var entry_1 = require('./entry');
var entry_service_1 = require('./entry.service');
var MonthlyLogComponent = (function () {
    function MonthlyLogComponent(EntryService) {
        this.EntryService = EntryService;
        this.text_placeholder = "Texte de votre entrée";
    }
    MonthlyLogComponent.prototype.ngOnInit = function () {
        this.month = (new Date()).toISOString().substr(0, 7);
        this.newEntryMonthly = new entry_1.Entry();
        this.getEntries();
    };
    MonthlyLogComponent.prototype.getEntries = function () {
        var _this = this;
        this.EntryService.getBullets().then(function (bullets) { return _this.bullets = bullets; });
        this.EntryService.getSignifers().then(function (signifiers) { return _this.signifiers = signifiers; });
        this.changeDate();
    };
    MonthlyLogComponent.prototype.changeDate = function () {
        var _this = this;
        this.EntryService.getEntries_Date_Month(this.month)
            .then(function (entries_day) {
            _this.entries_day = [];
            var date = new Date(_this.month.toString());
            date.setMonth(date.getMonth() + 1);
            date.setDate(0);
            var max = date.getDate();
            for (var i = 0; i < max; i++) {
                var date_entry = new entry_1.Entry();
                date_entry.date.setMonth(date.getMonth());
                date_entry.date.setDate(i + 1);
                _this.entries_day[i] = date_entry;
            }
            for (var _i = 0, entries_day_1 = entries_day; _i < entries_day_1.length; _i++) {
                var entry = entries_day_1[_i];
                var day = (new Date(entry.date)).getDate();
                _this.entries_day[day - 1] = entry;
            }
        });
        this.EntryService.getEntries_Monthly(this.month).then(function (entries_month) { return _this.entries_month = entries_month; });
    };
    MonthlyLogComponent.prototype.nextMonth = function (event) {
        event.preventDefault();
        var dateObj = new Date(this.month.toString());
        dateObj.setMonth(dateObj.getMonth() + 1);
        this.month = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2);
        this.changeDate();
    };
    MonthlyLogComponent.prototype.previousMonth = function (event) {
        event.preventDefault();
        var dateObj = new Date(this.month.toString());
        dateObj.setMonth(dateObj.getMonth() - 1);
        this.month = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2);
        this.changeDate();
    };
    MonthlyLogComponent.prototype.addMonthEntry = function (entry) {
        var _this = this;
        entry.monthly = true;
        this.EntryService.addEntry(entry).then(function (fullEntry) {
            var index = _this.entries_day.indexOf(entry);
            _this.entries_day[index] = fullEntry;
        });
    };
    MonthlyLogComponent.prototype.addMonthlyEntry = function () {
        var _this = this;
        this.newEntryMonthly.monthly = true;
        this.newEntryMonthly.futur = true;
        this.EntryService.addEntry(this.newEntryMonthly).then(function (fullEntry) {
            _this.entries_month.push(fullEntry);
            _this.newEntryMonthly = new entry_1.Entry();
        });
    };
    MonthlyLogComponent.prototype.updateEntry = function (entry) {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () { return _this.EntryService.updateEntry(entry); }, 500);
    };
    MonthlyLogComponent.prototype.removeEntry = function (entry) {
        var _this = this;
        this.EntryService.deleteEntry(entry).then(function () {
            var index = _this.entries_month.indexOf(entry);
            _this.entries_month.splice(index, 1);
        });
    };
    MonthlyLogComponent = __decorate([
        core_1.Component({
            selector: 'my-monthlylog',
            templateUrl: 'monthlylog.component.html',
            styleUrls: ['monthlylog.component.css'],
            moduleId: module.id,
            providers: [entry_service_1.EntryService]
        }), 
        __metadata('design:paramtypes', [entry_service_1.EntryService])
    ], MonthlyLogComponent);
    return MonthlyLogComponent;
}());
exports.MonthlyLogComponent = MonthlyLogComponent;
//# sourceMappingURL=monthlylog.component.js.map