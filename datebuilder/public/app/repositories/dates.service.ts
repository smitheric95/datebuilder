import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DatesService {
    private _apiUrl = '';

    constructor(private http: Http) { }

    get(date): Promise<any> {
        return this.http
            .get(this._apiUrl + `editdate/${date}`)
            .toPromise()
            .then(x => x['_body'] as any);
    }

    build(date): Promise<any> {
        return this.http
            .post(this._apiUrl + '/build/', date)
            .toPromise()
            .then(this.extractData);
    }

    delete(date): Promise<any> {
        return this.http
            .post(this._apiUrl + '/deletedate', date)
            .toPromise()
            .then(() => date)
            .catch(x => alert(x.json().error));
    }

    private extractData(res: Response) {
        let body = res['_body'];
        return body || {};
    }

}