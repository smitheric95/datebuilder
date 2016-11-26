import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DatesService {
    private _apiUrl = 'date';

    constructor(private http: Http) { }

    get(date): Promise<any> {
        return this.http
            .get(`editdate/${date}`)
            .toPromise()
            .then(x => x['_body'] as any);
    }

    build(date): Promise<any> {
        return this.http
            .post('/build/', date)
            .toPromise()
            .then(this.extractData);
    }

    private extractData(res: Response) {
        let body = res['_body'];
        return body || {};
    }

}