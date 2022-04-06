import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarModule } from '@/app/dashboard/components/sidebar/sidebar.module';
import { ContainerPageComponent } from './container-page.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TopnavModule } from '@/app/dashboard/components/topnav/topnav.module';

@NgModule({
  imports: [
    CommonModule,
    TopnavModule,
    SidebarModule,
    MatListModule,
    RouterModule,
    FlexLayoutModule.withConfig({ addFlexToParent: true })
  ],
  declarations: [ContainerPageComponent],
  exports: [
    ContainerPageComponent
  ]
})
export class ContainerPageModule { }
