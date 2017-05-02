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
	dishes = [];
	token = "";

	constructor(private router : Router, public profileService: ProfileService){


	};

	ngOnInit() {
		this.token = localStorage.getItem('currentUser');
		var isRest = localStorage.getItem('isRest');
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

				console.log(data);
			},
			// the second argument is a function which runs on error
			err => console.error(err),
			// the third argument is a function which runs on completion
			() => console.log('done loading dishes')
		)
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
				this.getDishes()
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
				this.getDishes()
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
				this.getDishes()
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

}
