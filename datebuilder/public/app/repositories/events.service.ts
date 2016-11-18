import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventsService {

    private _apiUrl = 'search';


    /*
           TO DO: 
       
           Pulling "event" metadate in search results will require a seperate 
               API call
           /search/:id=event-id will return all the data about an event
       */


    constructor(private http: Http) { }


    listEvents() : Promise<any> {
        console.log( this._apiUrl + '/load');
        return this.http.get(this._apiUrl + '/load')
		.toPromise()
		.then(x => x.json().data as any[]);
    }

    getEvent(id : number) : Promise<any> {
		var pluck = x => (x && x.length) ? x[0] : undefined;
		return this.http
			.get(`${this._apiUrl}/business/?id=${id}`)
			.toPromise()
			.then(x => pluck(x.json().data))
			.catch(x => alert(x.json().error));
	}

}