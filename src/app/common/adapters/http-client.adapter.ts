import { Injectable, Injector } from '@angular/core';
import { EntityCollectionDataService, QueryParams } from '@ngrx/data';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environment';
import { Update } from '@ngrx/entity';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class HttpClientAdapter<T> implements EntityCollectionDataService<T> {
  name!: string;
  entityIdentifier = 'id';
  protected logger!: LoggerService;
  protected storage!: HttpClient;

  constructor(injector: Injector) {
    this.logger = injector.get(LoggerService);
    this.storage = injector.get(HttpClient);
  }

  add(entity: T): Observable<T> {
    return this.addInStorage(entity);
  }

  delete(id: string | number | T): Observable<string | number> {
    if (typeof id == 'number' || typeof id == 'string')
      return this.deleteFromStorage(id as string | number) as unknown as Observable<string | number>;
    return this.deleteFromStorage((id as any)[this.entityIdentifier]) as unknown as Observable<string | number>;
  }

  getAll(): Observable<T[]> {
    return this.storage.get(environment.serviceUrl + '/' + this.name, {
      headers: new HttpHeaders().append('NgrxEntity', this.name)
    })
    .pipe(tap((response: any) => { this.logger.debug('httpClient get ' + this.name + ' with response: ' + JSON.stringify(response)) })) as Observable<T[]>;
  }

  getById(id: string | number): Observable<T> {
    return this.storage.get<T>(environment.serviceUrl + '/' + this.name+ '/' + id.toString(), {
      headers: new HttpHeaders().append('NgrxEntity', this.name)
    }).pipe(tap((response) => { this.logger.debug('httpClient get ' + this.name + '/' + id + ' with response: ' + JSON.stringify(response)) }));
  }

  getWithQuery(params: QueryParams): Observable<T[]> {
    let queryParams = new HttpParams();
    for (const param in params) {
      queryParams = queryParams.append(param, params[param].toString());
    }
    return this.storage.get(environment.serviceUrl + '/' + this.name, {
      params: queryParams,
      headers: new HttpHeaders().append('NgrxEntity', this.name)
    }) as Observable<T[]>;
  }

  update(update: Update<T> | T): Observable<T> {
    if (!!(update as Update<T>).changes) {
      return this.updateInStorage((update as Update<T>).changes as T);
    }
    return this.updateInStorage(update as unknown as T);
  }

  upsert(entity: T | any): Observable<T | any> {
      if (!!!entity[this.entityIdentifier]){
        return this.addInStorage(entity);
      }
      return this.updateInStorage(entity);
  }

  executeCustomAction(entity: T | any, actionName: string){
    return this.storage.post<T>(environment.serviceUrl + '/' + this.name + '/' + actionName, entity, {
      headers: new HttpHeaders().append('NgrxEntity', this.name)
    })
    .pipe(tap((response) => {
      this.logger.debug('httpClient post ' + JSON.stringify(entity) + ' with response: ' + JSON.stringify(response))
    }));
  }

  protected deleteFromStorage(id: string | number): Observable<T | any> {
    return this.storage.delete(environment.serviceUrl + '/' + this.name + '/' + id, {
        headers: new HttpHeaders().append('NgrxEntity', this.name)
      })
      .pipe(tap((response) => {
        this.logger.debug('httpClient delete ' + this.name + ' and response: ' + JSON.stringify(response))
      }),
      map(() => {
        return id;
      })
    );
  }

  protected addInStorage(entity: T): Observable<T> {
    return this.storage.post<T>(environment.serviceUrl + '/' + this.name, entity, {
      headers: new HttpHeaders().append('NgrxEntity', this.name)
    })
    .pipe(tap((response) => {
      this.logger.debug('httpClient add ' + JSON.stringify(entity) + ' with response: ' + JSON.stringify(response))
    }));
  }

  protected updateInStorage(entity: T | any): Observable<T> {
    return this.storage.put<T>(environment.serviceUrl + '/' + this.name + '/' + entity[this.entityIdentifier], entity, {
      headers: new HttpHeaders().append('NgrxEntity', this.name)
    })
    .pipe(tap((response) => {
      this.logger.debug('httpClient update ' + JSON.stringify(entity) + ' with response: ' + JSON.stringify(response))
    }));
  }

  protected patchInStorage(entity: T | any): Observable<T> {
    return this.storage.patch<T>(environment.serviceUrl + '/' + this.name + '/' + entity[this.entityIdentifier], entity, {
      headers: new HttpHeaders().append('NgrxEntity', this.name)
    })
    .pipe(tap((response) => {
      this.logger.debug('httpClient patch ' + JSON.stringify(entity) + ' with response: ' + JSON.stringify(response))
    }));
  }


}
