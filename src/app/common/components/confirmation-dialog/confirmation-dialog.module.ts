import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule
  ],
  declarations: [ConfirmationDialogComponent],
  exports: [ConfirmationDialogComponent]
})
export class ConfirmationDialogModule { }
