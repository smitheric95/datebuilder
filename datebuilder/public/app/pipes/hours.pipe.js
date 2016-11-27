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
var HoursPipe = (function () {
    function HoursPipe() {
    }
    HoursPipe.prototype.transform = function (val, args) {
        var hours = Math.floor(val / 60);
        var minutes = val % 60;
        var final = '';
        if (hours > 0) {
            final += hours + ' hours';
        }
        if (minutes > 0) {
            final += ' ' + minutes + ' minutes';
        }
        return final;
    };
    HoursPipe = __decorate([
        core_1.Pipe({
            name: 'hours'
        }), 
        __metadata('design:paramtypes', [])
    ], HoursPipe);
    return HoursPipe;
}());
exports.HoursPipe = HoursPipe;
//# sourceMappingURL=hours.pipe.js.map