import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Entry } from '../modele/entry';
import { Type } from '../modele/type';
import { Bullet } from '../modele/bullet';
import { Signifier } from '../modele/signifier';


@Injectable()
export class EntryService {
    private entriesUrl = 'http://digitalbulletjournal.xyz/api/entry';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getEntry(id: number): Promise<Entry> {
        const url = `${this.entriesUrl}/id/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Entry)
            .catch(this.handleError);
    }

    updateEntry(entry: Entry): Promise<Entry> {
        return this.http
            .post(this.entriesUrl, JSON.stringify(entry), { headers: this.headers })
            .toPromise()
            .then(() => entry)
            .catch(this.handleError);
    }

    deleteEntry(entry: Entry): Promise<void> {
        const url = `${this.entriesUrl}/id/${entry.id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
