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
var dates_service_1 = require('./../repositories/dates.service');
var events_service_1 = require('./../repositories/events.service');
var DateComponent = (function () {
    function DateComponent(route, router, datesService, eventsService) {
        this.route = route;
        this.router = router;
        this.datesService = datesService;
        this.eventsService = eventsService;
    }
    DateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.date = {};
        this.deleteDate = {};
        this.date.image_url = "";
        this.businessNames = [];
        this.businessUrls = [];
        this.distances = [];
        this.addresses = [];
        this.googleLinks = [];
        this.route.params.forEach(function (params) {
            //router: date/:id=date-id
            if (params['id'] !== undefined) {
                _this.datesService.get(params['id']).then(function (x) {
                    if (x !== "Date ID provided not accessible or does not exist for this user.") {
                        _this.date = JSON.parse(x);
                        for (var i = 0; i < _this.date.businesses.length; i++) {
                            var curBusUrl = _this.date.businesses[i];
                            if (i < _this.date.businesses.length - 1) {
                                _this.distances.push(_this.date.distances[i].toFixed(2));
                            }
                            _this.eventsService.getEvent(curBusUrl).then(function (x) {
                                var curBus = JSON.parse(x);
                                _this.addresses.push(curBus.location[0]);
                                _this.googleLinks.push(("http://maps.google.com/?q=" + curBus.location[0] + curBus.location[1]));
                                _this.businessNames.push(curBus.name);
                                _this.businessUrls.push("/search/" + curBusUrl);
                            });
                        }
                        _this.distances.unshift(-1);
                    }
                    else {
                        _this.dateNotFound = true;
                    }
                    _this.dateLoaded = true;
                });
            }
        });
    };
    DateComponent.prototype.openModal = function () {
        eval("$(function(){$('#dateModal').modal('show')})");
    };
    DateComponent.prototype.delete = function () {
        var _this = this;
        eval("$(function(){$('#dateModal').modal('hide')})");
        this.route.params.forEach(function (params) {
            _this.deleteDate.date_id = params['id'];
            _this.datesService.delete(_this.deleteDate).then(function (x) {
                //window.location.reload();
                _this.router.navigateByUrl('account');
            });
        });
    };
    DateComponent = __decorate([
        core_1.Component({
            selector: 'date',
            templateUrl: './app/date/date.html',
            styleUrls: [
                './app/date/date.css',
                './node_modules/bootstrap/dist/css/bootstrap.min.css',
                './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
            ]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, dates_service_1.DatesService, events_service_1.EventsService])
    ], DateComponent);
    return DateComponent;
}());
exports.DateComponent = DateComponent;
//# sourceMappingURL=date.component.js.map