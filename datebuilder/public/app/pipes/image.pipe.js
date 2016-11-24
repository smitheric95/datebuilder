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
var ImagePipe = (function () {
    function ImagePipe() {
    }
    ImagePipe.prototype.transform = function (val, arg) {
        if (arg === undefined) {
            return val;
        }
        if (arg == "large") {
            return val.substring(0, val.length - 6) + "l.jpg";
        }
        else if (arg == "original") {
            return val.substring(0, val.length - 6) + "/o.jpg";
        }
        else {
            return val;
        }
    };
    ImagePipe = __decorate([
        core_1.Pipe({
            name: 'image'
        }), 
        __metadata('design:paramtypes', [])
    ], ImagePipe);
    return ImagePipe;
}());
exports.ImagePipe = ImagePipe;
//# sourceMappingURL=image.pipe.js.map