import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { EntityBaseService } from '@services/base/entity-base.service';
import { User } from 'oidc-client';

@Injectable({ providedIn: 'root' })
export class OidcUserService extends EntityBaseService<User> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('OidcUser', serviceElementsFactory);
  }
}
