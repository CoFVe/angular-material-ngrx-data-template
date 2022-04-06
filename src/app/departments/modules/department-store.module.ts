import { Injectable, NgModule } from '@angular/core';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { HttpClientAdapter } from '@/app/common/adapters/http-client.adapter';
import { DepartmentModel } from '@/app/departments/models/department.model';
import { departmentsMetadata } from '../store/departments.metadata';

@Injectable()
export class DepartmentAdapter extends HttpClientAdapter<DepartmentModel>{ }

@NgModule({
  providers: [
    DepartmentAdapter
  ]
})
export class DepartmentStoreModule {
  constructor(entityDataService: EntityDataService, dataAdapter: DepartmentAdapter, eds: EntityDefinitionService) {
    eds.registerMetadataMap(departmentsMetadata);
    dataAdapter.name = 'Departments';
    entityDataService.registerService('Departments', dataAdapter);
  }
}
