import { Injectable, Injector } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { EntityCollectionDataService, QueryParams } from '@ngrx/data';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LocalStorageAdapter<T> implements EntityCollectionDataService<T> {
  name!: string;
  entities: T[] = [];
  entityIdentifier = 'id';
  protected logger!: LoggerService;
  protected storage!: StorageMap;


  constructor(injector: Injector) {
    this.logger = injector.get(LoggerService);
    this.storage = injector.get(StorageMap);
  }

  add(entity: T | any): Observable<T> {
    this.logger.info('Storage add');
    const currentEntity = { ...entity } as T | any;
    currentEntity[this.entityIdentifier] = entity[this.entityIdentifier] || (this.entities ? this.entities.length + 1 : 1);
    this.entities = [...this.entities || [], currentEntity];
    return this.updateStorage().pipe(map(()=>currentEntity));
  }

  delete(id: string | number): Observable<string | number> {
    this.entities = this.entities.filter((e: T | any) => e[this.entityIdentifier] !== id);
    return this.updateStorage().pipe(map(()=>id));
  }

  getAll(): Observable<T[]> {
    return this.storage.get(this.name)
    .pipe(tap((entities: T[] | any) => {
      this.entities = [...entities || []];
    })).pipe(map((entities) => [...entities || []])) as Observable<T[]>;
  }

  getById(id: string | number): Observable<T | any> {
    const obs = this.storage.get(this.name)
    .pipe(map((entities: T[] | any) => {
      this.entities = entities || this.entities;
      const filteredEntities = this.entities.filter((entity: any) => entity[this.entityIdentifier] === id);
      return filteredEntities.length > 0 ? { ...filteredEntities[0] } : null;
    }));
    return obs;
  }

  getWithQuery(params: QueryParams): Observable<T[]> {
    return this.storage.get(this.name)
    .pipe(map((entities: T[] | any) => {
      let filteredEntities = [...entities || this.entities || []];
      for (const param in params) {
        filteredEntities = filteredEntities.filter(entity => entity[param] === params[param].toString());
      }
      this.entities = [...filteredEntities || []];
      return [...filteredEntities];
    }));
  }

  update(update: import('@ngrx/entity').Update<T>): Observable<T | any> {
    let updatedEntity: T | any = null;
    this.entities = [...this.entities.map((e: T | any) => {
      if (e[this.entityIdentifier] === update.id) {
        updatedEntity = {
          ...e,
          ...update.changes
        };
        return updatedEntity;
      }
      return e;
    })];
    return this.updateStorage().pipe(map(()=>updatedEntity));
  }

  upsert(entity: T| any): Observable<T | any> {
    return this.getById(entity[this.entityIdentifier]).pipe(map(currentEntity => {
      if (currentEntity) {
        return this.update({
          id: entity[this.entityIdentifier],
          changes: entity
        } as Update<T>);
      } else {
        return this.add(entity);
      }
    }));
  }

  private updateStorage() {
    return this.storage.set(this.name, this.entities);
  }
}
