import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Entry } from './entry';
import { Bullet } from './bullet';
import { Signifier } from './signifier';
import { EntryService } from './entry.service';

@Component({
    selector: 'my-dailylog',
    templateUrl: 'dailylog.component.html',
    styleUrls: ['dailylog.component.css'],
    moduleId: module.id,
    providers: [EntryService]
})

export class DailyLogComponent {

    @ViewChild('sortable') listEntry: ElementRef;

    date: String;
    entries: Entry[];
    bullets: Bullet[];
    signifiers: Signifier[];
    standard_bullet_task : Number = 1;
    text_placeholder: String = "Texte de votre entrée";
    newTextEntry: String;
    newBulletEntry: Number;
    newEntry: Entry;
    timer: any;

    constructor(private EntryService: EntryService) { }

    ngOnInit(): void {
      this.date = (new Date()).toISOString().substr(0, 10)
      this.newEntry = new Entry();
      

      this.getEntries();
    }

    getEntries(): void{
      this.EntryService.getEntries_Date(this.date).then(entries => this.entries = entries);
      this.EntryService.getBullets().then(bullets => this.bullets = bullets);
      this.EntryService.getSignifers().then(signifiers => this.signifiers = signifiers);
    }

    changeDate(): void{
      this.EntryService.getEntries_Date(this.date).then(entries => this.entries = entries);
    }

    addEntry(text: string) {
        this.EntryService.addEntry(this.newEntry).then(fullEntry => {
            this.entries.push(fullEntry);
            this.newEntry = new Entry();
        });
    }

    updateEntry(entry: Entry) {
      clearTimeout(this.timer);
      this.timer = setTimeout(
        () => {
          console.log(entry.text);
          this.EntryService.updateEntry(entry);
      }, 500);
      console.log(this.bullets)
    }

    removeEntry(entry: Entry) {
        this.EntryService.deleteEntry(entry).then(() => {
            var index = this.entries.indexOf(entry);
            this.entries.splice(index, 1);
        });
    }
}
