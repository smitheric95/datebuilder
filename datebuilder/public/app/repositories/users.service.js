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
        this._apiUrl = 'users';
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
            .then(function () { return user; })
            .catch(function (x) { return alert(x.json().error); });
    };
    /*

    AWAITING USER ROUTE

    */
    UsersService.prototype.get = function (user) {
        return '{ "user": { "name": "John", "email": "john@smith.com" "age": 22 "allow_loc_services": 1 }, "dates": [ { "businesses": [ "b_id1", "b_id2", "b_id3" ], "distances": [ 2.5, 3.4 ], "total_cost": 85.00, "name": "My Awesome Date", "total_time": 60, "image_url": "http://images.amcnetworks.com/ifc.com/wp-content/uploads/2014/02/nerd-dance.jpg", "categories": [ ["category1", 12], ["category2", 8], ["category3", 4] ] }, { "businesses": [ "b_id4", "b_id5", ], "distances": [ 5.5, ], "total_cost": 15.00, "name": "My Other Awesome Date", "total_time": 35, "image_url": "http://images.amcnetworks.com/ifc.com/wp-content/uploads/2014/02/nerd-dance.jpg", "categories": [ ["category4", 3], ["category5", 1] ] } ], "stats": { "categories": [ ["category1", 12], ["category2", 8], ["category3", 4], ["category4", 3], ["category5", 1] ], "total_time": 95, "average_time": 47.5, "average_cost": 50.00 } }';
    };
    UsersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map