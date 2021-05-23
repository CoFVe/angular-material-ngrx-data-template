import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { AuthModule } from '@app/auth/auth.module';
import { TopnavModule } from '@components/topnav/topnav.module';

@NgModule({
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    FlexLayoutModule.withConfig({ addFlexToParent: true }),
    AuthModule,
    TopnavModule
  ],
  declarations: [LoginPageComponent]
})
export class LoginPageModule {}
