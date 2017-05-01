import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Entry } from './entry';
import { Type } from './type';
import { Bullet } from './bullet';
import { Signifier } from './signifier';
import { SearchParameters } from './searchparameters';

import { EntryService } from './entry.service';
import { SearchEntryService } from './searchentry.service';

@Component({
    selector: 'my-searchentry',
    templateUrl: 'searchentry.component.html',
    styleUrls: ['searchentry.component.css'],
    moduleId: module.id,
    providers: [EntryService, SearchEntryService]
})

export class SearchEntryComponent {

    //@ViewChild('sortable') listEntry: ElementRef;

    entries: Entry[];
    types: Type[];
    bullets: Bullet[];
    signifiers: Signifier[];
    search: SearchParameters;
    dateStartString: String;
    dateEndString: String;
    timer: any;

    constructor(private EntryService: EntryService, private SearchEntryService: SearchEntryService) { }

    ngOnInit(): void {
      this.EntryService.getBullets().then(bullets => this.bullets = bullets);
      this.EntryService.getSignifers().then(signifiers => this.signifiers = signifiers);
      this.EntryService.getTypes().then(types => this.types = types);

      this.search = new SearchParameters();
    }

    getSearchEntries(): void{
      if(!this.search.isEmpty()) {
        this.SearchEntryService.getSearchEntriesNumber(this.search).then(entriesNumber => this.search.maxRows = entriesNumber)
        this.SearchEntryService.getSearchEntries(this.search).then(entries => this.entries = entries);
      }
      else {
        this.entries = [];
        this.search.maxRows = 1;
      }
    }

    updateSearchEntryText() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.getSearchEntries(), 500);
    }

    updateSearchEntryDate() {
      if(this.dateStartString && this.dateEndString) {
        var dateStart = new Date(this.dateStartString.toString())
        var dateEnd = new Date(this.dateEndString.toString())

        if(dateStart > dateEnd) alert('Erreur: Date de début supérieure à date de fin.') // TODO: Find a better way to show error
        else {
          this.search.dateStart = dateStart
          this.search.dateEnd = dateEnd
          this.getSearchEntries()
        }
      }
    }

    updateEntry(entry: Entry) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.EntryService.updateEntry(entry), 500);
    }

    removeEntry(entry: Entry) {
        this.EntryService.deleteEntry(entry).then(() => {
            var index = this.entries.indexOf(entry);
            this.entries.splice(index, 1);
        });
    }


    /////test

    addRemoveSignifierParameter(event: any, signifier: Signifier,input: boolean): boolean {
      event.stopPropagation();
      event.target.blur()

      var index = this.search.signifiers.indexOf(signifier.id)
      if(index > -1) {
        signifier.selected = false
        this.search.signifiers.splice( index, 1 );
      }
      else {
        signifier.selected = true
        this.search.signifiers.push(signifier.id);
      }

      this.getSearchEntries()

      return input;
    }

    addRemoveBulletParameter(event: any, bullet: Bullet, input: boolean): boolean {
      event.stopPropagation();
      event.target.blur()

      var index = this.search.bullets.indexOf(bullet.id)
      if(index > -1) {
        bullet.selected = false
        this.search.bullets.splice( index, 1 );
      }
      else {
        bullet.selected = true
        this.search.bullets.push(bullet.id);
      }

      this.getSearchEntries()

      return input;
    }

    addRemoveTypeParameter(event: any, type: Type, input: boolean): boolean {
      event.stopPropagation();
      event.target.blur()

      var index = this.search.types.indexOf(type.id)
      if(index > -1) {
        type.selected = false
        this.search.types.splice( index, 1 );
      }
      else {
        type.selected = true
        this.search.types.push(type.id);
      }

      this.getSearchEntries()

      return input;
    }

    changeRow(event: any, row: Number): void {
      event.preventDefault();
      this.search.rowsOnPage = row;
      this.search.refreshPage();
      this.getSearchEntries()

    }

    previousPage(): void {
      event.preventDefault();
      if(this.search.getPage()!==1) this.search.page--;
      this.getSearchEntries()

    }

    nextPage(): void {
      event.preventDefault();
      if(this.search.getPage()!==this.search.getMaxPage()) this.search.page++;
      console.log(this.search.maxRows)
      console.log(this.search.getMaxPage())
      this.getSearchEntries()
    }

    setPage(page: number): void {
      event.preventDefault();
      this.search.page=page
      this.getSearchEntries()
    }

    doNothing(): void {
      event.preventDefault()
    }
}
