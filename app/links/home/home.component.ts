import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ProfileService} from '../profile/profile.service';
import { UserModel } from '../models/user_model';
import { Dish } from '../models/dish_model';


@Component({
	moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.css' ],
	providers: [ProfileService]
})

export class HomeComponent {
	user: UserModel;
	dishes = [];

	constructor(private router : Router, public profileService: ProfileService){


	};

	ngOnInit() {
		var user = JSON.parse(localStorage.getItem('currentUser'));
		this.profileService.setUser(user as UserModel);
		if (user) {
			this.user = this.profileService.getUser();
		}

		this.getDishes()
	}

	getDishes() {
		this.profileService.getTop5Dishes().subscribe(
			data => {
				for (var i = 0; i < data.length; i++) {
					var dish = new Dish();
					dish = data[i];
					this.dishes.push(dish);
				}

				console.log(this.dishes);
			},
			// the second argument is a function which runs on error
			err => console.error(err),
			// the third argument is a function which runs on completion
			() => console.log('done loading dishes')
		)
	}

	goTo(){
		this.router.navigate(['/login']);
		console.log("not working?");
	}
}
