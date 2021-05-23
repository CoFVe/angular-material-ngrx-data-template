import { Injectable, Injector } from '@angular/core';
import { PaginationModel } from '@models/pagination.model';
import { InMemoryAdapter } from '@adapters/in-memory.adapter';

@Injectable({providedIn:'root'})
export class PaginationService extends InMemoryAdapter<PaginationModel> {
  constructor(injector: Injector) {
    super(injector);
    this.name = 'Pagination';
  }
}
