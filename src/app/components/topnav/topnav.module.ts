import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TopnavComponent } from '@components/topnav/topnav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogoutModule } from '@app/auth/logout/logout.module';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    FlexLayoutModule,
    MatTooltipModule,
    LogoutModule,
    RouterModule
  ],
  declarations: [TopnavComponent],
  exports: [TopnavComponent]
})
export class TopnavModule { }
