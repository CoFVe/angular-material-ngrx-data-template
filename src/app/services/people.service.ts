import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { PeopleModel } from '@/app/models/people.model';
import { EntityBaseService } from './base/entity-base.service';

@Injectable({ providedIn: 'root' })
export class PeopleService extends EntityBaseService<PeopleModel> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('People', serviceElementsFactory);
  }
}
