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
  newEntryMonth: Entry;
  timer: any;

  constructor(private EntryService: EntryService) { }

  ngOnInit(): void {
    this.month = (new Date()).toISOString().substr(0, 7)
    this.newEntryMonth = new Entry();

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

  tomorrowLog(event: any): void {
    event.preventDefault()
    var dateObj = new Date(this.date.toString())
    dateObj.setDate(dateObj.getDate()+1)

    this.date = dateObj.toISOString().substr(0, 10)
    this.EntryService.getEntries_Date(this.date).then(entries => this.entries = entries);
  }

  yesterdayLog(event: any): void {
    event.preventDefault()
    var dateObj = new Date(this.date.toString())
    dateObj.setDate(dateObj.getDate()-1)

    this.date = dateObj.toISOString().substr(0, 10)
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
