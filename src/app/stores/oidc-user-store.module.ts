import { NgModule, Injectable } from '@angular/core';
import { EntityDataService } from '@ngrx/data';
import { LocalStorageAdapter } from '@adapters/local-storage.adapter';
import { User } from 'oidc-client';

@Injectable()
export class OidcUserAdapter extends LocalStorageAdapter<User>{ }

@NgModule({
  providers: [
    OidcUserAdapter
  ]
})
export class OidcUserStoreModule {
  constructor(
    entityDataService: EntityDataService,
    dataAdapter: OidcUserAdapter
  ) {
    // Register custom EntityDataServices
    dataAdapter.name = 'OidcUser';
    dataAdapter.entityIdentifier = 'id_token';
    entityDataService.registerService('OidcUser', dataAdapter);
  }

}
