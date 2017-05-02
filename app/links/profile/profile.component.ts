import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { ProfileService} from './profile.service';
import { UserModel } from '../models/user_model';
import { RestaurantModel } from '../models/restaurant_model';
import { Dish } from '../models/dish_model';

@Component({
	moduleId: module.id,
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: [ 'profile.component.css' ],
	providers: [ProfileService]
})

export class ProfileComponent {
		user = new UserModel();
		restaurant = new RestaurantModel()
		dishes = [];
		new_dish_name = "";
		new_dish_description  = "";
		isRest = "false";

    constructor(private router:Router, private profileService: ProfileService) {}

		ngOnInit() {
			this.isRest = localStorage.getItem('isRest')
			var token = localStorage.getItem('currentUser');
			console.log("sessionId: ", token)
			if (this.isRest == "true") {
				this.getRestProfile()
			} else {
				this.getProfile()
			}

		}

		logout() {
			var token = localStorage.getItem('currentUser')
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
				() => console.log('done loading profile')
			);

    }

		updateProfile() {
			var token = localStorage.getItem('currentUser')
			this.profileService.updateUserProfile(token, this.user).subscribe(
				// the first argument is a function which runs on success
				data => {
					console.log("Update User", data);
					alert('Saved User');
				},
				// the second argument is a function which runs on error
				err => console.error(err),
				// the third argument is a function which runs on completion
				() => console.log('done loading profile')
			);
		}

		deleteDish(dish_id) {
			var token = localStorage.getItem('currentUser')
			this.profileService.deleteDish(token, dish_id).subscribe(
				// the first argument is a function which runs on success
				data => {
					console.log("Rest data", data);
					alert("Dish Deleted")
					this.dishes = [];
					this.getRestProfile();
				},
				// the second argument is a function which runs on error
				err => {
					console.error(err);
					alert("Dish cannot be deleted at this time")
				},
				// the third argument is a function which runs on completion
				() => console.log('done')
			);
		}

		updateRestProfile() {
			var token = localStorage.getItem('currentUser')
			this.profileService.updateRestaurantProfile(token, this.restaurant).subscribe(
				// the first argument is a function which runs on success
				data => {
					console.log("Update Restaurant", data);
					alert('Updated Restaurant');
				},
				// the second argument is a function which runs on error
				err => console.error(err),
				// the third argument is a function which runs on completion
				() => console.log('done loading profile')
			);
		}

		addDish() {
			var token = localStorage.getItem('currentUser')
			this.profileService.addDish(token, this.new_dish_name, this.new_dish_description).subscribe(
				// the first argument is a function which runs on success
				data => {
					console.log("Rest data", data);
					alert("Dish Added")
					this.new_dish_name = "";
					this.new_dish_description  = "";
					this.dishes = [];
					this.getRestProfile();
				},
				// the second argument is a function which runs on error
				err => console.error(err),
				// the third argument is a function which runs on completion
				() => console.log('done')
			);
		}

		getRestProfile() {
			var token = localStorage.getItem('currentUser')
			var isRest = localStorage.getItem('isRest')
			if (!token) {
				this.router.navigate(['login'])
			} else {
				this.profileService.getRestaurantProfile(token).subscribe(
		      // the first argument is a function which runs on success
		      data => {
						this.restaurant = data;
						this.restaurant.name = data.rest_name;
						this.restaurant.state_post_code = data.state;
						for (var i = 0; i < data['dishes'].length; i++) {
							var dish = new Dish();
							dish = data['dishes'][i];
							this.dishes.push(dish);
						}

						console.log("Rest data", data);
					},
		      // the second argument is a function which runs on error
		      err => console.error(err),
		      // the third argument is a function which runs on completion
		      () => console.log('done loading profile')
		    );
			}
		}

		getProfile() {
			var token = localStorage.getItem('currentUser')
			var isRest = localStorage.getItem('isRest')
			console.log("Token: ", token);
			if (!token) {
				this.router.navigate(['login'])
			} else {
				this.profileService.getProfile(token).subscribe(
		      // the first argument is a function which runs on success
		      data => {
						this.user = data[0];
						this.user.username = data[0].user_name;
						for (var i = 0; i < data['Dishes'].length; i++) {
							var dish = new Dish();
							dish = data['Dishes'][i];
							this.dishes.push(dish);
						}

						console.log("User data", data);
					},
		      // the second argument is a function which runs on error
		      err => console.error(err),
		      // the third argument is a function which runs on completion
		      () => console.log('done loading profile')
		    );
			}

	  }

}
