import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Entry } from '../modele/entry';
import { Bullet } from '../modele/bullet';
import { Signifier } from '../modele/signifier';
import { SearchParameters } from '../modele/searchparameters';


@Injectable()
export class EntrySearchService {
    private entriesUrl = 'http://digitalbulletjournal.xyz/api/entry/search';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getEntries(parameters: SearchParameters): Promise<Entry[]> {
      const url = `${this.entriesUrl}/row`;
      return this.http
          .post(url, JSON.stringify(parameters), { headers: this.headers })
          .toPromise()
          .then(response => response.json() as Entry[])
          .catch(this.handleError);
    }

    getEntriesNumber(parameters: SearchParameters): Promise<number> {
      const url = `${this.entriesUrl}/number`;
      return this.http
          .post(url, JSON.stringify(parameters), { headers: this.headers })
          .toPromise()
          .then(response => {
            console.log(response.json());
            return response.json()[0].value as number;
          })
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
