import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Entry } from './entry';
import { Bullet } from './bullet';
import { Signifier } from './signifier';
import { EntryService } from './entry.service';

@Component({
    selector: 'my-futurlog',
    templateUrl: 'futurlog.component.html',
    styleUrls: ['futurlog.component.css'],
    moduleId: module.id,
    providers: [EntryService]
})


// TODO: show first day not used for new entry in each month_name

// TODO: disable or remove the day already used in each month

// TODO: add a search engine with parameter

// TODO: add a collection page

// TODO: add personalized signifier and bullet

// TODO: WARNING = integrate ANGULAR2 on VPS
// TODO: WARNING = integrate user/login external code

export class FuturLogComponent {

  month: String;
  month_date: Date;
  entries_futur: Entry[][];
  entry_futur: Entry[];
  futur_month_number: Number = 6;
  month_side_number: Number = 3;

  month_name = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  bullets: Bullet[];
  signifiers: Signifier[];

  text_placeholder: String = "Texte de votre entrée";
  timer: any;
  num_left: number[] = [0,1,2];
  num_right: number[] = [3,4,5];

  constructor(private EntryService: EntryService) { }

  ngOnInit(): void {
    this.month_date = new Date()
    this.month = this.month_date.toISOString().substr(0, 7)
    this.getEntries();
  }

  getEntries(): void{
    this.EntryService.getBullets().then(bullets => this.bullets = bullets);
    this.EntryService.getSignifers().then(signifiers => this.signifiers = signifiers);
    this.changeDate()
  }

  changeDate(): void{
    this.EntryService.getEntries_Futur(this.month)
      .then(entries_futur => {
        this.entries_futur = []
        this.entry_futur = []
        for(let i=0;i<this.futur_month_number;i++){
          this.entries_futur.push([])
          this.entry_futur.push(this.getNewEntryWithDateInMonth(i))
          console.log(this.entry_futur)
        }

        var month_year = this.getMonthYearFromDate(this.month_date)
        for(let entry of entries_futur){
          var month_year_entry = this.getMonthYearFromDate(entry.date)
          var index = month_year_entry - month_year
          this.entries_futur[index].push(entry)
        }
        console.log(this.entries_futur)
      });
  }

  nextFutur(event: any): void {
    event.preventDefault()
    this.month_date.setMonth(this.month_date.getMonth()+6)
    this.month = this.month_date.toISOString().substr(0, 7)
    this.changeDate()
  }

  previousFutur(event: any): void {
    event.preventDefault()
    this.month_date.setMonth(this.month_date.getMonth()-6)
    this.month = this.month_date.toISOString().substr(0, 7)
    this.changeDate()
  }

  addFuturEntry(index: number) {
    this.entry_futur[index].date.setDate(this.entry_futur[index].day.valueOf())
    this.entry_futur[index].futur = true
    this.EntryService.addEntry(this.entry_futur[index]).then(fullEntry => {
      this.entries_futur[index].push(fullEntry)
      this.entry_futur[index] = this.getNewEntryWithDateInMonth(index)
    });
  }

  updateEntry(entry: Entry) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.EntryService.updateEntry(entry), 500);
  }

  removeEntry(entry: Entry, index: number) {
      this.EntryService.deleteEntry(entry).then(() => {
          var index_array = this.entries_futur[index].indexOf(entry);
          this.entries_futur[index].splice(index, 1);
      });
  }

  getArrayMonthNumber(order: number): number[]{
    var startArray = order*this.month_side_number.valueOf()
    var array: number[] = []
    for(let i=0;i<this.month_side_number;i++){
      array.push(startArray+i)
    }
    return array
  }

  getNewEntryWithDateInMonth(plus_month: number): Entry {
    var newEntry = new Entry();
    var date_entry = new Date(this.month_date)
    console.log(plus_month)
    console.log(date_entry)
    date_entry.setMonth(date_entry.getMonth()+plus_month)
    console.log(date_entry)
    newEntry.date = date_entry
    return newEntry
  }

  getMonthYearFromDate(date_input: Date): number {
    var date = new Date(date_input)
    return (date.getMonth()+1) + date.getFullYear()
  }

  getDayInMonth(month: number): number[] {
    var days: number[] = []
    for(let i=0;i<this.month_days[month];i++) {
      days.push(i+1)
    }
    return days
  }
  ////// Cosmetic function

  getStartMonthYear(): string {
    let date_string = this.month_name[this.month_date.getMonth()]
    date_string += ' '+this.month_date.getFullYear()
    return date_string
  }

  getEndMonthYear(): string {
    let date = new Date(this.month_date)
    date.setMonth(date.getMonth()+6)

    let date_string = this.month_name[date.getMonth()]
    date_string += ' '+date.getFullYear()
    return date_string
  }

  getMonthYear(month: number): string {
    let date = new Date(this.month_date)
    date.setMonth(date.getMonth()+month)

    let date_string = this.month_name[date.getMonth()]
    date_string += ' '+date.getFullYear()
    return date_string
  }
}
