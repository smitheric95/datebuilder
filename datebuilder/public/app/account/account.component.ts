import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsersService } from '../repositories/users.service';

@Component({
    selector: 'account',
    templateUrl: './app/account/account.html',
    styleUrls: [
        './app/account/account.css',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
    ]
})
export class AccountComponent {
    years : number[];
    user: any;
    
    constructor(private route: ActivatedRoute,
        private router: Router,
        private userService: UsersService) { }

    ngOnInit() {
        this.user = { //defaults
            "allow_loc_services" : "False"
        }
        this.years = Array(75).fill(0).map((x, i) => (new Date().getFullYear() - i));
    }

    add() {
        if(this.user.allow_loc_services == true)
            this.user.allow_loc_services = "True";
        else
            this.user.allow_loc_services = "False";

        this.user.age = new Date().getFullYear() - this.user.age;

        this.userService.add(this.user);
            //.then(() => this.returnToList(`Welcome to DateBuilder, ${this.user.name}!`));
    }


    private returnToList(message){
		this.router.navigateByUrl('search')
			.then(() => alert(message));
	}
}