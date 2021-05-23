import { Injectable, Injector } from '@angular/core';
import { EntityCollectionDataService, QueryParams } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { LoggerService } from '@services/logger.service';

@Injectable({providedIn: 'root'})
export class InMemoryAdapter<T> implements EntityCollectionDataService<T> {
  name!: string;
  entities: T[] = [];
  entityIdentifier = 'id';
  protected logger!: LoggerService;

  constructor(injector: Injector) {
    this.logger = injector.get(LoggerService);
  }

  add(entity: T | any): Observable<T> {
    this.logger.info('Storage add');
    const currentEntity = { ...entity }
    currentEntity[this.entityIdentifier] = entity[this.entityIdentifier] || (this.entities ? this.entities.length + 1 : 1);
    this.entities = [...this.entities || [], currentEntity];
    return of(currentEntity);
  }

  delete(id: number | string): Observable<number | string> {
    this.entities = this.entities.filter((e: any) => e[this.entityIdentifier] !== id);
    return of(id);
  }

  getAll(): Observable<T[]> {
    return of([...this.entities || []]);
  }

  getById(id: number | string): Observable<T | any> {
    const filteredEntities = this.entities.filter((entity: any) => entity[this.entityIdentifier] === id);
    return of(filteredEntities.length > 0 ? { ...filteredEntities[0] } : null);
  }

  getWithQuery(params: QueryParams): Observable<T[]> {
    let filteredEntities = [...this.entities || []];
    for (const param in params) {
      filteredEntities = filteredEntities.filter((entity : any) => entity[param] === params[param].toString());
    }
    this.entities = [...filteredEntities || []];
    return of([...filteredEntities]);
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
    return of(updatedEntity);
  }

  upsert(entity: T | any): Observable<T | any> {
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

  patch(entity: T | any): Observable<T | any> {
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

}
