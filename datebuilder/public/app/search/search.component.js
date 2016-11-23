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
var events_service_1 = require('./../repositories/events.service');
var SearchComponent = (function () {
    function SearchComponent(route, router, eventsService) {
        this.route = route;
        this.router = router;
        this.eventsService = eventsService;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.events = [];
        this.selectedEvent = {};
        this.singleEvent = false;
        this.route.params.forEach(function (params) {
            //router: search/:id=event-id
            if (params['id'] !== undefined) {
                _this.eventsService.getEvent(params['id']).then(function (x) {
                    _this.selectedEvent = JSON.parse(x);
                    _this.singleEvent = true;
                });
            }
        });
    };
    SearchComponent.prototype.onQuery = function (query) {
        var _this = this;
        this.currentQuery = query;
        this.eventsService.search(query).then(function (x) {
            _this.events = JSON.parse(x);
            _this.singleEvent = false;
        });
    };
    SearchComponent.prototype.focus = function () {
        eval("$(function(){ $('#search').focus() });");
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: './app/search/search.html',
            styleUrls: [
                './app/search/search.css',
                './node_modules/bootstrap/dist/css/bootstrap.min.css',
                './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
            ]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, events_service_1.EventsService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map