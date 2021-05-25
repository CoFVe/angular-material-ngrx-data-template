import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {AuthGuard} from './auth.guard';
import {FlexLayoutModule} from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    LoginModule,
    RouterModule.forChild([{path: '', component: LoginComponent}]),
    TranslateModule
  ],
  declarations: [],
  exports: []
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthGuard
      ]
    }
  }
}
