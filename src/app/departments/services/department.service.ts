import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory, EntityDataService } from '@ngrx/data';
import { DepartmentModel } from '@/app/departments/models/department.model';
import { EntityBaseService } from '../../common/services/base/entity-base.service';

@Injectable({ providedIn: 'root' })
export class DepartmentService extends EntityBaseService<DepartmentModel> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, entityDataService: EntityDataService) {
    super('Departments', serviceElementsFactory, entityDataService);
  }
}
