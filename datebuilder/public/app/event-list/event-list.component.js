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
var EventListComponent = (function () {
    function EventListComponent(route, router, eventsService) {
        this.route = route;
        this.router = router;
        this.eventsService = eventsService;
    }
    EventListComponent.prototype.loadModal = function (event) {
        var _this = this;
        this.eventsService.getEvent(event).then(function (x) {
            _this.selectedEvent = JSON.parse(x);
            //disgusting hack
            $(function () {
                $('#eventModal').modal('show');
            });
        });
    };
    ;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EventListComponent.prototype, "events", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], EventListComponent.prototype, "singleEvent", void 0);
    EventListComponent = __decorate([
        core_1.Component({
            selector: 'event-list',
            templateUrl: './app/event-list/event-list.html',
            styleUrls: [
                './app/event-list/event-list.css',
                './node_modules/bootstrap/dist/css/bootstrap.min.css',
                './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css',
                '//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
                '//fonts.googleapis.com/icon?family=Material+Icons'
            ]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, events_service_1.EventsService])
    ], EventListComponent);
    return EventListComponent;
}());
exports.EventListComponent = EventListComponent;
//# sourceMappingURL=event-list.component.js.map