import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsersService } from '../repositories/users.service';

@Component({
    selector: 'account',
    templateUrl: './app/account/account.html',
    styleUrls: [
        './app/account/account.css',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap/node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
    ]
})
export class AccountComponent {
    years : number[];
    user: any;
    
    constructor(private route: ActivatedRoute,
        private router: Router,
        private userService: UsersService) { }

    ngOnInit() {
        this.user = {};
        this.years = Array(75).fill(0).map((x, i) => (new Date().getFullYear() - i));

        /*
        route params?
        */
    }

    add() {
        this.userService.add(this.user);
    }
}