import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory, EntityDataService } from '@ngrx/data';
import { EntityBaseService } from '@/app/common/services/base/entity-base.service';
import { User } from 'oidc-client';

@Injectable({ providedIn: 'root' })
export class OidcUserService extends EntityBaseService<User> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, entityDataService: EntityDataService) {
    super('OidcUser', serviceElementsFactory, entityDataService);
  }
}
