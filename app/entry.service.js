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
var EntryService = (function () {
    function EntryService(http) {
        this.http = http;
        this.entriesUrl = 'http://digitalbulletjournal.xyz/api/entry'; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    EntryService.prototype.getEntries = function () {
        return this.http.get(this.entriesUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EntryService.prototype.getEntries_Date = function (date) {
        var url = this.entriesUrl + "/date/" + date;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EntryService.prototype.getBullets = function () {
        var url = this.entriesUrl + "/bullet";
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EntryService.prototype.getSignifers = function () {
        var url = this.entriesUrl + "/signifier";
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EntryService.prototype.getEntry = function (id) {
        var url = this.entriesUrl + "/id/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EntryService.prototype.addEntry = function (entry) {
        return this.http
            .put(this.entriesUrl, JSON.stringify(entry), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EntryService.prototype.deleteEntry = function (entry) {
        var url = this.entriesUrl + "/id/" + entry.id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    EntryService.prototype.updateEntry = function (entry) {
        var url = this.entriesUrl + "/id/" + entry.id;
        return this.http
            .post(url, JSON.stringify(entry), { headers: this.headers })
            .toPromise()
            .then(function () { return entry; })
            .catch(this.handleError);
    };
    EntryService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    EntryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EntryService);
    return EntryService;
}());
exports.EntryService = EntryService;
//# sourceMappingURL=entry.service.js.map