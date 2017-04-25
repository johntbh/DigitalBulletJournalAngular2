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
        this.newEntryMonth = new entry_1.Entry();
        this.getEntries();
    };
    MonthlyLogComponent.prototype.getEntries = function () {
        var _this = this;
        this.EntryService.getEntries_Date(this.date).then(function (entries) { return _this.entries = entries; });
        this.EntryService.getBullets().then(function (bullets) { return _this.bullets = bullets; });
        this.EntryService.getSignifers().then(function (signifiers) { return _this.signifiers = signifiers; });
    };
    MonthlyLogComponent.prototype.changeDate = function () {
        var _this = this;
        this.EntryService.getEntries_Date(this.date).then(function (entries) { return _this.entries = entries; });
    };
    MonthlyLogComponent.prototype.tomorrowLog = function (event) {
        var _this = this;
        event.preventDefault();
        var dateObj = new Date(this.date.toString());
        dateObj.setDate(dateObj.getDate() + 1);
        this.date = dateObj.toISOString().substr(0, 10);
        this.EntryService.getEntries_Date(this.date).then(function (entries) { return _this.entries = entries; });
    };
    MonthlyLogComponent.prototype.yesterdayLog = function (event) {
        var _this = this;
        event.preventDefault();
        var dateObj = new Date(this.date.toString());
        dateObj.setDate(dateObj.getDate() - 1);
        this.date = dateObj.toISOString().substr(0, 10);
        this.EntryService.getEntries_Date(this.date).then(function (entries) { return _this.entries = entries; });
    };
    MonthlyLogComponent.prototype.addEntry = function (text) {
        var _this = this;
        this.EntryService.addEntry(this.newEntry).then(function (fullEntry) {
            _this.entries.push(fullEntry);
            _this.newEntry = new entry_1.Entry();
        });
    };
    MonthlyLogComponent.prototype.updateEntry = function (entry) {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            console.log(entry.text);
            _this.EntryService.updateEntry(entry);
        }, 500);
        console.log(this.bullets);
    };
    MonthlyLogComponent.prototype.removeEntry = function (entry) {
        var _this = this;
        this.EntryService.deleteEntry(entry).then(function () {
            var index = _this.entries.indexOf(entry);
            _this.entries.splice(index, 1);
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