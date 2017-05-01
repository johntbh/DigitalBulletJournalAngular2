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
var searchparameters_1 = require('../modele//searchparameters');
var entry_search_service_1 = require('../service/entry.search.service');
var entry_service_1 = require('../service/entry.service');
var entry_supplement_service_1 = require('../service/entry.supplement.service');
var SearchEntryComponent = (function () {
    function SearchEntryComponent(EntrySearchService, EntryService, EntrySupplementService) {
        this.EntrySearchService = EntrySearchService;
        this.EntryService = EntryService;
        this.EntrySupplementService = EntrySupplementService;
    }
    SearchEntryComponent.prototype.ngOnInit = function () {
        this.search = new searchparameters_1.SearchParameters();
        this.getEntriesSupplement();
    };
    SearchEntryComponent.prototype.getEntriesSupplement = function () {
        var _this = this;
        this.EntrySupplementService.getTypes().then(function (types) { return _this.types = types; });
        this.EntrySupplementService.getBullets().then(function (bullets) { return _this.bullets = bullets; });
        this.EntrySupplementService.getSignifers().then(function (signifiers) { return _this.signifiers = signifiers; });
    };
    SearchEntryComponent.prototype.getSearchEntries = function () {
        var _this = this;
        if (!this.search.isEmpty()) {
            this.EntrySearchService.getEntriesNumber(this.search).then(function (entriesNumber) { return _this.search.maxRows = entriesNumber; });
            this.EntrySearchService.getEntries(this.search).then(function (entries) { return _this.entries = entries; });
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
        if (this.search.getPage() !== 1) {
            this.search.page--;
            this.getSearchEntries();
        }
    };
    SearchEntryComponent.prototype.nextPage = function () {
        event.preventDefault();
        if (this.search.getPage() !== this.search.getMaxPage()) {
            this.search.page++;
            this.getSearchEntries();
        }
    };
    SearchEntryComponent.prototype.setPage = function (page) {
        event.preventDefault();
        if (this.search.getPage() !== page) {
            this.search.page = page;
            this.getSearchEntries();
        }
    };
    SearchEntryComponent.prototype.doNothing = function () {
        event.preventDefault();
    };
    SearchEntryComponent.prototype.getType = function (entry) {
        var nom = '';
        for (var _i = 0, _a = this.types; _i < _a.length; _i++) {
            var type = _a[_i];
            if (type.id == entry.type)
                nom = type.nom.toString();
        }
        return nom;
    };
    SearchEntryComponent.prototype.getDatePattern = function (entry) {
        if (entry.type === 6)
            return 'MM/y';
        return 'dd/MM/y';
    };
    SearchEntryComponent = __decorate([
        core_1.Component({
            selector: 'my-searchentry',
            templateUrl: 'searchentry.component.html',
            styleUrls: ['searchentry.component.css'],
            moduleId: module.id,
            providers: [entry_search_service_1.EntrySearchService, entry_service_1.EntryService, entry_supplement_service_1.EntrySupplementService]
        }), 
        __metadata('design:paramtypes', [entry_search_service_1.EntrySearchService, entry_service_1.EntryService, entry_supplement_service_1.EntrySupplementService])
    ], SearchEntryComponent);
    return SearchEntryComponent;
}());
exports.SearchEntryComponent = SearchEntryComponent;
//# sourceMappingURL=searchentry.component.js.map