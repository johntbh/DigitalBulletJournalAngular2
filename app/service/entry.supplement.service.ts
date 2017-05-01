import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Type } from '../modele/type';
import { Bullet } from '../modele/bullet';
import { Signifier } from '../modele/signifier';
import { SearchParameters } from '../modele/searchparameters';


@Injectable()
export class EntrySupplementService {
    private entriesUrl = 'http://digitalbulletjournal.xyz/api/entry/supplement';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

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

    getTypes(): Promise<Type[]> {
        const url = `${this.entriesUrl}/type`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Type[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
