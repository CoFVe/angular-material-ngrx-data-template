import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LogoutComponent } from './logout.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    MatTooltipModule
  ],
  declarations: [LogoutComponent],
  exports: [LogoutComponent]
})
export class LogoutModule {}
