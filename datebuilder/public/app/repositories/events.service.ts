import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventsService {

    private _apiUrl = 'index.php/search';


    /*
           TO DO: 
       
           Pulling "event" metadate in search results will require a seperate 
               API call
           /search/:id=event-id will return all the data about an event
       */


    constructor(private http: Http) { }


    listEvents(): Promise<any> {
        return this.http.get(this._apiUrl + '/load')
            .toPromise()
            .then(x => x.json().data as any[]);
    }

    getEvent(id : string): Promise<any> {
        return this.http
            .get(`${this._apiUrl}/business/${id}`)
            .toPromise()
            .then(x => x['_body'] as any);
    }

    search(query : string): Promise<any> {
        return this.http
            .get(`${this._apiUrl}/search/${query}`)
            .toPromise()
            .then(x => x['_body'] as any);
    }

    load() : Promise<any> {
        return this.http
            .get(`${this._apiUrl}/load`)
            .toPromise()
            .then(x => x['_body'] as any);
    }

}