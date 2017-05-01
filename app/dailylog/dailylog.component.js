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
var entry_1 = require('../modele/entry');
var entry_dailylog_service_1 = require('../service/entry.dailylog.service');
var entry_service_1 = require('../service/entry.service');
var entry_supplement_service_1 = require('../service/entry.supplement.service');
var DailyLogComponent = (function () {
    function DailyLogComponent(EntryDailyLogService, EntryService, EntrySupplementService) {
        this.EntryDailyLogService = EntryDailyLogService;
        this.EntryService = EntryService;
        this.EntrySupplementService = EntrySupplementService;
        this.text_placeholder = "Texte de votre entrée";
    }
    DailyLogComponent.prototype.ngOnInit = function () {
        this.date = (new Date()).toISOString().substr(0, 10);
        this.newEntry = new entry_1.Entry();
        this.getEntriesSupplement();
        this.getEntries();
    };
    DailyLogComponent.prototype.getEntries = function () {
        var _this = this;
        this.EntryDailyLogService.getEntries(new Date(this.date.toString())).then(function (entries) { return _this.entries = entries; });
    };
    DailyLogComponent.prototype.getEntriesSupplement = function () {
        var _this = this;
        this.EntrySupplementService.getBullets().then(function (bullets) { return _this.bullets = bullets; });
        this.EntrySupplementService.getSignifers().then(function (signifiers) { return _this.signifiers = signifiers; });
    };
    DailyLogComponent.prototype.changeDate = function () {
        var _this = this;
        this.EntryDailyLogService.getEntries(new Date(this.date.toString())).then(function (entries) { return _this.entries = entries; });
    };
    DailyLogComponent.prototype.tomorrowLog = function () {
        event.preventDefault();
        this.changeLog(1);
        this.changeDate();
    };
    DailyLogComponent.prototype.yesterdayLog = function () {
        event.preventDefault();
        this.changeLog(-1);
        this.changeDate();
    };
    DailyLogComponent.prototype.changeLog = function (value) {
        var dateObj = new Date(this.date.toString());
        dateObj.setDate(dateObj.getDate() + value);
        this.date = dateObj.toISOString().substr(0, 10);
    };
    DailyLogComponent.prototype.addEntry = function () {
        var _this = this;
        this.EntryDailyLogService.addEntry(this.newEntry).then(function (fullEntry) {
            _this.entries.push(fullEntry);
            _this.newEntry = new entry_1.Entry();
        });
    };
    DailyLogComponent.prototype.updateEntry = function (entry) {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () { return _this.EntryService.updateEntry(entry); }, 500);
        console.log(this.bullets);
    };
    DailyLogComponent.prototype.removeEntry = function (entry) {
        var _this = this;
        this.EntryService.deleteEntry(entry).then(function () {
            var index = _this.entries.indexOf(entry);
            _this.entries.splice(index, 1);
        });
    };
    DailyLogComponent = __decorate([
        core_1.Component({
            selector: 'my-dailylog',
            templateUrl: 'dailylog.component.html',
            styleUrls: ['dailylog.component.css'],
            moduleId: module.id,
            providers: [entry_dailylog_service_1.EntryDailyLogService, entry_service_1.EntryService, entry_supplement_service_1.EntrySupplementService]
        }), 
        __metadata('design:paramtypes', [entry_dailylog_service_1.EntryDailyLogService, entry_service_1.EntryService, entry_supplement_service_1.EntrySupplementService])
    ], DailyLogComponent);
    return DailyLogComponent;
}());
exports.DailyLogComponent = DailyLogComponent;
//# sourceMappingURL=dailylog.component.js.map