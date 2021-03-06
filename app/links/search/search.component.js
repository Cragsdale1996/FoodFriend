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
let SearchComponent = class SearchComponent {
    constructor(router, profileService) {
        this.router = router;
        this.profileService = profileService;
        this.restaurants = [];
        this.term = "";
    }
    ;
    ngOnInit() {
    }
    viewRestaurant(rest_id) {
        localStorage.setItem('restId', rest_id);
        this.router.navigate(['restaurant']);
    }
    search(term) {
        this.profileService.search(term).subscribe(data => {
            console.log(data);
            this.restaurants = [];
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    var restaurant = {
                        "name": data[i].name,
                        "rest_id": data[i].rest_id
                    };
                    this.restaurants.push(restaurant);
                }
                console.log(this.restaurants);
            }
        }, 
        // the second argument is a function which runs on error
        err => console.error(err), 
        // the third argument is a function which runs on completion
        () => console.log('done loading dishes'));
    }
};
SearchComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'search',
        templateUrl: 'search.component.html',
        styleUrls: ['search.component.css'],
        providers: [profile_service_1.ProfileService]
    }),
    __metadata("design:paramtypes", [router_1.Router, profile_service_1.ProfileService])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map