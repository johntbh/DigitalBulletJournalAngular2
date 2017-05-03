import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Entry } from '../modele/entry';
import { Bullet } from '../modele/bullet';
import { Signifier } from '../modele/signifier';

import { EntryFuturLogService } from '../service/entry.futurlog.service';
import { EntryService } from '../service/entry.service';
import { EntrySupplementService } from '../service/entry.supplement.service';

@Component({
    selector: 'my-futurlog',
    templateUrl: 'futurlog.component.html',
    styleUrls: ['../styles.css','futurlog.component.css'],
    moduleId: module.id,
    providers: [EntryFuturLogService,EntryService,EntrySupplementService]
})

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

  constructor(private EntryFuturLogService: EntryFuturLogService, private EntryService: EntryService, private EntrySupplementService: EntrySupplementService) { }

  ngOnInit(): void {
    this.month_date = new Date()
    this.month = this.month_date.toISOString().substr(0, 7)
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
    this.EntryFuturLogService.getEntries(new Date(this.month.toString()))
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
    this.EntryFuturLogService.addEntry(this.entry_futur[index]).then(fullEntry => {
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
    date_entry.setMonth(date_entry.getMonth()+plus_month)
    date_entry.setDate(1)
    date_entry.setHours(12)
    newEntry.day = 1
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

  showDay(day: number): string {
    if(day<10) return '0'+day;
    return day.toString();
  }
}
