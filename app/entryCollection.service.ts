import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { EntryCollection } from './entryCollection';
import { Collection } from './collection'; //Ajout Numan
import { Bullet } from './bullet';
import { Signifier } from './signifier';


@Injectable()
export class EntryCollectionService {
    private entriesUrl = 'http://digitalbulletjournal.xyz/api/entryCollection';  //Ajout Numan : URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    //Ajout Numan
    getEntriesCollection(): Promise<EntryCollection[]> {
      return this.http.get(this.entriesUrl)
          .toPromise()
          .then(response => response.json() as EntryCollection[])
          .catch(this.handleError);
    }

    //Ajout Numan
    getEntriesCollection_idCollection(idCollection: Number): Promise<EntryCollection[]> {
      const url = `${this.entriesUrl}/collection/idCollection/${idCollection}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json() as EntryCollection[])
          .catch(this.handleError);
    }

    //Ajout Numan
    /*getEntriesCollection_Collection(nomCollection: String): Promise<EntryCollection[]> {
      const url = `${this.entriesUrl}/collection/nomCollection/${nomCollection}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json() as EntryCollection[])
          .catch(this.handleError);
    }*/

    //Ajout Numan
    getEntriesCollection_Collection(collection: Collection): Promise<EntryCollection[]> {
      const url = `${this.entriesUrl}/collection/idCollection/${collection.idCollection}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json() as EntryCollection[])
          .catch(this.handleError);
    }

    getBullets(): Promise<Bullet[]> {
        const url = `${"http://digitalbulletjournal.xyz/api/entry"}/bullet`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Bullet[])
            .catch(this.handleError);
    }

    getSignifers(): Promise<Signifier[]> {
        const url = `${"http://digitalbulletjournal.xyz/api/entry"}/signifier`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Signifier[])
            .catch(this.handleError);
    }

    //Ajout Numan
    getEntryCollection(idEntryCollection: number): Promise<EntryCollection> {
        const url = `${this.entriesUrl}/id/${idEntryCollection}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as EntryCollection)
            .catch(this.handleError);
    }

    //Ajout Numan
    addEntryCollection(entryCollection: EntryCollection): Promise<EntryCollection> {
        return this.http
            .put(this.entriesUrl, JSON.stringify(entryCollection), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as EntryCollection)
            .catch(this.handleError);
    }

    //Ajout Numan
    deleteEntryCollection(entryCollection: EntryCollection): Promise<void> {
        const url = `${this.entriesUrl}/id/${entryCollection.id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    //Ajout Numan
    updateEntryCollection(entryCollection: EntryCollection): Promise<EntryCollection> {
        const url = `${this.entriesUrl}/id/${entryCollection.id}`;
        return this.http
            .post(url, JSON.stringify(entryCollection), { headers: this.headers })
            .toPromise()
            .then(() => entryCollection)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
