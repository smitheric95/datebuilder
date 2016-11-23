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

    /*

    AWAITING USER ROUTE

    */
    get(user) : string {
        return '{ "user": { "name": "John", "email": "john@smith.com" "age": 22 "allow_loc_services": 1 }, "dates": [ { "businesses": [ "b_id1", "b_id2", "b_id3" ], "distances": [ 2.5, 3.4 ], "total_cost": 85.00, "name": "My Awesome Date", "total_time": 60, "image_url": "http://images.amcnetworks.com/ifc.com/wp-content/uploads/2014/02/nerd-dance.jpg", "categories": [ ["category1", 12], ["category2", 8], ["category3", 4] ] }, { "businesses": [ "b_id4", "b_id5", ], "distances": [ 5.5, ], "total_cost": 15.00, "name": "My Other Awesome Date", "total_time": 35, "image_url": "http://images.amcnetworks.com/ifc.com/wp-content/uploads/2014/02/nerd-dance.jpg", "categories": [ ["category4", 3], ["category5", 1] ] } ], "stats": { "categories": [ ["category1", 12], ["category2", 8], ["category3", 4], ["category4", 3], ["category5", 1] ], "total_time": 95, "average_time": 47.5, "average_cost": 50.00 } }';
    }
}

