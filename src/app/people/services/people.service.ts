import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory, EntityDataService } from '@ngrx/data';
import { PeopleModel } from '@/app/people/models/people.model';
import { EntityBaseService } from '../../common/services/base/entity-base.service';
import { PeopleAdapter } from '../modules/people-store.module';

@Injectable({ providedIn: 'root' })
export class PeopleService extends EntityBaseService<PeopleModel> {
  dataAdapter!: PeopleAdapter;

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, entityDataService: EntityDataService) {
    super('People', serviceElementsFactory, entityDataService);
  }

  doCustomAction(entity: PeopleModel | any, actionName: string){
    this.dataAdapter.executeCustomAction(entity,  actionName);
  }
}
