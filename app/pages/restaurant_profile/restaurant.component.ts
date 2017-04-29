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
		restaurant = new RestaurantModel();
		dishes = [];

    constructor(private router:Router, private profileService: ProfileService) {}

		ngOnInit() {
			this.getRestaurantProfile()
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
						var dish = new Dish();
						dish = data['Dishes'][i];
						this.dishes.push(dish);
					}
					console.log(this.restaurant);
					console.log(this.dishes);
				},
	      // the second argument is a function which runs on error
	      err => console.error(err),
	      // the third argument is a function which runs on completion
	      () => console.log('done loading profile')
	    );
	  }

}
