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
var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
        this._apiUrl = 'index.php/api/users';
    }
    UsersService.prototype.add = function (user) {
        return this.http
            .post(this._apiUrl, user)
            .toPromise()
            .then(function () { return user; })
            .catch(function (x) { return alert(x.json().error); });
    };
    UsersService.prototype.logIn = function (user) {
        return this.http
            .post(this._apiUrl + '/login', user)
            .toPromise()
            .then(this.extractData);
    };
    UsersService.prototype.get = function () {
        return this.http
            .get("index.php/api/getuser/")
            .toPromise()
            .then(function (x) { return x['_body']; });
    };
    UsersService.prototype.update = function (user) {
        return this.http
            .post(this._apiUrl + '/updatesettings', user)
            .toPromise()
            .then(function () { return user; })
            .catch(function (x) { return alert(x.json().error); });
    };
    UsersService.prototype.logout = function () {
        return this.http
            .post(this._apiUrl + '/logout', "logging out")
            .toPromise()
            .catch(function (x) { return alert(x.json().error); });
    };
    UsersService.prototype.extractData = function (res) {
        var body = res['_body'];
        return body || {};
    };
    UsersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map