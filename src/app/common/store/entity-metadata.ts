import { EntityMetadataMap } from '@ngrx/data';
import { User } from 'oidc-client';

export function OidcUserSelectId(user: User) { return user.id_token }

const entityMetadata: EntityMetadataMap = {
  People: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true
    }
  },
  Departments: {
  },
  OidcUser: {
    selectId: OidcUserSelectId
  }
};

export const entityConfig = {
  entityMetadata
};
