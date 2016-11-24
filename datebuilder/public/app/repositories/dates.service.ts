import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DatesService {
    private _apiUrl = 'users';

    constructor(private http: Http){}

    /*

    AWAITING DATE ROUTE

    */
    get(date) : string {
        return '{ "businesses": [ "sewell-cadillac-of-dallas-dallas", "any-lab-test-now-dallas-dallas", "park-lane-allergy-and-asthma-center-dallas" ], "distances": [ 2.5, 3.4 ], "total_cost": 85.00, "name": "My Awesome Date", "total_time": 60, "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/_D1VLvf3VdvDJWddTIShFA/ms.jpg", "categories": [ ["category1", 12], ["category2", 8], ["category3", 4] ] }';
    }

}