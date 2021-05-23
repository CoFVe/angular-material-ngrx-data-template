import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerErrorRoutingModule } from './server-error-routing.module';
import { ServerErrorComponent } from './server-error.component';
import { MatIconModule } from '@angular/material/icon';
import { ContainerPageModule } from '@views/base/container-page.module';

@NgModule({
  imports: [
    CommonModule,
    ServerErrorRoutingModule,
    MatIconModule,
    ContainerPageModule
  ],
  declarations: [ServerErrorComponent]
})
export class ServerErrorModule { }
