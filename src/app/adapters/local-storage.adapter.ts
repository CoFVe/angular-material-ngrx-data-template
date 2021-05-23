import { Injectable, Injector } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { EntityCollectionDataService, QueryParams } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { tap, map, first } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { LoggerService } from '@services/logger.service';

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
    const currentEntity = { ...entity }
    currentEntity[this.entityIdentifier] = entity[this.entityIdentifier] || (this.entities ? this.entities.length + 1 : 1);
    this.entities = [...this.entities || [], currentEntity];
    this.updateStorage();
    return of(currentEntity);
  }

  delete(id: string | number): Observable<string | number> {
    this.entities = this.entities.filter((e: any) => e[this.entityIdentifier] !== id);
    this.updateStorage();
    return of(id);
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
    let updatedEntity = null;
    this.entities = [...this.entities.map((e: any) => {
      if (e[this.entityIdentifier] === update.id) {
        updatedEntity = {
          ...e,
          ...update.changes
        };
        return updatedEntity;
      }
      return e;
    })];
    this.updateStorage();
    return of(updatedEntity);
  }

  upsert(entity: T| any): Observable<T> {
    return this.getById(entity[this.entityIdentifier]).pipe(map(currentEntity => {
      if (currentEntity) {
        this.update({
          id: entity[this.entityIdentifier],
          changes: entity
        } as Update<T>);
        return entity;
      } else {
        this.add(entity);
        return entity;
      }
    }));
  }

  patch(entity: T | any): Observable<T> {
    return this.getById(entity[this.entityIdentifier]).pipe(map(currentEntity => {
      if (currentEntity) {
        this.update({
          id: entity[this.entityIdentifier],
          changes: entity
        } as Update<T>);
        return entity;
      } else {
        this.add(entity);
        return entity;
      }
    }));
  }

  private updateStorage() {
    return this.storage.set(this.name, this.entities).pipe(first()).subscribe();
  }
}
