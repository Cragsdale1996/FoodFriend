import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { ProfileService} from '../profile/profile.service';
import { RestaurantModel } from '../models/restaurant_model';
import { Dish } from '../models/dish_model';

@Component({
	moduleId: module.id,
  selector: 'restaurant',
  templateUrl: 'restaurant.component.html',
  styleUrls: [ 'restaurant.component.css' ],
	providers: [ProfileService]
})

export class RestaurantComponent {
		session = "";
		isRest = "";
		restaurant = new RestaurantModel();
		dishes = [];

    constructor(private router:Router, private profileService: ProfileService) {}

		ngOnInit() {
			this.session = localStorage.getItem('currentUser');
			this.isRest = localStorage.getItem('isRest');
			this.getRestaurantProfile()
		}

		favorite(dish_id) {
			console.log("Dish ID", dish_id);
			var token = localStorage.getItem('currentUser');
			this.profileService.vote(token, "", dish_id).subscribe(
	      // the first argument is a function which runs on success
	      data => {
					console.log(data);
					this.dishes = [];
					alert("This dish has been added to your favorites");
					this.getRestaurantProfile()
				},
	      // the second argument is a function which runs on error
	      err => {
					console.error(err)
					alert("This dish could not be added to favorites at this time");
				},
	      // the third argument is a function which runs on completion
	      () => console.log('done loading profile')
	    );
		}

		upvote(dish_id) {
			var token = localStorage.getItem('currentUser');
			this.profileService.vote(token, "1", dish_id).subscribe(
	      // the first argument is a function which runs on success
	      data => {
					console.log(data);
					this.dishes = [];
					this.getRestaurantProfile()
				},
	      // the second argument is a function which runs on error
	      err => {
					console.error(err)
					alert("This dish could not be upvoted at this time");
				},
	      // the third argument is a function which runs on completion
	      () => console.log('done loading profile')
	    );
		}

		downvote(dish_id) {
			var token = localStorage.getItem('currentUser');
			this.profileService.vote(token, "-1", dish_id).subscribe(
	      // the first argument is a function which runs on success
	      data => {
					console.log(data);
					this.dishes = [];
					this.getRestaurantProfile()
				},
	      // the second argument is a function which runs on error
	      err => {
					console.error(err)
					alert("This dish could not be downvoted at this time");
				},
	      // the third argument is a function which runs on completion
	      () => console.log('done loading profile')
	    );
		}

		getRestaurantProfile() {
			var rest_id = localStorage.getItem('restId');
	    this.profileService.viewRestaurant(rest_id).subscribe(
	      // the first argument is a function which runs on success
	      data => {
					this.restaurant = data[0];
					for (var i = 0; i < data['Dishes'].length; i++) {
						var dish = new Dish();
						dish = data['Dishes'][i];
						this.dishes.push(dish);
					}
					console.log(this.restaurant);
					console.log(data);
				},
	      // the second argument is a function which runs on error
	      err => console.error(err),
	      // the third argument is a function which runs on completion
	      () => console.log('done loading profile')
	    );
	  }

}
