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
var FuturLogComponent = (function () {
    function FuturLogComponent(EntryService) {
        this.EntryService = EntryService;
        this.futur_month_number = 6;
        this.month_side_number = 3;
        this.month_name = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        this.month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.text_placeholder = "Texte de votre entrée";
        this.num_left = [0, 1, 2];
        this.num_right = [3, 4, 5];
    }
    FuturLogComponent.prototype.ngOnInit = function () {
        this.month_date = new Date();
        this.month = this.month_date.toISOString().substr(0, 7);
        this.getEntries();
    };
    FuturLogComponent.prototype.getEntries = function () {
        var _this = this;
        this.EntryService.getBullets().then(function (bullets) { return _this.bullets = bullets; });
        this.EntryService.getSignifers().then(function (signifiers) { return _this.signifiers = signifiers; });
        this.changeDate();
    };
    FuturLogComponent.prototype.changeDate = function () {
        var _this = this;
        this.EntryService.getEntries_Futur(this.month)
            .then(function (entries_futur) {
            _this.entries_futur = [];
            _this.entry_futur = [];
            for (var i = 0; i < _this.futur_month_number; i++) {
                _this.entries_futur.push([]);
                _this.entry_futur.push(_this.getNewEntryWithDateInMonth(i));
                console.log(_this.entry_futur);
            }
            var month_year = _this.getMonthYearFromDate(_this.month_date);
            for (var _i = 0, entries_futur_1 = entries_futur; _i < entries_futur_1.length; _i++) {
                var entry = entries_futur_1[_i];
                var month_year_entry = _this.getMonthYearFromDate(entry.date);
                var index = month_year_entry - month_year;
                _this.entries_futur[index].push(entry);
            }
            console.log(_this.entries_futur);
        });
    };
    FuturLogComponent.prototype.nextFutur = function (event) {
        event.preventDefault();
        this.month_date.setMonth(this.month_date.getMonth() + 6);
        this.month = this.month_date.toISOString().substr(0, 7);
        this.changeDate();
    };
    FuturLogComponent.prototype.previousFutur = function (event) {
        event.preventDefault();
        this.month_date.setMonth(this.month_date.getMonth() - 6);
        this.month = this.month_date.toISOString().substr(0, 7);
        this.changeDate();
    };
    FuturLogComponent.prototype.addFuturEntry = function (index) {
        var _this = this;
        this.entry_futur[index].date.setDate(this.entry_futur[index].day.valueOf());
        this.entry_futur[index].futur = true;
        this.EntryService.addEntry(this.entry_futur[index]).then(function (fullEntry) {
            _this.entries_futur[index].push(fullEntry);
            _this.entry_futur[index] = _this.getNewEntryWithDateInMonth(index);
        });
    };
    FuturLogComponent.prototype.updateEntry = function (entry) {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () { return _this.EntryService.updateEntry(entry); }, 500);
    };
    FuturLogComponent.prototype.removeEntry = function (entry, index) {
        var _this = this;
        this.EntryService.deleteEntry(entry).then(function () {
            var index_array = _this.entries_futur[index].indexOf(entry);
            _this.entries_futur[index].splice(index, 1);
        });
    };
    FuturLogComponent.prototype.getArrayMonthNumber = function (order) {
        var startArray = order * this.month_side_number.valueOf();
        var array = [];
        for (var i = 0; i < this.month_side_number; i++) {
            array.push(startArray + i);
        }
        return array;
    };
    FuturLogComponent.prototype.getNewEntryWithDateInMonth = function (plus_month) {
        var newEntry = new entry_1.Entry();
        var date_entry = new Date(this.month_date);
        console.log(plus_month);
        console.log(date_entry);
        date_entry.setMonth(date_entry.getMonth() + plus_month);
        console.log(date_entry);
        newEntry.date = date_entry;
        return newEntry;
    };
    FuturLogComponent.prototype.getMonthYearFromDate = function (date_input) {
        var date = new Date(date_input);
        return (date.getMonth() + 1) + date.getFullYear();
    };
    FuturLogComponent.prototype.getDayInMonth = function (month) {
        var days = [];
        for (var i = 0; i < this.month_days[month]; i++) {
            days.push(i + 1);
        }
        return days;
    };
    ////// Cosmetic function
    FuturLogComponent.prototype.getStartMonthYear = function () {
        var date_string = this.month_name[this.month_date.getMonth()];
        date_string += ' ' + this.month_date.getFullYear();
        return date_string;
    };
    FuturLogComponent.prototype.getEndMonthYear = function () {
        var date = new Date(this.month_date);
        date.setMonth(date.getMonth() + 6);
        var date_string = this.month_name[date.getMonth()];
        date_string += ' ' + date.getFullYear();
        return date_string;
    };
    FuturLogComponent.prototype.getMonthYear = function (month) {
        var date = new Date(this.month_date);
        date.setMonth(date.getMonth() + month);
        var date_string = this.month_name[date.getMonth()];
        date_string += ' ' + date.getFullYear();
        return date_string;
    };
    FuturLogComponent = __decorate([
        core_1.Component({
            selector: 'my-futurlog',
            templateUrl: 'futurlog.component.html',
            styleUrls: ['futurlog.component.css'],
            moduleId: module.id,
            providers: [entry_service_1.EntryService]
        }), 
        __metadata('design:paramtypes', [entry_service_1.EntryService])
    ], FuturLogComponent);
    return FuturLogComponent;
}());
exports.FuturLogComponent = FuturLogComponent;
//# sourceMappingURL=futurlog.component.js.map