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
var BuilderComponent = (function () {
    function BuilderComponent(route, router, datesService) {
        this.route = route;
        this.router = router;
        this.datesService = datesService;
    }
    BuilderComponent.prototype.ngOnInit = function () {
        this.events = [];
        this.date = {};
        this.date.name = "My Awesome Date";
    };
    BuilderComponent.prototype.ngOnChanges = function (changes) {
        if (changes.addedEvent.currentValue !== undefined)
            this.addEvent(changes.addedEvent.currentValue);
    };
    BuilderComponent.prototype.listEvents = function () {
        console.log("---- Event Objects by ID: ----");
        for (var i = 0; i < this.events.length; i++)
            console.log(this.events[i].id);
    };
    BuilderComponent.prototype.addEvent = function (event) {
        if (this.events.indexOf(event) === -1) {
            this.events.push(event);
            console.log("Added event object with ID: '" + event.id + "'");
        }
    };
    BuilderComponent.prototype.buildDate = function () {
        var _this = this;
        var hasImage = false;
        this.date.business = [];
        this.date.total_cost = 0;
        this.date.total_time = 0;
        for (var i = 0; i < this.events.length; i++) {
            var curEvent = this.events[i];
            this.date.business.push(curEvent.id);
            this.date.total_cost += curEvent.cost;
            this.date.total_time += parseInt(curEvent.time);
            if (!hasImage && curEvent.image_url != undefined) {
                this.date.image_url = curEvent.image_url;
                this.date.image_url = this.date.image_url.split("/").slice(0, -1).join('/');
                this.date.image_url += "/l.jpg";
                hasImage = true;
            }
        }
        this.datesService.build(this.date).then(function (x) {
            _this.router.navigateByUrl('date/' + x);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BuilderComponent.prototype, "addedEvent", void 0);
    BuilderComponent = __decorate([
        core_1.Component({
            selector: 'builder',
            templateUrl: './app/builder/builder.html',
            styleUrls: [
                './app/builder/builder.css',
                './node_modules/bootstrap/dist/css/bootstrap.min.css',
                './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css',
            ]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, dates_service_1.DatesService])
    ], BuilderComponent);
    return BuilderComponent;
}());
exports.BuilderComponent = BuilderComponent;
//# sourceMappingURL=builder.component.js.map