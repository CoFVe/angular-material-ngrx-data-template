import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { LoginModule } from '@/app/auth/login/component/login.module';
import { TopnavModule } from '@/app/dashboard/components/topnav/topnav.module';

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
