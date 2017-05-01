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
var searchparameters_1 = require('./searchparameters');
var entry_service_1 = require('./entry.service');
var searchentry_service_1 = require('./searchentry.service');
var SearchEntryComponent = (function () {
    function SearchEntryComponent(EntryService, SearchEntryService) {
        this.EntryService = EntryService;
        this.SearchEntryService = SearchEntryService;
    }
    SearchEntryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.EntryService.getBullets().then(function (bullets) { return _this.bullets = bullets; });
        this.EntryService.getSignifers().then(function (signifiers) { return _this.signifiers = signifiers; });
        this.EntryService.getTypes().then(function (types) { return _this.types = types; });
        this.search = new searchparameters_1.SearchParameters();
    };
    SearchEntryComponent.prototype.getSearchEntries = function () {
        var _this = this;
        if (!this.search.isEmpty()) {
            this.SearchEntryService.getSearchEntriesNumber(this.search).then(function (entriesNumber) { return _this.search.maxRows = entriesNumber; });
            this.SearchEntryService.getSearchEntries(this.search).then(function (entries) { return _this.entries = entries; });
        }
        else {
            this.entries = [];
            this.search.maxRows = 1;
        }
    };
    SearchEntryComponent.prototype.updateSearchEntryText = function () {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () { return _this.getSearchEntries(); }, 500);
    };
    SearchEntryComponent.prototype.updateSearchEntryDate = function () {
        if (this.dateStartString && this.dateEndString) {
            var dateStart = new Date(this.dateStartString.toString());
            var dateEnd = new Date(this.dateEndString.toString());
            if (dateStart > dateEnd)
                alert('Erreur: Date de début supérieure à date de fin.'); // TODO: Find a better way to show error
            else {
                this.search.dateStart = dateStart;
                this.search.dateEnd = dateEnd;
                this.getSearchEntries();
            }
        }
    };
    SearchEntryComponent.prototype.updateEntry = function (entry) {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () { return _this.EntryService.updateEntry(entry); }, 500);
    };
    SearchEntryComponent.prototype.removeEntry = function (entry) {
        var _this = this;
        this.EntryService.deleteEntry(entry).then(function () {
            var index = _this.entries.indexOf(entry);
            _this.entries.splice(index, 1);
        });
    };
    /////test
    SearchEntryComponent.prototype.addRemoveSignifierParameter = function (event, signifier, input) {
        event.stopPropagation();
        event.target.blur();
        var index = this.search.signifiers.indexOf(signifier.id);
        if (index > -1) {
            signifier.selected = false;
            this.search.signifiers.splice(index, 1);
        }
        else {
            signifier.selected = true;
            this.search.signifiers.push(signifier.id);
        }
        this.getSearchEntries();
        return input;
    };
    SearchEntryComponent.prototype.addRemoveBulletParameter = function (event, bullet, input) {
        event.stopPropagation();
        event.target.blur();
        var index = this.search.bullets.indexOf(bullet.id);
        if (index > -1) {
            bullet.selected = false;
            this.search.bullets.splice(index, 1);
        }
        else {
            bullet.selected = true;
            this.search.bullets.push(bullet.id);
        }
        this.getSearchEntries();
        return input;
    };
    SearchEntryComponent.prototype.addRemoveTypeParameter = function (event, type, input) {
        event.stopPropagation();
        event.target.blur();
        var index = this.search.types.indexOf(type.id);
        if (index > -1) {
            type.selected = false;
            this.search.types.splice(index, 1);
        }
        else {
            type.selected = true;
            this.search.types.push(type.id);
        }
        this.getSearchEntries();
        return input;
    };
    SearchEntryComponent.prototype.changeRow = function (event, row) {
        event.preventDefault();
        this.search.rowsOnPage = row;
        this.search.refreshPage();
        this.getSearchEntries();
    };
    SearchEntryComponent.prototype.previousPage = function () {
        event.preventDefault();
        if (this.search.getPage() !== 1)
            this.search.page--;
        this.getSearchEntries();
    };
    SearchEntryComponent.prototype.nextPage = function () {
        event.preventDefault();
        if (this.search.getPage() !== this.search.getMaxPage())
            this.search.page++;
        console.log(this.search.maxRows);
        console.log(this.search.getMaxPage());
        this.getSearchEntries();
    };
    SearchEntryComponent.prototype.setPage = function (page) {
        event.preventDefault();
        this.search.page = page;
        this.getSearchEntries();
    };
    SearchEntryComponent.prototype.doNothing = function () {
        event.preventDefault();
    };
    SearchEntryComponent = __decorate([
        core_1.Component({
            selector: 'my-searchentry',
            templateUrl: 'searchentry.component.html',
            styleUrls: ['searchentry.component.css'],
            moduleId: module.id,
            providers: [entry_service_1.EntryService, searchentry_service_1.SearchEntryService]
        }), 
        __metadata('design:paramtypes', [entry_service_1.EntryService, searchentry_service_1.SearchEntryService])
    ], SearchEntryComponent);
    return SearchEntryComponent;
}());
exports.SearchEntryComponent = SearchEntryComponent;
//# sourceMappingURL=searchentry.component.js.map