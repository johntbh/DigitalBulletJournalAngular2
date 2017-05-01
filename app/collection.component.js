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
var entryCollection_1 = require('./entryCollection');
var collection_service_1 = require('./collection.service');
var entryCollection_service_1 = require('./entryCollection.service');
var CollectionComponent = (function () {
    function CollectionComponent(EntryCollectionService, CollectionService) {
        this.EntryCollectionService = EntryCollectionService;
        this.CollectionService = CollectionService;
        this.text_placeholder = "Texte de votre entrée";
    }
    CollectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.CollectionService.getCollections_Collection().then(function (collections) { return [_this.collections = collections,
            _this.collection = _this.collections[0],
            _this.getEntriesCollection()]; });
        /*while(typeof this.collections == 'undefined'){
          console.log("Toujours nulle");
        }*/
        this.noCollection = 0;
        this.newEntry = new entryCollection_1.EntryCollection();
    };
    CollectionComponent.prototype.getEntriesCollection = function () {
        var _this = this;
        this.EntryCollectionService.getEntriesCollection_idCollection(this.collection.idCollection).then(function (entries) { return _this.entries = entries; });
        this.EntryCollectionService.getBullets().then(function (bullets) { return _this.bullets = bullets; });
        this.EntryCollectionService.getSignifers().then(function (signifiers) { return _this.signifiers = signifiers; });
    };
    /*
        getCollections(): void{
          this.EntryService.getCollections().then(collections => this.collections = collections);
        }
    */
    /*
        changeDate(): void{
          this.EntryService.getEntries_Date_Day(this.date).then(entries => this.entries = entries);
        }
    */
    //Ajout Numan
    CollectionComponent.prototype.nextCollection = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.noCollection + 1 < this.collections.length) {
            this.collection = this.collections[this.noCollection + 1];
            this.noCollection = this.noCollection + 1;
        }
        else {
            this.collection = this.collections[0];
            this.noCollection = 0;
        }
        //this.nomCollection = this.collection.nomCollection;
        this.EntryCollectionService.getEntriesCollection_idCollection(this.collection.idCollection).then(function (entries) { return _this.entries = entries; });
    };
    //Ajout Numan
    CollectionComponent.prototype.previousCollection = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.noCollection - 1 >= 0) {
            this.collection = this.collections[this.noCollection - 1];
            this.noCollection = this.noCollection - 1;
        }
        else {
            this.collection = this.collections[this.collections.length - 1];
            this.noCollection = this.collections.length - 1;
        }
        //this.nomCollection = this.collection.nomCollection;
        this.EntryCollectionService.getEntriesCollection_idCollection(this.collection.idCollection).then(function (entries) { return _this.entries = entries; });
    };
    //Je garde le code à John mais je ne le comprend pas cette méthode donc à voir
    //addEntry(text: string) {
    CollectionComponent.prototype.addEntry = function () {
        var _this = this;
        /*this.EntryCollectionService.addEntryCollection(this.newEntry).then(fullEntry => {
            this.entries.push(fullEntry);
            this.newEntry = new EntryCollection();
        });*/
        this.newEntry.idCollection = this.collection.idCollection;
        console.log(this.newEntry.noCollection);
        this.EntryCollectionService.addEntryCollection(this.newEntry).then(function (fullEntry) {
            _this.entries.push(fullEntry);
            _this.newEntry = new entryCollection_1.EntryCollection();
        });
        ;
    };
    //A voir aussi
    CollectionComponent.prototype.updateEntry = function (entry) {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            console.log(entry.text);
            _this.EntryCollectionService.updateEntryCollection(entry);
        }, 500);
        console.log(this.bullets);
    };
    //A voir aussi
    CollectionComponent.prototype.removeEntry = function (entry) {
        var _this = this;
        this.EntryCollectionService.deleteEntryCollection(entry).then(function () {
            var index = _this.entries.indexOf(entry);
            _this.entries.splice(index, 1);
        });
    };
    CollectionComponent = __decorate([
        core_1.Component({
            selector: 'my-collection',
            templateUrl: 'collection.component.html',
            styleUrls: ['collection.component.css'],
            moduleId: module.id,
            providers: [entryCollection_service_1.EntryCollectionService, collection_service_1.CollectionService]
        }), 
        __metadata('design:paramtypes', [entryCollection_service_1.EntryCollectionService, collection_service_1.CollectionService])
    ], CollectionComponent);
    return CollectionComponent;
}());
exports.CollectionComponent = CollectionComponent;
//# sourceMappingURL=collection.component.js.map