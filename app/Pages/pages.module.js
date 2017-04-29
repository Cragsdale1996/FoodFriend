"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
const login_component_1 = require("./login/login.component");
const home_component_1 = require("./home/home.component");
const profile_component_1 = require("./profile/profile.component");
const search_component_1 = require("./search/search.component");
const restaurant_component_1 = require("./restaurant_profile/restaurant.component");
var routes = [
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent
    },
    {
        path: 'search',
        component: search_component_1.SearchComponent
    },
    {
        path: 'restaurant',
        component: restaurant_component_1.RestaurantComponent
    }
    //  {
    //    path: 'edit/:id',
    //    component: MovieEditorComponent
    //  }
];
let PagesModule = class PagesModule {
};
PagesModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot(routes),
            forms_1.FormsModule
        ],
        declarations: [
            login_component_1.LoginComponent,
            home_component_1.HomeComponent,
            profile_component_1.ProfileComponent,
            search_component_1.SearchComponent,
            restaurant_component_1.RestaurantComponent
        ],
        exports: [
            login_component_1.LoginComponent,
            home_component_1.HomeComponent,
            profile_component_1.ProfileComponent,
            search_component_1.SearchComponent,
            restaurant_component_1.RestaurantComponent
        ],
        providers: []
    })
], PagesModule);
exports.PagesModule = PagesModule;
//# sourceMappingURL=pages.module.js.map