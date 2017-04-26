import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Entry } from './entry';
import { Bullet } from './bullet';
import { Signifier } from './signifier';
import { EntryService } from './entry.service';

@Component({
    selector: 'my-monthlylog',
    templateUrl: 'monthlylog.component.html',
    styleUrls: ['monthlylog.component.css'],
    moduleId: module.id,
    providers: [EntryService]
})

export class MonthlyLogComponent {

  month: String;
  entries_day: Entry[];
  entries_month: Entry[];

  bullets: Bullet[];
  signifiers: Signifier[];

  text_placeholder: String = "Texte de votre entrée";
  newEntryMonthly: Entry;
  timer: any;

  constructor(private EntryService: EntryService) { }

  ngOnInit(): void {
    this.month = (new Date()).toISOString().substr(0, 7)
    this.newEntryMonthly = new Entry();

    this.getEntries();
  }

  getEntries(): void{
    this.EntryService.getBullets().then(bullets => this.bullets = bullets);
    this.EntryService.getSignifers().then(signifiers => this.signifiers = signifiers);
    this.changeDate()
  }

  changeDate(): void{
    this.EntryService.getEntries_Date_Month(this.month)
      .then(entries_day => {
        this.entries_day = []

        var date = new Date(this.month.toString())
        date.setMonth(date.getMonth()+1)
        date.setDate(0)
        var max = date.getDate()

        for(let i = 0;i < max;i++) {
          var date_entry = new Entry()
          date_entry.date.setMonth(date.getMonth())
          date_entry.date.setDate(i+1)
          this.entries_day[i] = date_entry
        }

        for(let entry of entries_day) {
          var day = (new Date(entry.date)).getDate()
          this.entries_day[day-1] = entry
        }
      }
    );
    this.EntryService.getEntries_Monthly(this.month).then(entries_month => this.entries_month = entries_month);
  }

  nextMonth(event: any): void {
    event.preventDefault()
    var dateObj = new Date(this.month.toString())
    dateObj.setMonth(dateObj.getMonth()+2)

    this.month = dateObj.toISOString().substr(0, 7)
    this.changeDate()
  }

  previousMonth(event: any): void {
    event.preventDefault()
    var dateObj = new Date(this.month.toString())
    dateObj.setMonth(dateObj.getMonth()-1)

    this.month = dateObj.toISOString().substr(0, 7)
    this.changeDate()
  }

  addMonthEntry(entry: Entry) {
    entry.monthly = true
    this.EntryService.addEntry(entry).then(fullEntry => {
        var index = this.entries_day.indexOf(entry)
        this.entries_day[index] = fullEntry
    });
  }

  addMonthlyEntry() {
    this.newEntryMonthly.monthly = true;
    this.newEntryMonthly.futur = true;
    this.EntryService.addEntry(this.newEntryMonthly).then(fullEntry => {
        this.entries_month.push(fullEntry);
        this.newEntryMonthly = new Entry();
    });
  }

  updateEntry(entry: Entry) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.EntryService.updateEntry(entry), 500);
  }

  removeEntry(entry: Entry) {
      this.EntryService.deleteEntry(entry).then(() => {
          var index = this.entries_month.indexOf(entry);
          this.entries_month.splice(index, 1);
      });
  }

}
