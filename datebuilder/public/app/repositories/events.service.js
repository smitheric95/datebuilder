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
var EventsService = (function () {
    /*
           TO DO:
       
           Pulling "event" metadate in search results will require a seperate
               API call
           /search/:id=event-id will return all the data about an event
       */
    function EventsService(http) {
        this.http = http;
        this._apiUrl = 'search';
    }
    EventsService.prototype.listEvents = function () {
        console.log(this._apiUrl + '/load');
        return this.http.get(this._apiUrl + '/load')
            .toPromise()
            .then(function (x) { return x.json().data; });
    };
    EventsService.prototype.getEvent = function (id) {
        var pluck = function (x) { return (x && x.length) ? x[0] : undefined; };
        return this.http
            .get(this._apiUrl + "/business/?id=" + id)
            .toPromise()
            .then(function (x) { return pluck(x.json().data); })
            .catch(function (x) { return alert(x.json().error); });
    };
    EventsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EventsService);
    return EventsService;
}());
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map