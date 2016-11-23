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
var BuilderComponent = (function () {
    function BuilderComponent() {
    }
    BuilderComponent.prototype.ngOnInit = function () {
        this.events = [];
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
        __metadata('design:paramtypes', [])
    ], BuilderComponent);
    return BuilderComponent;
}());
exports.BuilderComponent = BuilderComponent;
//# sourceMappingURL=builder.component.js.map