import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ProfileService} from '../profile/profile.service';
import { UserModel } from '../models/user_model';
import { Dish } from '../models/dish_model';

@Component({
	moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ],
	providers: [ProfileService]
})

export class LoginComponent {
	public password = ""
	public email = ""
	public name = ""
	public city = ""
	public state = ""
	public address = ""
	public category = ""
	public user = true;
	public rest = false;

	constructor(private router : Router, public profileService: ProfileService){


	};

	ngOnInit() {
		var token = localStorage.getItem('currentUser');
		var isRest = localStorage.getItem('isRest');
		if (token) {
			this.router.navigate(['/']);
		}
	}

	login() {
		console.log('User: ', this.user);
		this.profileService.login(this.email, this.password).subscribe(
			data => {
				console.log(data);
				if (data[0].valid == "true") {
					localStorage.setItem('currentUser', data[0].session_id);
					if (this.user) {
							localStorage.setItem('isRest', "false");
					} else {
							localStorage.setItem('isRest', "true");
					}

					this.router.navigate(['/']);
				} else {
					alert('Wrong Email/password');
				}
			},
			// the second argument is a function which runs on error
			err => console.error(err),
			// the third argument is a function which runs on completion
			() => console.log('done loading dishes')
		)
	}

	createRestaurant() {
		let restaurant = {
			"email": this.email,
			"name": this.name,
			"city": this.city,
			"state_post_code": this.state,
			"category": this.category,
			"address": this.address
		}
		this.profileService.createRestaurant(restaurant, this.password).subscribe(
			data => {
				console.log(data);
				if (data[0].valid == "true") {
					localStorage.setItem('currentUser', data[0].session_id);
					if (this.user) {
							localStorage.setItem('isRest', "false");
					} else {
							localStorage.setItem('isRest', "true");
					}

					this.router.navigate(['/']);
				} else {
					alert('Uh Oh something went wrong');
				}
			},
			// the second argument is a function which runs on error
			err => console.error(err),
			// the third argument is a function which runs on completion
			() => console.log('done loading dishes')
		)
	}

	createUser() {
		let user = {
			"email": this.email,
			"username": this.name,
			"city": this.city,
			"state_post_code": this.state
		}
		this.profileService.createUser(user, this.password).subscribe(
			data => {
				console.log(data);
				if (data[0].valid == "true") {
					localStorage.setItem('currentUser', data[0].session_id);
					if (this.user) {
							localStorage.setItem('isRest', "false");
					} else {
							localStorage.setItem('isRest', "true");
					}

					this.router.navigate(['/']);
				} else {
					alert('Uh Oh something went wrong');
				}
			},
			// the second argument is a function which runs on error
			err => console.error(err),
			// the third argument is a function which runs on completion
			() => console.log('done loading dishes')
		)
	}

}

export class EditForm {
	editForm = new FormGroup({
		name: new FormControl()
	});


}
