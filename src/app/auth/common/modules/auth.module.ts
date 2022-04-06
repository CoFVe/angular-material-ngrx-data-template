import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {AuthGuard} from '../../../common/guard/auth.guard';
import {FlexLayoutModule} from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { LoginModule } from '../../login/component/login.module';
import { LoginComponent } from '../../login/component/login.component';


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
