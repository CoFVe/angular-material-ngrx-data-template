import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { DepartmentModel } from '@models/department.model';
import { EntityBaseService } from './base/entity-base.service';

@Injectable({ providedIn: 'root' })
export class DepartmentService extends EntityBaseService<DepartmentModel> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Departments', serviceElementsFactory);
  }
}
