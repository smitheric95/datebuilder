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
var CategoryComponent = (function () {
    function CategoryComponent() {
    }
    CategoryComponent.prototype.ngOnInit = function () {
        this.categories = {};
        this.keys = [];
        this.values = [];
    };
    CategoryComponent.prototype.ngOnChanges = function () {
        for (var property in this.categories) {
            this.keys.push(property);
            this.values.push(this.categories[property]);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CategoryComponent.prototype, "categories", void 0);
    CategoryComponent = __decorate([
        core_1.Component({
            selector: 'category',
            templateUrl: './app/category/category.html',
            styleUrls: [
                './app/category/category.css',
                './node_modules/bootstrap/dist/css/bootstrap.min.css',
                './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css',
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CategoryComponent);
    return CategoryComponent;
}());
exports.CategoryComponent = CategoryComponent;
//# sourceMappingURL=category.component.js.map