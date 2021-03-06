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
var DatesService = (function () {
    function DatesService(http) {
        this.http = http;
        this._apiUrl = 'index.php/api';
    }
    DatesService.prototype.get = function (date) {
        return this.http
            .get(this._apiUrl + ("/editdate/" + date))
            .toPromise()
            .then(function (x) { return x['_body']; });
    };
    DatesService.prototype.build = function (date) {
        return this.http
            .post(this._apiUrl + '/build/', date)
            .toPromise()
            .then(this.extractData);
    };
    DatesService.prototype.delete = function (date) {
        return this.http
            .post(this._apiUrl + '/deletedate', date)
            .toPromise()
            .then(function () { return date; })
            .catch(function (x) { return alert(x.json().error); });
    };
    DatesService.prototype.extractData = function (res) {
        var body = res['_body'];
        return body || {};
    };
    DatesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DatesService);
    return DatesService;
}());
exports.DatesService = DatesService;
//# sourceMappingURL=dates.service.js.map