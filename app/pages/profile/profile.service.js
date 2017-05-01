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
require("rxjs/add/operator/map");
const user_model_1 = require("../models/user_model");
let ProfileService = class ProfileService {
    constructor(http) {
        // Change these URL's from Apiary to whatever endpoints you have
        this.getProfileUrl = "https://private-0c3f4-apiary13.apiary-mock.com/userprofile/";
        this.http = http;
        this.user = new user_model_1.UserModel();
    }
    // Uses http.get() to load a single JSON file
    getProfile(sessionId) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/userprofile/" + sessionId;
        return this.http.get(url).map((res) => res.json());
    }
    getRestaurantProfile(sessionId) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/restaurant/" + sessionId;
        return this.http.get(url).map((res) => res.json());
    }
    getTop5Dishes() {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/home";
        return this.http.get(url).map((res) => res.json());
    }
    createUser(newUser, password) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/createUserAccount";
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        let body = JSON.stringify({
            "email": newUser.email,
            "password": password,
            "name": newUser.username,
            "city": newUser.city,
            "state": newUser.state_post_code
        });
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post(url, body, headers).map((res) => res.json());
    }
    createRestaurant(restaurant, password) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/createRestAccount";
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        let body = JSON.stringify({
            "email": restaurant.email,
            "password": password,
            "name": restaurant.name,
            "city": restaurant.city,
            "state_post_code": restaurant.state_post_code,
            "category": restaurant.category,
            "address": restaurant.address
        });
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post(url, body, headers).map((res) => res.json());
    }
    login(email, password) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/login";
        let headers = new http_1.Headers({ 'Content-Type': 'application/json', 'accept': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        let body = JSON.stringify({
            "email": email,
            "password": password
        });
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post(url, body, headers).map((res) => res.json());
    }
    logout(sessionId) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/logout";
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({headers: headers});
        let body = JSON.stringify({
            "session_id": sessionId,
        });
        let options = new http_1.RequestOptions({
            body: body,
            method: http_1.RequestMethod.Delete
        });
        return this.http.request(url, options).map((res) => res.json());
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        // return this.http.delete(url, body, headers).map((res:Response) => res.json());
    }
    search(term) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/searchpage/" + term;
        return this.http.get(url).map((res) => res.json());
    }
    addDish(sessionId, name, description) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/restaurant/addDishes";
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        let body = JSON.stringify({
            "session_id": sessionId,
            "dishes": [
                {
                    "name": name,
                    "description": description
                }
            ]
        });
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post(url, body, headers).map((res) => res);
    }
    deleteDish(sessionId, dishId) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/restaurant/deleteDishes";
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({headers: headers});
        let body = JSON.stringify({
            "session_id": sessionId,
            "dishes": [
                {
                    "id": dishId
                }
            ]
        });
        let options = new http_1.RequestOptions({
            body: body,
            method: http_1.RequestMethod.Delete
        });
        return this.http.request(url, options).map((res) => res.json());
    }
    vote(sessionId, vote, dishId) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/restProfile/public";
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        let body = JSON.stringify({
            "session_id": sessionId,
            "vote": vote,
            "dish_id": dishId
        });
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post(url, body, headers).map((res) => res.json());
    }
    unFavorite(sessionId, dishId) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/userprofile/del/" + dishId;
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({headers: headers});
        let body = JSON.stringify({
            "session_id": sessionId,
        });
        let options = new http_1.RequestOptions({
            body: body,
            method: http_1.RequestMethod.Delete
        });
        return this.http.request(url, options).map((res) => res.json());
    }
    viewRestaurant(restId) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/restprofile/" + restId;
        return this.http.get(url).map((res) => res.json());
    }
    updateUserProfile(sessionId, user) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/userprofile";
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        let body = JSON.stringify({
            "session_id": sessionId,
            "email": user.email,
            "name": user.username,
            "city": user.city,
            "state_post_code": user.state_post_code
        });
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post(url, body, headers).map((res) => res.json());
    }
    updateRestaurantProfile(sessionId, restaurant) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/restaurants";
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        let body = JSON.stringify({
            "session_id": sessionId,
            "address": restaurant.address,
            "category": restaurant.category,
            "name": restaurant.name,
            "city": restaurant.city,
            "state_post_code": restaurant.state_post_code
        });
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post(url, body, headers).map((res) => res.json());
    }
};
ProfileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map