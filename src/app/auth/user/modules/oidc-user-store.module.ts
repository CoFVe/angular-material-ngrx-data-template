import { NgModule, Injectable } from '@angular/core';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { LocalStorageAdapter } from '@/app/common/adapters/local-storage.adapter';
import { User } from 'oidc-client';
import { oidceUserMetadata } from '../store/oidc-user.metadata';

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
    dataAdapter: OidcUserAdapter,
    eds: EntityDefinitionService
  ) {
    eds.registerMetadataMap(oidceUserMetadata);
    // Register custom EntityDataServices
    dataAdapter.name = 'OidcUser';
    dataAdapter.entityIdentifier = 'id_token';
    entityDataService.registerService('OidcUser', dataAdapter);
  }

}
