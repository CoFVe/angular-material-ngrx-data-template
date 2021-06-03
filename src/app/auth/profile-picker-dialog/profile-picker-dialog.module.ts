import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfilePickerDialogComponent } from './profile-picker-dialog.component';
import { ProfilePickerModule } from '../profile-picker/profile-picker.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    ProfilePickerModule,
    MatToolbarModule
  ],
  declarations: [ProfilePickerDialogComponent],
  exports: [ProfilePickerDialogComponent]
})
export class ProfilePickerDialogModule { }
