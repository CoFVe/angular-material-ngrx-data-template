import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {FormsModule} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

import {FlexLayoutModule} from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    TranslateModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule {
}
