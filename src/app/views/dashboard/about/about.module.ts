import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
