import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Entry } from '../modele/entry';
import { Type } from '../modele/type';
import { Bullet } from '../modele/bullet';
import { Signifier } from '../modele/signifier';


@Injectable()
export class EntryMonthlyLogService {
    private entriesUrl = 'http://digitalbulletjournal.xyz/api/entry/monthly';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getDailyEntries(date: Date): Promise<Entry[]> {
      var dateString = date.toISOString().substr(0, 7);
      const url = `${this.entriesUrl}/daily/${dateString}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json() as Entry[])
          .catch(this.handleError);
    }

    getMonthlyEntries(date: Date): Promise<Entry[]> {
      var dateString = date.toISOString().substr(0, 7);
      const url = `${this.entriesUrl}/monthly/${dateString}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json() as Entry[])
          .catch(this.handleError);
    }

    addDailyEntry(entry: Entry): Promise<Entry> {
      const url = `${this.entriesUrl}/daily`;
        return this.http
            .put(url, JSON.stringify(entry), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Entry)
            .catch(this.handleError);
    }

    addMonthlyEntry(entry: Entry): Promise<Entry> {
      const url = `${this.entriesUrl}/monthly`;
        return this.http
            .put(url, JSON.stringify(entry), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Entry)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
