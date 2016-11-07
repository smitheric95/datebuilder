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
var events_service_1 = require('./../events.service');
var EventListComponent = (function () {
    function EventListComponent(route, router, eventsService) {
        this.route = route;
        this.router = router;
        this.eventsService = eventsService;
    }
    EventListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedEvent = {};
        this.route.params.forEach(function (params) {
            //router: search/:id=event-id
            if (params['id'] !== undefined) {
                _this.selectedEvent = _this.eventsService.getEvent(params['id']);
            }
            _this.events = _this.eventsService.getEvents();
            console.log(params);
            console.log(_this.selectedEvent);
        });
    };
    EventListComponent = __decorate([
        core_1.Component({
            selector: 'event-list',
            templateUrl: './app/event-list/event-list.html',
            styleUrls: ['./app/event-list/event-list.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, events_service_1.EventsService])
    ], EventListComponent);
    return EventListComponent;
}());
exports.EventListComponent = EventListComponent;
//# sourceMappingURL=event-list.component.js.map