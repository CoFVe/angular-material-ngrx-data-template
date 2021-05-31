import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { TopnavModule } from '@components/topnav/topnav.module';
import { LoginModule } from '@/app/auth/login/login.module';

@NgModule({
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    FlexLayoutModule.withConfig({ addFlexToParent: true }),
    LoginModule,
    TopnavModule
  ],
  declarations: [LoginPageComponent]
})
export class LoginPageModule {}
