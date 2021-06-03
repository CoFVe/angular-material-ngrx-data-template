import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { ProfilePickerComponent } from './profile-picker.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule
  ],
  declarations: [ProfilePickerComponent],
  exports: [ProfilePickerComponent]
})
export class ProfilePickerModule { }
