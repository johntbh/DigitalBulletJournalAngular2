import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { SortablejsModule } from 'angular-sortablejs';

import { AppComponent } from './app.component';
import { DailyLogComponent } from './dailylog.component';
import { MonthlyLogComponent } from './monthlylog.component';
import { FuturLogComponent } from './futurlog.component';
import { SearchEntryComponent } from './searchentry.component';
import { CollectionComponent } from './collection.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        SortablejsModule
    ],
  declarations: [
      AppComponent,
      DailyLogComponent,
      MonthlyLogComponent,
      FuturLogComponent,
      SearchEntryComponent,
      CollectionComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
