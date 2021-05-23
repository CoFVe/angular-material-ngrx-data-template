import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ContainerPageModule } from '@views/base/container-page.module';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerService } from '@/app/components/loading-spinner/loading-spinner.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ContainerPageModule,
    RouterModule
  ],
  declarations: [ DashboardComponent ],
  providers: [ LoadingSpinnerService ]
})
export class DashboardModule { }
