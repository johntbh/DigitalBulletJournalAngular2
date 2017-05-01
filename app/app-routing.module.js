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
var router_1 = require('@angular/router');
var dailylog_component_1 = require('./dailylog/dailylog.component');
var monthlylog_component_1 = require('./monthlylog/monthlylog.component');
var futurlog_component_1 = require('./futurlog/futurlog.component');
var searchentry_component_1 = require('./searchentry/searchentry.component');
var collection_component_1 = require('./collection/collection.component');
var routes = [
    { path: 'dailylog', component: dailylog_component_1.DailyLogComponent },
    { path: 'monthlylog', component: monthlylog_component_1.MonthlyLogComponent },
    { path: 'futurlog', component: futurlog_component_1.FuturLogComponent },
    { path: 'searchentry', component: searchentry_component_1.SearchEntryComponent },
    { path: 'collection', component: collection_component_1.CollectionComponent },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map