import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DailyLogComponent } from './dailylog/dailylog.component';
import { MonthlyLogComponent } from './monthlylog/monthlylog.component';
import { FuturLogComponent } from './futurlog/futurlog.component';
import { SearchEntryComponent } from './searchentry/searchentry.component';
import { CollectionComponent } from './collection/collection.component';

const routes: Routes = [
    { path: 'dailylog', component: DailyLogComponent },
    { path: 'monthlylog', component: MonthlyLogComponent },
    { path: 'futurlog', component: FuturLogComponent },
    { path: 'search/:search', component: SearchEntryComponent },
    { path: 'collection', component: CollectionComponent },
    /*{ path: '', redirectTo: '/dailylog', pathMatch: 'full' }*/
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
