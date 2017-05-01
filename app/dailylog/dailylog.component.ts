import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Entry } from '../modele/entry';
import { Bullet } from '../modele/bullet';
import { Signifier } from '../modele/signifier';

import { EntryDailyLogService } from '../service/entry.dailylog.service';
import { EntryService } from '../service/entry.service';
import { EntrySupplementService } from '../service/entry.supplement.service';

@Component({
    selector: 'my-dailylog',
    templateUrl: 'dailylog.component.html',
    styleUrls: ['dailylog.component.css'],
    moduleId: module.id,
    providers: [EntryDailyLogService,EntryService,EntrySupplementService]
})

export class DailyLogComponent {

    //@ViewChild('sortable') listEntry: ElementRef;

    date: String;
    entries: Entry[];
    bullets: Bullet[];
    signifiers: Signifier[];
    text_placeholder: String = "Texte de votre entrée";
    newTextEntry: String;
    newBulletEntry: Number;
    newEntry: Entry;
    timer: any;

    constructor(private EntryDailyLogService: EntryDailyLogService, private EntryService: EntryService, private EntrySupplementService: EntrySupplementService) { }

    ngOnInit(): void {
      this.date = (new Date()).toISOString().substr(0, 10)
      this.newEntry = new Entry();
      this.getEntriesSupplement();
      this.getEntries();
    }

    getEntries(): void{
      this.EntryDailyLogService.getEntries(new Date(this.date.toString())).then(entries => this.entries = entries);
    }

    getEntriesSupplement(): void {
      this.EntrySupplementService.getBullets().then(bullets => this.bullets = bullets);
      this.EntrySupplementService.getSignifers().then(signifiers => this.signifiers = signifiers);
    }

    changeDate(): void{
      this.EntryDailyLogService.getEntries(new Date(this.date.toString())).then(entries => this.entries = entries);
    }

    tomorrowLog(): void {
      event.preventDefault()
      this.changeLog(1);
      this.changeDate();
    }

    yesterdayLog(): void {
      event.preventDefault()
      this.changeLog(-1);
      this.changeDate();
    }

    changeLog(value: number): void {
      var dateObj = new Date(this.date.toString());
      dateObj.setDate(dateObj.getDate()+value);
      this.date = dateObj.toISOString().substr(0, 10);
    }

    addEntry() {
        this.EntryDailyLogService.addEntry(this.newEntry).then(fullEntry => {
            this.entries.push(fullEntry);
            this.newEntry = new Entry();
        });
    }

    updateEntry(entry: Entry) {
      clearTimeout(this.timer);
      this.timer = setTimeout(
        () => this.EntryService.updateEntry(entry), 500);
      console.log(this.bullets)
    }

    removeEntry(entry: Entry) {
        this.EntryService.deleteEntry(entry).then(() => {
            var index = this.entries.indexOf(entry);
            this.entries.splice(index, 1);
        });
    }
}
