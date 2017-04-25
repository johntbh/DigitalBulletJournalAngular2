import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Entry } from './entry';
import { Bullet } from './bullet';
import { Signifier } from './signifier';


@Injectable()
export class EntryService {
    private entriesUrl = 'http://digitalbulletjournal.xyz/api/entry';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getEntries(): Promise<Entry[]> {
      return this.http.get(this.entriesUrl)
          .toPromise()
          .then(response => response.json() as Entry[])
          .catch(this.handleError);
    }

    getEntries_Date(date: String): Promise<Entry[]> {
      const url = `${this.entriesUrl}/date/${date}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json() as Entry[])
          .catch(this.handleError);
    }

    getBullets(): Promise<Bullet[]> {
        const url = `${this.entriesUrl}/bullet`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Bullet[])
            .catch(this.handleError);
    }

    getSignifers(): Promise<Signifier[]> {
        const url = `${this.entriesUrl}/signifier`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Signifier[])
            .catch(this.handleError);
    }

    getEntry(id: number): Promise<Entry> {
        const url = `${this.entriesUrl}/id/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Entry)
            .catch(this.handleError);
    }

    addEntry(entry: Entry): Promise<Entry> {
        return this.http
            .put(this.entriesUrl, JSON.stringify(entry), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Entry)
            .catch(this.handleError);
    }

    deleteEntry(entry: Entry): Promise<void> {
        const url = `${this.entriesUrl}/${entry.id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    updateEntry(entry: Entry): Promise<Entry> {
        const url = `${this.entriesUrl}/id/${entry.id}`;
        return this.http
            .post(url, JSON.stringify(entry), { headers: this.headers })
            .toPromise()
            .then(() => entry)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
