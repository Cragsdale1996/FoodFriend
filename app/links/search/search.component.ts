import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ProfileService} from '../profile/profile.service';
import { UserModel } from '../models/user_model';
import { Dish } from '../models/dish_model';


@Component({
	moduleId: module.id,
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: [ 'search.component.css' ],
	providers: [ProfileService]
})

export class SearchComponent {
	user: UserModel;
	restaurants = [];
  term = ""

	constructor(private router : Router, public profileService: ProfileService){


	};

	ngOnInit() {

	}

  viewRestaurant(rest_id) {
    localStorage.setItem('restId', rest_id)
    this.router.navigate(['restaurant'])
  }

  search(term) {
	 this.profileService.search(term).subscribe(
		 data => {
			 console.log(data);
       this.restaurants = [];
       if (data) {
        for (var i = 0; i < data.length; i++) {
					var restaurant = {
            "name": data[i].name,
            "rest_id":data[i].rest_id
          }

					this.restaurants.push(restaurant);
				}

				console.log(this.restaurants);
       }
		 },
		 // the second argument is a function which runs on error
		 err => console.error(err),
		 // the third argument is a function which runs on completion
		 () => console.log('done loading dishes')
	 )
 	}
}
