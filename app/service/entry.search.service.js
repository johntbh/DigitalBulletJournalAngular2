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
var EntrySearchService = (function () {
    function EntrySearchService(http) {
        this.http = http;
        this.entriesUrl = 'http://digitalbulletjournal.xyz/api/entry/search'; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    EntrySearchService.prototype.getEntries = function (parameters) {
        var url = this.entriesUrl + "/row";
        return this.http
            .post(url, JSON.stringify(parameters), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EntrySearchService.prototype.getEntriesNumber = function (parameters) {
        var url = this.entriesUrl + "/number";
        return this.http
            .post(url, JSON.stringify(parameters), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(response.json());
            return response.json()[0].value;
        })
            .catch(this.handleError);
    };
    EntrySearchService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    EntrySearchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EntrySearchService);
    return EntrySearchService;
}());
exports.EntrySearchService = EntrySearchService;
//# sourceMappingURL=entry.search.service.js.map