import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Entry } from '../modele/entry';
import { Type } from '../modele/type';
import { Bullet } from '../modele/bullet';
import { Signifier } from '../modele/signifier';


@Injectable()
export class EntryFuturLogService {
    private entriesUrl = 'http://digitalbulletjournal.xyz/api/entry/futur';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getEntries(date: Date): Promise<Entry[]> {
      var dateString = date.toISOString().substr(0, 7);
      const url = `${this.entriesUrl}/${dateString}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json() as Entry[])
          .catch(this.handleError);
    }

    addEntry(entry: Entry): Promise<Entry> {
        return this.http
            .put(this.entriesUrl, JSON.stringify(entry), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Entry)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
