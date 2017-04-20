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
var routes = [
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: '',
        component: home_component_1.HomeComponent
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
            home_component_1.HomeComponent
        ],
        exports: [
            login_component_1.LoginComponent
        ],
        providers: []
    })
], PagesModule);
exports.PagesModule = PagesModule;
//# sourceMappingURL=pages.module.js.map