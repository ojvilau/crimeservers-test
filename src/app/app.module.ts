import { CrimeserversService } from './services/crimeservers.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrimeserversListComponent } from './crimeservers-list/crimeservers-list.component';
import { CrimeserverDetailsComponent } from './crimeserver-details/crimeserver-details.component';
import { WidgetComponent } from './dashboard/widget/widget.component';
import { DashboardService } from './services/dashboard.service';
import { HttpModule } from '@angular/http';
import { PaginationComponent } from './shared/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CrimeserversListComponent,
    CrimeserverDetailsComponent,
    WidgetComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'dashboard', component: DashboardComponent},
      { path: 'crimeservers', component: CrimeserversListComponent},
      { path: 'crimeservers/:id', component: CrimeserverDetailsComponent},
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ]),
    ChartsModule,
    NgCircleProgressModule.forRoot()
  ],
  providers: [DashboardService, CrimeserversService],
  bootstrap: [AppComponent]
})
export class AppModule { }
