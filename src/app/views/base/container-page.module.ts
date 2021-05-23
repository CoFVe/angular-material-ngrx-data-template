import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TopnavModule } from '@components/topnav/topnav.module';
import { SidebarModule } from '@components/sidebar/sidebar.module';
import { ContainerPageComponent } from './container-page.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

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
