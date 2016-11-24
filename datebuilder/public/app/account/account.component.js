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
var users_service_1 = require('../repositories/users.service');
var AccountComponent = (function () {
    function AccountComponent(route, router, usersService) {
        this.route = route;
        this.router = router;
        this.usersService = usersService;
    }
    AccountComponent.prototype.ngOnInit = function () {
        /*
            AWAITING PARAMETERIZED USER ROUTE
        */
        this.isLoggedIn = true;
        this.user = {};
        this.user.id = 1;
        /******/
        this.stats = {};
        this.user = {
            allow_loc_services: false
        };
        this.years = Array(75).fill(0).map(function (x, i) { return (new Date().getFullYear() - i); });
        this.getUser();
    };
    AccountComponent.prototype.add = function () {
        var _this = this;
        if (this.user.allow_loc_services == true)
            this.user.allow_loc_services = "True";
        else if (this.user.allow_loc_services != "True")
            this.user.allow_loc_services = "False";
        this.user.age = new Date().getFullYear() - this.user.age;
        this.usersService.add(this.user)
            .then(function () { return _this.returnToList(); });
    };
    AccountComponent.prototype.returnToList = function () {
        this.router.navigateByUrl('search')
            .then(function () {
            eval("$(function(){$('#createdAccountModal').modal('show')})");
        });
    };
    AccountComponent.prototype.getUser = function () {
        var _this = this;
        if (this.isLoggedIn) {
            this.usersService.get(this.user.id).then(function (x) {
                var temp = JSON.parse(x);
                _this.user = temp.user;
                _this.dates = temp.dates;
                _this.stats = temp.stats;
            });
        }
    };
    AccountComponent = __decorate([
        core_1.Component({
            selector: 'account',
            templateUrl: './app/account/account.html',
            styleUrls: [
                './app/account/account.css',
                './node_modules/bootstrap/dist/css/bootstrap.min.css',
                './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
            ]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, users_service_1.UsersService])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=account.component.js.map