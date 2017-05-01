import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { UserModel } from '../models/user_model';
import { RestaurantModel } from '../models/restaurant_model';


@Injectable()
export class ProfileService {
    // Change these URL's from Apiary to whatever endpoints you have
    getProfileUrl = "https://private-0c3f4-apiary13.apiary-mock.com/userprofile/"

    private user: UserModel;
    private restaurant: RestaurantModel;
    public http: Http;

    constructor(http:Http) {
      this.http = http;
      this.user = new UserModel();
    }

    // Uses http.get() to load a single JSON file
    getProfile(sessionId) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/userprofile/" + sessionId;
        return this.http.get(url).map((res:Response) => res.json());
    }

    getRestaurantProfile(sessionId) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/restaurant/" + sessionId;
        return this.http.get(url).map((res:Response) => res.json());
    }

    getTop5Dishes() {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/home"
        return this.http.get(url).map((res:Response) => res.json());
    }

    createUser(newUser, password) {
      var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/createUserAccount";
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      let body = JSON.stringify({
        "email": newUser.email,
        "password": password,
        "name": newUser.username,
        "city": newUser.city,
        "state": newUser.state_post_code
      });
      // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
      return this.http.post(url, body, headers).map((res:Response) => res.json());
    }

    createRestaurant(restaurant, password) {
      var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/createRestAccount";
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});

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
      return this.http.post(url, body, headers).map((res:Response) => res.json());
    }

    login(email, password) {
        var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/login"
        let headers = new Headers({'Content-Type': 'application/json', 'accept': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify({
          "email": email,
          "password": password
        });
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post(url, body, headers).map((res:Response) => res.json());
    }

    logout(sessionId) {
      var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/logout"
      let headers = new Headers({'Content-Type': 'application/json'});
      // let options = new RequestOptions({headers: headers});
      let body = JSON.stringify({
        "session_id": sessionId,
      });

      let options = new RequestOptions({
        body: body,
        method: RequestMethod.Delete
      });

      return this.http.request(url, options).map((res:Response) => res.json());
      // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
      // return this.http.delete(url, body, headers).map((res:Response) => res.json());
    }

    search(term) {
      var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/searchpage/" + term;
      return this.http.get(url).map((res:Response) => res.json());
    }

    addDish(sessionId, name, description) {
      var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/restaurant/addDishes"
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
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
      return this.http.post(url, body, headers).map((res:Response) => res);
    }

    deleteDish(sessionId, dishId) {
      var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/restaurant/deleteDishes"
      let headers = new Headers({'Content-Type': 'application/json'});
      // let options = new RequestOptions({headers: headers});
      let body = JSON.stringify({
        "session_id": sessionId,
        "dishes": [
          {
            "id": dishId
          }
        ]
      });

      return this.http.post(url, body, headers).map((res:Response) => res);
    }

    vote(sessionId, vote, dishId) {
      var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/restProfile/public"
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      let body = JSON.stringify({
        "session_id": sessionId,
        "vote": vote,
        "dish_id": dishId
      });
      // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
      return this.http.post(url, body, headers).map((res:Response) => res.json());
    }

    unFavorite(sessionId, dishId) {
      var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/userprofile/del/" + dishId;
      let headers = new Headers({'Content-Type': 'application/json'});
      // let options = new RequestOptions({headers: headers});
      let body = JSON.stringify({
        "session_id": sessionId,
      });

      return this.http.post(url, body, headers).map((res:Response) => res);
    }

    viewRestaurant(restId) {
      var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/restprofile/" + restId;
      return this.http.get(url).map((res:Response) => res.json());
    }

    updateUserProfile(sessionId, user) {
      var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/userprofile"
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      let body = JSON.stringify({
        "session_id": sessionId,
        "email": user.email,
        "name": user.username,
        "city": user.city,
        "state_post_code": user.state_post_code
      });
      // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
      return this.http.post(url, body, headers).map((res:Response) => res.json());
    }

    updateRestaurantProfile(sessionId, restaurant) {
      var url = "http://ec2-54-187-37-250.us-west-2.compute.amazonaws.com/foodfriend/public/index.php/restaurant/updateInfo"
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      let body = JSON.stringify({
        "session_id": sessionId,
        "address": restaurant.address,
        "category": restaurant.category,
        "name": restaurant.name,
        "city": restaurant.city,
        "state_post_code": restaurant.state_post_code
      });
      // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
      return this.http.post(url, body, headers).map((res:Response) => res);
    }

}
