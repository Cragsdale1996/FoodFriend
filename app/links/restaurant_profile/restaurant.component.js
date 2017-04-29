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
const restaurant_model_1 = require("../models/restaurant_model");
const dish_model_1 = require("../models/dish_model");
let RestaurantComponent = class RestaurantComponent {
    constructor(router, profileService) {
        this.router = router;
        this.profileService = profileService;
        this.restaurant = new restaurant_model_1.RestaurantModel();
        this.dishes = [];
    }
    ngOnInit() {
        this.getRestaurantProfile();
    }
    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
    }
    getRestaurantProfile() {
        this.profileService.getRestaurantProfile().subscribe(
        // the first argument is a function which runs on success
        data => {
            this.restaurant = data[0];
            localStorage.setItem('currentUser', JSON.stringify(data[0]));
            this.profileService.setRestaurant(this.restaurant);
            for (var i = 0; i < data['Dishes'].length; i++) {
                var dish = new dish_model_1.Dish();
                dish = data['Dishes'][i];
                this.dishes.push(dish);
            }
            console.log(this.restaurant);
            console.log(this.dishes);
        }, 
        // the second argument is a function which runs on error
        err => console.error(err), 
        // the third argument is a function which runs on completion
        () => console.log('done loading profile'));
    }
};
RestaurantComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'restaurant',
        templateUrl: 'restaurant.component.html',
        styleUrls: ['restaurant.component.css'],
        providers: [profile_service_1.ProfileService]
    }),
    __metadata("design:paramtypes", [router_1.Router, profile_service_1.ProfileService])
], RestaurantComponent);
exports.RestaurantComponent = RestaurantComponent;
//# sourceMappingURL=restaurant.component.js.map