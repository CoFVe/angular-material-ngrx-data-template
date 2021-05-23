import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDeniedRoutingModule } from './access-denied-routing.module';
import { AccessDeniedComponent } from './access-denied.component';
import { MatIconModule } from '@angular/material/icon';
import { ContainerPageModule } from '../base/container-page.module';

@NgModule({
  imports: [
    CommonModule,
    AccessDeniedRoutingModule,
    MatIconModule,
    ContainerPageModule
  ],
  declarations: [AccessDeniedComponent]
})
export class AccessDeniedModule { }
