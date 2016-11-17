import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsersService } from '../repositories/users.service';

@Component({
    selector: 'login',
    templateUrl: './app/login/login.html',
    styleUrls: [
        './app/login/login.css',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
    ]
})
export class LoginComponent {
    user: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private userService: UsersService) { }

    ngOnInit() {
        this.user = {};
    }

    logIn() {
        console.log(this.user);
        this.userService.logIn(this.user);
    }
}