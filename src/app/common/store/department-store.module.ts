import { Injectable, NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';
import { HttpClientAdapter } from '@/app/common/adapters/http-client.adapter';
import { DepartmentModel } from '@/app/departments/models/department.model';

@Injectable()
export class DepartmentAdapter extends HttpClientAdapter<DepartmentModel>{ }

@NgModule({
  providers: [
    DepartmentAdapter
  ]
})
export class DepartmentStoreModule {
  constructor(entityDataService: EntityDataService, dataAdapter: DepartmentAdapter) {
    dataAdapter.name = 'Departments';
    entityDataService.registerService('Departments', dataAdapter);
  }
}
