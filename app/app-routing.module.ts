import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DailyLogComponent } from './dailylog.component';
import { MonthlyLogComponent } from './monthlylog.component';
import { FuturLogComponent } from './futurlog.component';

const routes: Routes = [
    { path: 'dailylog', component: DailyLogComponent },
    { path: 'monthlylog', component: MonthlyLogComponent },
    { path: 'futurlog', component: FuturLogComponent },
    /*{ path: '', redirectTo: '/dailylog', pathMatch: 'full' }*/
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
