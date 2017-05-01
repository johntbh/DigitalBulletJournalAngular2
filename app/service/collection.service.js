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
var CollectionService = (function () {
    function CollectionService(http) {
        this.http = http;
        this.collectionsUrl = 'http://digitalbulletjournal.xyz/api/collection'; //Ajout Numan : URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    //Ajout Numan
    CollectionService.prototype.getCollections_Collection = function () {
        return this.http.get(this.collectionsUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //Ajout Numan
    CollectionService.prototype.getCollection_Collection = function (idCollection) {
        var url = this.collectionsUrl + "/idCollection/" + idCollection;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //Modif Numan
    CollectionService.prototype.addCollection = function (collection) {
        return this.http
            .put(this.collectionsUrl, JSON.stringify(collection), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //Modif Numan
    CollectionService.prototype.deleteCollection = function (collection) {
        var url = this.collectionsUrl + "/idCollection/" + collection.idCollection;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    //Modif Numan
    CollectionService.prototype.updateCollection = function (collection) {
        return this.http
            .post(this.collectionsUrl, JSON.stringify(collection), { headers: this.headers })
            .toPromise()
            .then(function () { return collection; })
            .catch(this.handleError);
    };
    CollectionService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    CollectionService = __decorate([
        //Ajout Numan
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CollectionService);
    return CollectionService;
}());
exports.CollectionService = CollectionService;
//# sourceMappingURL=collection.service.js.map