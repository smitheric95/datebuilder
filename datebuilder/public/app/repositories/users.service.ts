import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
    private _apiUrl = 'users';

    constructor(private http: Http){}

    add(user) : Promise<any> {
        return this.http
            .post(this._apiUrl, user)
            .toPromise()
            .then(() => user)
            .catch(x => alert(x.json().error));
    }

    logIn(user) : Promise<any> {
        return this.http
            .post(this._apiUrl + '/login', user)
            .toPromise()
            .then(() => user)
            .catch(x => alert(x.json().error));
    }

    get(id) : Promise<any> {
        return this.http
            .get(`/getuser/`)
            .toPromise()
            .then(x => x['_body'] as any);
    }

    update(user) : Promise<any> {
       return this.http
            .post(this._apiUrl + '/updatesettings', user)
            .toPromise()
            .then(() => user)
            .catch(x => alert(x.json().error));
    }
}

