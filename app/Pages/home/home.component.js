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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const profile_service_1 = require("../profile/profile.service");
const dish_model_1 = require("../models/dish_model");
let HomeComponent = class HomeComponent {
    constructor(router, profileService) {
        this.router = router;
        this.profileService = profileService;
        this.dishes = [];
    }
    ;
    ngOnInit() {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        this.profileService.setUser(user);
        if (user) {
            this.user = this.profileService.getUser();
        }
        this.getDishes();
    }
    getDishes() {
        this.profileService.getTop5Dishes().subscribe(data => {
            for (var i = 0; i < data.length; i++) {
                var dish = new dish_model_1.Dish();
                dish = data[i];
                this.dishes.push(dish);
            }
            console.log(this.dishes);
        }, 
        // the second argument is a function which runs on error
        err => console.error(err), 
        // the third argument is a function which runs on completion
        () => console.log('done loading dishes'));
    }
    goTo() {
        this.router.navigate(['/login']);
        console.log("not working?");
    }
};
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'home',
        templateUrl: 'home.component.html',
        styleUrls: ['home.component.css'],
        providers: [profile_service_1.ProfileService]
    }),
    __metadata("design:paramtypes", [router_1.Router, typeof (_a = typeof profile_service_1.ProfileService !== "undefined" && profile_service_1.ProfileService) === "function" && _a || Object])
], HomeComponent);
exports.HomeComponent = HomeComponent;
var _a;
//# sourceMappingURL=home.component.js.map