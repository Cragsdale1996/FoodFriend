import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { ProfileService} from './profile.service';
import { UserModel } from './user_model';
import { Dish } from './dish_model';

@Component({
	moduleId: module.id,
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: [ 'profile.component.css' ],
	providers: [ProfileService]
})

export class ProfileComponent {
		user = new UserModel();
		dishes = [];

    constructor(private profileService: ProfileService) {}

		ngOnInit() {
			this.getProfile()
		}

		getProfile() {
	    this.profileService.getProfile().subscribe(
	      // the first argument is a function which runs on success
	      data => {
					this.user = data[0];
					for (var i = 0; i < data['Dishes'].length; i++) {
						var dish = new Dish();
						dish = data['Dishes'][i];
						this.dishes.push(dish);
					}

					console.log(this.dishes);
				},
	      // the second argument is a function which runs on error
	      err => console.error(err),
	      // the third argument is a function which runs on completion
	      () => console.log('done loading profile')
	    );
	  }

}
