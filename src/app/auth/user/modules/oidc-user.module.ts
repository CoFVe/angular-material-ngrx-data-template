import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OidcUserStoreModule } from './oidc-user-store.module';

@NgModule({
  imports: [
    CommonModule,
    OidcUserStoreModule
  ],
  declarations: [],
  providers: [

  ]
})
export class OidcUserModule { }
