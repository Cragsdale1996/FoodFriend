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
const http_1 = require("@angular/http");
const Rx_1 = require("rxjs/Rx");
const user_model_1 = require("../models/user_model");
let ProfileService = class ProfileService {
    constructor(http) {
        this.http = http;
        // Change these URL's from Apiary to whatever endpoints you have
        this.getProfileUrl = "https://private-0c3f4-apiary13.apiary-mock.com/userprofile/";
        this.user = new user_model_1.UserModel();
    }
    setUser(user) {
        this.user = user;
    }
    setRestaurant(user) {
        this.restaurant = user;
    }
    getRestaurant() {
        return this.restaurant;
    }
    getUser() {
        return this.user;
    }
    // Uses http.get() to load a single JSON file
    getProfile() {
        this.getProfileUrl = this.getProfileUrl + "123";
        return this.http.get(this.getProfileUrl).map((res) => res.json());
    }
    getRestaurantProfile() {
        var url = "https://private-0c3f4-apiary13.apiary-mock.com/restaurant/" + "123";
        return this.http.get(url).map((res) => res.json());
    }
    getTop5Dishes() {
        var url = "https://private-0c3f4-apiary13.apiary-mock.com/home";
        return this.http.get(url).map((res) => res.json());
    }
    // Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
    // The entire operation will result in an error state if any single request fails.
    getBooksAndMovies() {
        return Rx_1.Observable.forkJoin(this.http.get('/app/books.json').map((res) => res.json()), this.http.get('/app/movies.json').map((res) => res.json()));
    }
    createFood(food) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        let body = JSON.stringify(food);
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post('/api/food/', body, headers).map((res) => res.json());
    }
    updateFood(food) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        let body = JSON.stringify(food);
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.put('/api/food/' + food.id, body, headers).map((res) => res.json());
    }
    deleteFood(food) {
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.delete('/api/food/' + food.id);
    }
};
ProfileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map