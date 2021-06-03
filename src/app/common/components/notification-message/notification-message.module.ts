import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationMessageComponent } from './notification-message.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [NotificationMessageComponent],
  exports: [NotificationMessageComponent],
  providers: [ { provide: MAT_SNACK_BAR_DATA, useValue: {} }],
})
export class NotificationMessageModule { }
