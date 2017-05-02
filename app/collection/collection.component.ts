import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EntryCollection } from '../modele/entryCollection';
import { Collection } from '../modele/collection';
import { Bullet } from '../modele/bullet';
import { Signifier } from '../modele/signifier';

import { CollectionService } from '../service/collection.service';
import { EntryCollectionService } from '../service/entryCollection.service';
import { EntrySupplementService } from '../service/entry.supplement.service';

@Component({
    selector: 'my-collection',
    templateUrl: 'collection.component.html',
    styleUrls: ['../styles.css','collection.component.css'],
    moduleId: module.id,
    providers: [EntryCollectionService, CollectionService,EntrySupplementService]
})

export class CollectionComponent {

    //@ViewChild('sortable') listEntry: ElementRef;

    //nomCollection: String;
    entries: EntryCollection[];
    collections: Collection[];
    noCollection: number;
    collection: Collection;
    bullets: Bullet[];
    signifiers: Signifier[];
    text_placeholder: String = "Texte de votre entrée";
    newTextEntry: String;
    newBulletEntry: Number;
    newEntry: EntryCollection;
    newCollectionText: String = "Nom de votre collection";
    newCollection: Collection;
    timer: any;

    constructor(private EntryCollectionService: EntryCollectionService, private CollectionService: CollectionService, private EntrySupplementService: EntrySupplementService) { }

    ngOnInit(): void {
      this.CollectionService.getCollections_Collection()
        .then(collections => {
          this.collections = collections;
          this.collection = this.collections[0];
          this.getEntriesCollection();
        });
      /*while(typeof this.collections == 'undefined'){
        console.log("Toujours nulle");
      }*/

      this.noCollection = 0;
      this.newEntry = new EntryCollection();
      this.newCollection = new Collection();
    }

    getEntriesSupplement(): void {
      this.EntrySupplementService.getBullets().then(bullets => this.bullets = bullets);
      this.EntrySupplementService.getSignifers().then(signifiers => this.signifiers = signifiers);
    }

    getEntriesCollection(): void{
      this.getEntriesSupplement();
      this.EntryCollectionService.getEntriesCollection_idCollection(this.collection.idCollection).then(entries => this.entries = entries);
    }
/*
    getCollections(): void{
      this.EntryService.getCollections().then(collections => this.collections = collections);
    }
*/
/*
    changeDate(): void{
      this.EntryService.getEntries_Date_Day(this.date).then(entries => this.entries = entries);
    }
*/

    //Ajout Numan
    nextCollection(event: any): void {
      event.preventDefault()

      if(this.noCollection + 1 < this.collections.length){
        this.collection = this.collections[this.noCollection + 1];
        this.noCollection = this.noCollection + 1;
      }
      else{
        this.collection = this.collections[0];
        this.noCollection = 0;
      }

      //this.nomCollection = this.collection.nomCollection;
      this.EntryCollectionService.getEntriesCollection_idCollection(this.collection.idCollection).then(entries => this.entries = entries);
    }


    //Ajout Numan
    previousCollection(event: any): void {
      event.preventDefault()

      if(this.noCollection - 1 >= 0){
        this.collection = this.collections[this.noCollection - 1];
        this.noCollection = this.noCollection - 1;
      }
      else{
        this.collection = this.collections[this.collections.length - 1];
        this.noCollection = this.collections.length - 1;
      }

      //this.nomCollection = this.collection.nomCollection;
      this.EntryCollectionService.getEntriesCollection_idCollection(this.collection.idCollection).then(entries => this.entries = entries);
    }

    //Je garde le code à John mais je ne le comprend pas cette méthode donc à voir
    //addEntry(text: string) {
    addEntry() {
      this.newEntry.idCollection = this.collection.idCollection;
      console.log(this.newEntry.idCollection);
      this.EntryCollectionService.addEntryCollection(this.newEntry).then(fullEntry => {
          this.entries.push(fullEntry);
          this.newEntry = new EntryCollection();
      });
    }


    //A voir aussi
    updateEntry(entry: EntryCollection) {
      clearTimeout(this.timer);
      this.timer = setTimeout(
        () => {
          console.log(entry.text);
          this.EntryCollectionService.updateEntryCollection(entry);
      }, 500);
      console.log(this.bullets);
    }

    //A voir aussi
    removeEntry(entry: EntryCollection) {
        this.EntryCollectionService.deleteEntryCollection(entry).then(() => {
            var index = this.entries.indexOf(entry);
            this.entries.splice(index, 1);
        });
    }

    //Ajout nouvelle collection
    addCollection() {
      this.newCollection.nomCollection = this.newCollectionText;
      this.CollectionService.addCollection(this.newCollection).then(fullCollection => {
        this.collections.push(fullCollection);
        this.newCollection = new Collection();
        this.collection = this.collections[this.collections.length - 1];
        this.getEntriesCollection();
      });
    }

    updateCollection(collection: Collection) {
      clearTimeout(this.timer);
      this.timer = setTimeout(
        () => {
          console.log(collection.nomCollection);
          this.CollectionService.updateCollection(collection);
      }, 500);
      console.log(this.collection.nomCollection);
    }

    removeCollection(collection: Collection) {
      //this.nextCollection(event);
      this.CollectionService.deleteCollection(collection).then(() => {
          var index = this.collections.indexOf(collection);
          this.collections.splice(index, 1);
      });
    }

}
