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
const profile_service_1 = require("./profile.service");
const user_model_1 = require("../models/user_model");
const restaurant_model_1 = require("../models/restaurant_model");
const dish_model_1 = require("../models/dish_model");
let ProfileComponent = class ProfileComponent {
    constructor(router, profileService) {
        this.router = router;
        this.profileService = profileService;
        this.user = new user_model_1.UserModel();
        this.restaurant = new restaurant_model_1.RestaurantModel();
        this.dishes = [];
        this.new_dish_name = "";
        this.new_dish_description = "";
        this.isRest = "false";
    }
    ngOnInit() {
        this.isRest = localStorage.getItem('isRest');
        var token = localStorage.getItem('currentUser');
        console.log("sessionId: ", token);
        if (this.isRest == "true") {
            this.getRestProfile();
        }
        else {
            this.getProfile();
        }
    }
    logout() {
        var token = localStorage.getItem('currentUser');
        this.profileService.logout(token).subscribe(
        // the first argument is a function which runs on success
        data => {
            console.log("Logged Out Data", data);
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isRest');
            this.router.navigate(['/login']);
        }, 
        // the second argument is a function which runs on error
        err => console.error(err), 
        // the third argument is a function which runs on completion
        () => console.log('done loading profile'));
    }
    updateProfile() {
        var token = localStorage.getItem('currentUser');
        this.profileService.updateUserProfile(token, this.user).subscribe(
        // the first argument is a function which runs on success
        data => {
            console.log("Update User", data);
            alert('Saved User');
        }, 
        // the second argument is a function which runs on error
        err => console.error(err), 
        // the third argument is a function which runs on completion
        () => console.log('done loading profile'));
    }
    deleteDish(dish_id) {
        var token = localStorage.getItem('currentUser');
        this.profileService.deleteDish(token, dish_id).subscribe(
        // the first argument is a function which runs on success
        data => {
            console.log("Rest data", data);
            alert("Dish Deleted");
            this.dishes = [];
            this.getRestProfile();
        }, 
        // the second argument is a function which runs on error
        err => {
            console.error(err);
            alert("Dish cannot be deleted at this time");
        }, 
        // the third argument is a function which runs on completion
        () => console.log('done'));
    }
    updateRestProfile() {
        var token = localStorage.getItem('currentUser');
        this.profileService.updateRestaurantProfile(token, this.restaurant).subscribe(
        // the first argument is a function which runs on success
        data => {
            console.log("Update Restaurant", data);
            alert('Updated Restaurant');
        }, 
        // the second argument is a function which runs on error
        err => console.error(err), 
        // the third argument is a function which runs on completion
        () => console.log('done loading profile'));
    }
    addDish() {
        var token = localStorage.getItem('currentUser');
        this.profileService.addDish(token, this.new_dish_name, this.new_dish_description).subscribe(
        // the first argument is a function which runs on success
        data => {
            console.log("Rest data", data);
            alert("Dish Added");
            this.new_dish_name = "";
            this.new_dish_description = "";
            this.dishes = [];
            this.getRestProfile();
        }, 
        // the second argument is a function which runs on error
        err => console.error(err), 
        // the third argument is a function which runs on completion
        () => console.log('done'));
    }
    getRestProfile() {
        var token = localStorage.getItem('currentUser');
        var isRest = localStorage.getItem('isRest');
        if (!token) {
            this.router.navigate(['login']);
        }
        else {
            this.profileService.getRestaurantProfile(token).subscribe(
            // the first argument is a function which runs on success
            data => {
                this.restaurant = data;
                this.restaurant.name = data.rest_name;
                this.restaurant.state_post_code = data.state;
                for (var i = 0; i < data['dishes'].length; i++) {
                    var dish = new dish_model_1.Dish();
                    dish = data['dishes'][i];
                    this.dishes.push(dish);
                }
                console.log("Rest data", data);
            }, 
            // the second argument is a function which runs on error
            err => console.error(err), 
            // the third argument is a function which runs on completion
            () => console.log('done loading profile'));
        }
    }
    getProfile() {
        var token = localStorage.getItem('currentUser');
        var isRest = localStorage.getItem('isRest');
        console.log("Token: ", token);
        if (!token) {
            this.router.navigate(['login']);
        }
        else {
            this.profileService.getProfile(token).subscribe(
            // the first argument is a function which runs on success
            data => {
                this.user = data[0];
                this.user.username = data[0].user_name;
                for (var i = 0; i < data['Dishes'].length; i++) {
                    var dish = new dish_model_1.Dish();
                    dish = data['Dishes'][i];
                    this.dishes.push(dish);
                }
                console.log("User data", data);
            }, 
            // the second argument is a function which runs on error
            err => console.error(err), 
            // the third argument is a function which runs on completion
            () => console.log('done loading profile'));
        }
    }
};
ProfileComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'profile',
        templateUrl: 'profile.component.html',
        styleUrls: ['profile.component.css'],
        providers: [profile_service_1.ProfileService]
    }),
    __metadata("design:paramtypes", [router_1.Router, profile_service_1.ProfileService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map