import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharesModule } from '../shares/shares.module';
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
  declarations: [DashboardComponent, ProgressComponent, Graficas1Component, PagesComponent],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [SharesModule, PAGES_ROUTES]
})
export class PagesModule {}
