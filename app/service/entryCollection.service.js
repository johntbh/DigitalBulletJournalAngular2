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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var EntryCollectionService = (function () {
    function EntryCollectionService(http) {
        this.http = http;
        this.entriesUrl = 'http://digitalbulletjournal.xyz/api/entryCollection'; //Ajout Numan : URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    //Ajout Numan
    EntryCollectionService.prototype.getEntriesCollection = function () {
        return this.http.get(this.entriesUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //Ajout Numan
    EntryCollectionService.prototype.getEntriesCollection_idCollection = function (idCollection) {
        var url = this.entriesUrl + "/collection/idCollection/" + idCollection;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //Ajout Numan
    /*getEntriesCollection_Collection(nomCollection: String): Promise<EntryCollection[]> {
      const url = `${this.entriesUrl}/collection/nomCollection/${nomCollection}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json() as EntryCollection[])
          .catch(this.handleError);
    }*/
    //Ajout Numan
    EntryCollectionService.prototype.getEntriesCollection_Collection = function (collection) {
        var url = this.entriesUrl + "/collection/idCollection/" + collection.idCollection;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //Ajout Numan
    EntryCollectionService.prototype.getEntryCollection = function (idEntryCollection) {
        var url = this.entriesUrl + "/id/" + idEntryCollection;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //Ajout Numan
    EntryCollectionService.prototype.addEntryCollection = function (entryCollection) {
        return this.http
            .put(this.entriesUrl, JSON.stringify(entryCollection), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //Ajout Numan
    EntryCollectionService.prototype.deleteEntryCollection = function (entryCollection) {
        var url = this.entriesUrl + "/id/" + entryCollection.id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    //Ajout Numan
    EntryCollectionService.prototype.updateEntryCollection = function (entryCollection) {
        var url = this.entriesUrl + "/id/" + entryCollection.id;
        return this.http
            .post(url, JSON.stringify(entryCollection), { headers: this.headers })
            .toPromise()
            .then(function () { return entryCollection; })
            .catch(this.handleError);
    };
    EntryCollectionService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    EntryCollectionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EntryCollectionService);
    return EntryCollectionService;
}());
exports.EntryCollectionService = EntryCollectionService;
//# sourceMappingURL=entryCollection.service.js.map