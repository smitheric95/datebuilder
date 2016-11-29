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
var EventComponent = (function () {
    function EventComponent(route, router) {
        this.route = route;
        this.router = router;
        this.eventSelected = new core_1.EventEmitter();
        this.eventAdded = new core_1.EventEmitter();
        this.eventRemoved = new core_1.EventEmitter();
    }
    EventComponent.prototype.ngOnInit = function () {
        this.googleLinks = "";
        this.singleEvent = false;
        this.categories = [];
    };
    EventComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.googleLinks !== undefined) {
            this.googleLinks = ("http://maps.google.com/?q=" + this.event.location[0] + this.event.location[1]);
            this.route.params.forEach(function (params) {
                if (params['id'] === _this.event.id) {
                    _this.singleEvent = true;
                    _this.categories = _this.event.categories[0];
                }
            });
        }
    };
    EventComponent.prototype.onAddEvent = function () {
        if (document.cookie.includes("isLoggedIn=true;"))
            this.eventAdded.emit(this.event);
        else
            this.router.navigateByUrl('account');
    };
    EventComponent.prototype.selectEvent = function () {
        this.eventSelected.emit(this.event.id);
    };
    EventComponent.prototype.removeEvent = function () {
        this.eventRemoved.emit(this.event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EventComponent.prototype, "event", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], EventComponent.prototype, "isSelected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], EventComponent.prototype, "isMini", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EventComponent.prototype, "eventSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EventComponent.prototype, "eventAdded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EventComponent.prototype, "eventRemoved", void 0);
    EventComponent = __decorate([
        core_1.Component({
            selector: 'event',
            templateUrl: './app/event/event.html',
            styleUrls: [
                './app/event/event.css',
                './node_modules/bootstrap/dist/css/bootstrap.min.css',
                './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
            ]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
    ], EventComponent);
    return EventComponent;
}());
exports.EventComponent = EventComponent;
//# sourceMappingURL=event.component.js.map