import { Component } from '@angular/core';
import { UserModel } from './links/models/user_model';
import { ProfileService } from './links/profile/profile.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app',
  templateUrl: './app/app.html',
  styleUrls: [ './app/app.css' ],
  providers: [ProfileService]
})



export class AppComponent {
  public username = "Erik Gabrielsen"
  user: UserModel;

  constructor(public router: Router, public profileService: ProfileService){


	};

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    this.profileService.setUser(user as UserModel);
    if (user) {
      this.user = this.profileService.getUser();
    }
  }



}
