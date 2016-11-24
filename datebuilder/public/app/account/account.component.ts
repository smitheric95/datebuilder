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
    years: number[];
    user: any;
    dates: any;
    stats: any;
    isLoggedIn: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private usersService: UsersService) { }

    ngOnInit() {
        /*
            AWAITING USER ROUTE
        */
        this.isLoggedIn = true;
        this.user = {};
        this.user.id = 1;
        /******/


        this.user = { //defaults
            allow_loc_services: false
        }
        this.years = Array(75).fill(0).map((x, i) => (new Date().getFullYear() - i));

        this.getUser();
    }

    add() {
        if (this.user.allow_loc_services == true)
            this.user.allow_loc_services = "True";
        else if (this.user.allow_loc_services != "True")
            this.user.allow_loc_services = "False";

        this.user.age = new Date().getFullYear() - this.user.age;
        console.log(this.user);
        this.usersService.add(this.user)
            .then(() => this.returnToList());

    }

    private returnToList() {
        this.router.navigateByUrl('search')
            .then(() => {
                eval("$(function(){$('#createdAccountModal').modal('show')})");
            });
    }

    private getUser() {
        if (this.isLoggedIn) {
            this.usersService.get(this.user.id).then(x => {
                var temp = JSON.parse(x);
                console.log(temp);
                this.user = temp.user;
                this.dates = temp.dates;
                this.stats = temp.stats;

                console.log(this.user);
                console.log(this.dates);
                console.log(this.stats);
            });
        }
    }
}