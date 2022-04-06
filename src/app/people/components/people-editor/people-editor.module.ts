import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PeopleEditorComponent } from './people-editor.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    NgxPermissionsModule
  ],
  declarations: [PeopleEditorComponent],
  exports: [PeopleEditorComponent]
})
export class PeopleEditorModule { }
