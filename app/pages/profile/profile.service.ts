import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import { UserModel } from '../models/user_model';
import { RestaurantModel } from '../models/restaurant_model';


@Injectable()
export class ProfileService {
    // Change these URL's from Apiary to whatever endpoints you have
    getProfileUrl = "https://private-0c3f4-apiary13.apiary-mock.com/userprofile/"

    private user: UserModel;
    private restaurant: RestaurantModel;

    constructor(private http:Http) {
      this.user = new UserModel();
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
        this.getProfileUrl = this.getProfileUrl + "123"
        return this.http.get(this.getProfileUrl).map((res:Response) => res.json());
    }

    getRestaurantProfile() {
        var url = "https://private-0c3f4-apiary13.apiary-mock.com/restaurant/" + "123"
        return this.http.get(url).map((res:Response) => res.json());
    }

    getTop5Dishes() {
        var url = "https://private-0c3f4-apiary13.apiary-mock.com/home"
        return this.http.get(url).map((res:Response) => res.json());
    }

    // Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
    // The entire operation will result in an error state if any single request fails.
    getBooksAndMovies() {
        return Observable.forkJoin(
        this.http.get('/app/books.json').map((res:Response) => res.json()),
        this.http.get('/app/movies.json').map((res:Response) => res.json())
        );
    }

    createFood(food) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(food);
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post('/api/food/', body, headers).map((res:Response) => res.json());
    }

    updateFood(food) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(food);
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.put('/api/food/' + food.id, body, headers).map((res:Response) => res.json());
    }

    deleteFood(food) {
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.delete('/api/food/' + food.id);
    }

}
