import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
    private _apiUrl = 'users/';

    constructor(private http: Http){}

    /*
    get, add 
    */
    add(user) : Promise<any> {
        console.log(JSON.stringify(user));
        return this.http
            .post(this._apiUrl, JSON.stringify(user))
            .toPromise()
            .then(() => user)
            .catch(x => alert(x.json().error));
    }
}