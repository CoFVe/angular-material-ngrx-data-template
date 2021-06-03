import { Injectable, Injector } from '@angular/core';
import { InMemoryAdapter } from '@/app/common/adapters/in-memory.adapter';
import { PaginationModel } from '../models/pagination.model';

@Injectable({providedIn:'root'})
export class PaginationService extends InMemoryAdapter<PaginationModel> {
  constructor(injector: Injector) {
    super(injector);
    this.name = 'Pagination';
  }
}
