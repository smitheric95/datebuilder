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
var AccountComponent = (function () {
    function AccountComponent() {
    }
    AccountComponent.prototype.ngOnInit = function () {
        this.years = Array(75).fill(0).map(function (x, i) { return (new Date().getFullYear() - i); });
    };
    AccountComponent = __decorate([
        core_1.Component({
            selector: 'account',
            templateUrl: './app/account/account.html',
            styleUrls: [
                './app/account/account.css',
                './node_modules/bootstrap/dist/css/bootstrap.min.css',
                './node_modules/bootstrap/node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=account.component.js.map