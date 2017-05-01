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
var EntryMonthlyLogService = (function () {
    function EntryMonthlyLogService(http) {
        this.http = http;
        this.entriesUrl = 'http://digitalbulletjournal.xyz/api/entry/monthly';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    EntryMonthlyLogService.prototype.getDailyEntries = function (date) {
        var dateString = date.toISOString().substr(0, 7);
        var url = this.entriesUrl + "/daily/" + dateString;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EntryMonthlyLogService.prototype.getMonthlyEntries = function (date) {
        var dateString = date.toISOString().substr(0, 7);
        var url = this.entriesUrl + "/monthly/" + dateString;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EntryMonthlyLogService.prototype.addDailyEntry = function (entry) {
        var url = this.entriesUrl + "/daily";
        return this.http
            .put(url, JSON.stringify(entry), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EntryMonthlyLogService.prototype.addMonthlyEntry = function (entry) {
        var url = this.entriesUrl + "/monthly";
        return this.http
            .put(url, JSON.stringify(entry), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EntryMonthlyLogService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    EntryMonthlyLogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EntryMonthlyLogService);
    return EntryMonthlyLogService;
}());
exports.EntryMonthlyLogService = EntryMonthlyLogService;
//# sourceMappingURL=entry.monthlylog.service.js.map