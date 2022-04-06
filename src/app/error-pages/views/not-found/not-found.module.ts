import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { ContainerPageModule } from '@/app/dashboard/components/container-page/container-page.module';

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    MatIconModule,
    ContainerPageModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
