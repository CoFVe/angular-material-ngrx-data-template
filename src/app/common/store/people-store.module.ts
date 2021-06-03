import { Injectable, NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';
import { HttpClientAdapter } from '@/app/common/adapters/http-client.adapter';
import { PeopleModel } from '@/app/people/models/people.model';

@Injectable()
export class PeopleAdapter extends HttpClientAdapter<PeopleModel>{ }

@NgModule({
  providers: [
    PeopleAdapter
  ]
})
export class PeopleStoreModule {
  constructor(entityDataService: EntityDataService, dataAdapter: PeopleAdapter) {
    dataAdapter.name = 'People';
    entityDataService.registerService('People', dataAdapter);
  }
}
