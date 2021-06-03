import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { ContainerPageModule } from '../../components/container-page/container-page.module';
import { LoadingSpinnerService } from '@/app/common/components/loading-spinner/loading-spinner.service';

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
