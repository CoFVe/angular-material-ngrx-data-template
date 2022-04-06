import { Injectable, NgModule } from '@angular/core';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { HttpClientAdapter } from '@/app/common/adapters/http-client.adapter';
import { PeopleModel } from '@/app/people/models/people.model';
import { peopleMetadata } from '../store/people.metadata';

@Injectable()
export class PeopleAdapter extends HttpClientAdapter<PeopleModel>{ }

@NgModule({
  providers: [
    PeopleAdapter
  ]
})
export class PeopleStoreModule {
  constructor(entityDataService: EntityDataService, dataAdapter: PeopleAdapter, eds: EntityDefinitionService) {
    eds.registerMetadataMap(peopleMetadata);
    dataAdapter.name = 'People';
    entityDataService.registerService('People', dataAdapter);
  }
}
