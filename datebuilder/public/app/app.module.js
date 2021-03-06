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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var ng2_popover_1 = require('ng2-popover');
var app_component_1 = require('./app.component');
var landing_component_1 = require('./landing/landing.component');
var navbar_component_1 = require('./navbar/navbar.component');
var search_component_1 = require('./search/search.component');
var search_bar_component_1 = require('./search-bar/search-bar.component');
var event_list_component_1 = require('./event-list/event-list.component');
var event_component_1 = require('./event/event.component');
var builder_component_1 = require('./builder/builder.component');
var account_component_1 = require('./account/account.component');
var login_component_1 = require('./login/login.component');
var date_component_1 = require('./date/date.component');
var category_component_1 = require('./category/category.component');
var dates_service_1 = require('./repositories/dates.service');
var events_service_1 = require('./repositories/events.service');
var users_service_1 = require('./repositories/users.service');
var ellipsis_pipe_1 = require('./pipes/ellipsis.pipe');
var image_pipe_1 = require('./pipes/image.pipe');
var hours_pipe_1 = require('./pipes/hours.pipe');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                ng2_popover_1.PopoverModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                router_1.RouterModule.forRoot([
                    { path: '', component: landing_component_1.LandingComponent },
                    { path: 'search', component: search_component_1.SearchComponent },
                    { path: 'search/:id', component: search_component_1.SearchComponent },
                    { path: 'account', component: account_component_1.AccountComponent },
                    { path: 'account/:link', component: account_component_1.AccountComponent },
                    { path: 'date/:id', component: date_component_1.DateComponent }
                ])
            ],
            declarations: [
                app_component_1.AppComponent,
                landing_component_1.LandingComponent,
                navbar_component_1.NavbarComponent,
                search_component_1.SearchComponent,
                search_bar_component_1.SearchbarComponent,
                event_list_component_1.EventListComponent,
                event_component_1.EventComponent,
                builder_component_1.BuilderComponent,
                account_component_1.AccountComponent,
                login_component_1.LoginComponent,
                date_component_1.DateComponent,
                category_component_1.CategoryComponent,
                ellipsis_pipe_1.EllipsisPipe,
                image_pipe_1.ImagePipe,
                hours_pipe_1.HoursPipe
            ],
            providers: [
                dates_service_1.DatesService,
                users_service_1.UsersService,
                events_service_1.EventsService
            ],
            bootstrap: [app_component_1.AppComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map