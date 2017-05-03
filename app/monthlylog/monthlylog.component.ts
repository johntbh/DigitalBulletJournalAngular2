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
          date_entry.date.setFullYear(date.getFullYear())
          date_entry.date.setMonth(date.getMonth())
          date_entry.date.setDate(i+1)
          date_entry.date.setHours(date_entry.date.getHours()+2)
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
      this.EntryMonthlyLogService.addDailyEntry(entry).then(fullEntry => {
          var index = this.entries_day.indexOf(entry)
          this.entries_day[index] = fullEntry
      });
    }
  }

  checkAddMonthEntry(event: any, entry: Entry) {
    if(event.keyCode === 13) {
      this.addMonthEntry(entry);
    }
  }

  addMonthlyEntry() {
    if(this.newEntryMonthly.text.trim()) {
      var date = new Date(this.month.toString())
      this.newEntryMonthly.date.setFullYear(date.getFullYear())
      this.newEntryMonthly.date.setMonth(date.getMonth())
      this.newEntryMonthly.date.setDate(1)
      this.newEntryMonthly.date.setHours(12)
      this.newEntryMonthly.date.setMinutes(0)
      console.log(this.newEntryMonthly)
      this.EntryMonthlyLogService.addMonthlyEntry(this.newEntryMonthly).then(fullEntry => {
          this.entries_month.push(fullEntry);
          this.newEntryMonthly = new Entry();
      });
    }
  }

  checkAddMonthlyEntry(event: any) {
    if(event.keyCode === 13) {
      this.addMonthlyEntry();
    }
  }

  updateEntry(entry: Entry) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.EntryService.updateEntry(entry), 500);
  }

  removeMonthEntry(entry: Entry) {
      this.EntryService.deleteEntry(entry).then(() => {
          var index = this.entries_day.indexOf(entry);

          var date_entry = new Entry()
          var date = new Date(this.month.toString())
          date_entry.date.setMonth(date.getMonth())
          date_entry.date.setDate(index)
          console.log(date_entry.date)

          this.entries_day[index] = date_entry
      });
  }

  removeMonthlyEntry(entry: Entry) {
      this.EntryService.deleteEntry(entry).then(() => {
          var index = this.entries_month.indexOf(entry);
          this.entries_month.splice(index, 1);
      });
  }


}
