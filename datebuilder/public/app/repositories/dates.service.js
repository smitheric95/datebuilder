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
        this._apiUrl = 'users';
    }
    /*

    AWAITING DATE ROUTE

    */
    DatesService.prototype.get = function (date) {
        return '{ "businesses": [ "sewell-cadillac-of-dallas-dallas", "any-lab-test-now-dallas-dallas", "park-lane-allergy-and-asthma-center-dallas" ], "distances": [ 2.5, 3.4 ], "total_cost": 85.00, "name": "My Awesome Date", "total_time": 60, "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/_D1VLvf3VdvDJWddTIShFA/ms.jpg", "categories": [ ["category1", 12], ["category2", 8], ["category3", 4] ] }';
    };
    DatesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DatesService);
    return DatesService;
}());
exports.DatesService = DatesService;
//# sourceMappingURL=dates.service.js.map