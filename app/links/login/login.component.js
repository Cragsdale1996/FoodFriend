"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const profile_service_1 = require("../profile/profile.service");
let LoginComponent = class LoginComponent {
    constructor(router, profileService) {
        this.router = router;
        this.profileService = profileService;
        this.password = "";
        this.email = "";
        this.name = "";
        this.city = "";
        this.state = "";
        this.address = "";
        this.category = "";
        this.user = true;
        this.rest = false;
    }
    ;
    ngOnInit() {
        var token = localStorage.getItem('currentUser');
        var isRest = localStorage.getItem('isRest');
        if (token) {
            this.router.navigate(['/']);
        }
    }
    login() {
        console.log('User: ', this.user);
        this.profileService.login(this.email, this.password).subscribe(data => {
            console.log(data);
            if (data[0].valid == "true") {
                localStorage.setItem('currentUser', data[0].session_id);
                if (this.user) {
                    localStorage.setItem('isRest', "false");
                }
                else {
                    localStorage.setItem('isRest', "true");
                }
                this.router.navigate(['/']);
            }
            else {
                alert('Wrong Email/password');
            }
        }, 
        // the second argument is a function which runs on error
        err => console.error(err), 
        // the third argument is a function which runs on completion
        () => console.log('done loading dishes'));
    }
    createRestaurant() {
        let restaurant = {
            "email": this.email,
            "name": this.name,
            "city": this.city,
            "state_post_code": this.state,
            "category": this.category,
            "address": this.address
        };
        this.profileService.createRestaurant(restaurant, this.password).subscribe(data => {
            console.log(data);
            if (data[0].valid == "true") {
                localStorage.setItem('currentUser', data[0].session_id);
                if (this.user) {
                    localStorage.setItem('isRest', "false");
                }
                else {
                    localStorage.setItem('isRest', "true");
                }
                this.router.navigate(['/']);
            }
            else {
                alert('Uh Oh something went wrong');
            }
        }, 
        // the second argument is a function which runs on error
        err => console.error(err), 
        // the third argument is a function which runs on completion
        () => console.log('done loading dishes'));
    }
    createUser() {
        let user = {
            "email": this.email,
            "username": this.name,
            "city": this.city,
            "state_post_code": this.state
        };
        this.profileService.createUser(user, this.password).subscribe(data => {
            console.log(data);
            if (data[0].valid == "true") {
                localStorage.setItem('currentUser', data[0].session_id);
                if (this.user) {
                    localStorage.setItem('isRest', "false");
                }
                else {
                    localStorage.setItem('isRest', "true");
                }
                this.router.navigate(['/']);
            }
            else {
                alert('Uh Oh something went wrong');
            }
        }, 
        // the second argument is a function which runs on error
        err => console.error(err), 
        // the third argument is a function which runs on completion
        () => console.log('done loading dishes'));
    }
};
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login',
        templateUrl: 'login.component.html',
        styleUrls: ['login.component.css'],
        providers: [profile_service_1.ProfileService]
    }),
    __metadata("design:paramtypes", [router_1.Router, profile_service_1.ProfileService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
class EditForm {
    constructor() {
        this.editForm = new forms_1.FormGroup({
            name: new forms_1.FormControl()
        });
    }
}
exports.EditForm = EditForm;
//# sourceMappingURL=login.component.js.map