import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Entry } from '../modele/entry';
import { Bullet } from '../modele/bullet';
import { Signifier } from '../modele/signifier';

import { EntryMonthlyLogService } from '../service/entry.monthlylog.service';
import { EntryService } from '../service/entry.service';
import { EntrySupplementService } from '../service/entry.supplement.service';

@Component({
    selector: 'my-monthlylog',
    templateUrl: 'monthlylog.component.html',
    styleUrls: ['../styles.css','monthlylog.component.css'],
    moduleId: module.id,
    providers: [EntryMonthlyLogService,EntryService,EntrySupplementService]
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

  constructor(private EntryMonthlyLogService: EntryMonthlyLogService, private EntryService: EntryService, private EntrySupplementService: EntrySupplementService) { }

  ngOnInit(): void {
    this.month = (new Date()).toISOString().substr(0, 7)
    this.newEntryMonthly = new Entry();

    this.getEntriesSupplement();
    this.getEntries();
  }

  getEntries(): void{
    this.changeDate()
  }

  getEntriesSupplement(): void {
    this.EntrySupplementService.getBullets().then(bullets => this.bullets = bullets);
    this.EntrySupplementService.getSignifers().then(signifiers => this.signifiers = signifiers);
  }

  changeDate(): void{
    this.EntryMonthlyLogService.getDailyEntries(new Date(this.month.toString()))
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
    this.EntryMonthlyLogService.getMonthlyEntries(new Date(this.month.toString())).then(entries_month => this.entries_month = entries_month);
  }

  nextMonth(event: any): void {
    event.preventDefault()
    var dateObj = new Date(this.month.toString())
    dateObj.setMonth(dateObj.getMonth()+1)
    this.month = dateObj.getFullYear()+'-'+('0'+(dateObj.getMonth()+1)).slice(-2)
    this.changeDate()
  }

  previousMonth(event: any): void {
    event.preventDefault()
    var dateObj = new Date(this.month.toString())
    dateObj.setMonth(dateObj.getMonth()-1)
    this.month = dateObj.getFullYear()+'-'+('0'+(dateObj.getMonth()+1)).slice(-2)
    this.changeDate()
  }

  addMonthEntry(entry: Entry) {
    if(entry.text.trim()) {
      entry.monthly = true
      this.EntryMonthlyLogService.addDailyEntry(entry).then(fullEntry => {
          var index = this.entries_day.indexOf(entry)
          this.entries_day[index] = fullEntry
      });
    }
  }

  addMonthlyEntry() {
    if(this.newEntryMonthly.text.trim()) {
      this.newEntryMonthly.monthly = true;
      this.newEntryMonthly.futur = true;
      this.EntryMonthlyLogService.addMonthlyEntry(this.newEntryMonthly).then(fullEntry => {
          this.entries_month.push(fullEntry);
          this.newEntryMonthly = new Entry();
      });
    }
  }

  updateEntry(entry: Entry) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.EntryService.updateEntry(entry), 500);
  }

  removeEntry(entry: Entry, entries: Entry[]) {
      this.EntryService.deleteEntry(entry).then(() => {
          var index = entries.indexOf(entry);
          entries.splice(index, 1);
      });
  }

}
