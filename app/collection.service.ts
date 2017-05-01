import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Collection } from './collection'; //Ajout Numan


@Injectable()
export class CollectionService {
    private collectionsUrl = 'http://digitalbulletjournal.xyz/api/collection'; //Ajout Numan : URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }


    //Ajout Numan
    getCollections_Collection(): Promise<Collection[]> {
      return this.http.get(this.collectionsUrl)
          .toPromise()
          .then(response => response.json() as Collection[])
          .catch(this.handleError);
    }

    //Ajout Numan
    getCollection_Collection(idCollection: Number): Promise<Collection> {
        const url = `${this.collectionsUrl}/idCollection/${idCollection}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Collection)
            .catch(this.handleError);
    }

    //Modif Numan
    addCollection(collection: Collection): Promise<Collection> {
        return this.http
            .put(this.collectionsUrl, JSON.stringify(collection), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Collection)
            .catch(this.handleError);
    }

    //Modif Numan
    deleteCollection(collection: Collection): Promise<void> {
        const url = `${this.collectionsUrl}/idCollection/${collection.idCollection}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    //Modif Numan
    updateEntry(collection: Collection): Promise<Collection> {
        const url = `${this.collectionsUrl}/idCollection/${collection.idCollection}`;
        return this.http
            .post(url, JSON.stringify(collection), { headers: this.headers })
            .toPromise()
            .then(() => collection)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
