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
const profile_service_1 = require("./profile.service");
const user_model_1 = require("./user_model");
const dish_model_1 = require("./dish_model");
let ProfileComponent = class ProfileComponent {
    constructor(profileService) {
        this.profileService = profileService;
        this.user = new user_model_1.UserModel();
        this.dishes = [];
    }
    ngOnInit() {
        this.getProfile();
    }
    getProfile() {
        this.profileService.getProfile().subscribe(
        // the first argument is a function which runs on success
        data => {
            this.user = data[0];
            for (var i = 0; i < data['Dishes'].length; i++) {
                var dish = new dish_model_1.Dish();
                dish = data['Dishes'][i];
                this.dishes.push(dish);
            }
            console.log(this.dishes);
        }, 
        // the second argument is a function which runs on error
        err => console.error(err), 
        // the third argument is a function which runs on completion
        () => console.log('done loading profile'));
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
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map