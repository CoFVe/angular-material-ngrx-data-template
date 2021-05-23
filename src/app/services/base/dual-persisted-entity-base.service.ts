import { EntityCollectionServiceElementsFactory, QueryParams } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { EntityBaseService } from './entity-base.service';

export class DualPersistedEntityBaseService<T> extends EntityBaseService<T> {
  constructor(entityName: string, serviceElementsFactory: EntityCollectionServiceElementsFactory, private externalService: EntityBaseService<T>) {
    super(entityName, serviceElementsFactory);
  }
  /**
     * Dispatch action to query inmemory storage first,
     * if note elemetns are found, then fetch the remote storage for the entities that satisfy a query expressed
     * with either a query parameter map or an HTTP URL query string,
     * and merge the results into the cached collection.
     * @param queryParams the query in a form understood by the server
     * @returns Observable of the queried entities
     * after inmemory or server reports successful query or the query error.
     */
  getWithQueryFromDualPersistedStorage(queryParams: QueryParams): Observable<T[]> {
    //first check if elements are in memory storage
    return this.externalService.getWithQueryFromMemoryFirst(queryParams)
      .pipe(map((elements) => {
        const currentElements = elements.filter((element: any) => {
          let isEqual = true;
          Object.keys(queryParams).forEach((key: any) => {
            if (isEqual && (element[key] === undefined || element[key] === null || element[key] !== queryParams[key])) {
              isEqual = false;
            }
          });
          return isEqual;
        });
        return currentElements;
      })).pipe(mergeMap(currentElements => {
        //if elements are in memory storage, return them, if not, fetch them from remote storae
        if (!!currentElements && currentElements.length > 0) {
          return of(currentElements);
        } else {
          return this.getWithQuery(queryParams);
        }
      }));
  }

}
