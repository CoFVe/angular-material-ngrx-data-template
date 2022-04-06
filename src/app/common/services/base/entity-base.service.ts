import { EntityCollectionDataService, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, EntityDataService, QueryParams } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

export class EntityBaseService<T> extends EntityCollectionServiceBase<T> {
  dataAdapter: EntityCollectionDataService<T>;

  constructor(entityName: string, serviceElementsFactory: EntityCollectionServiceElementsFactory, entityDataService: EntityDataService) {
    super(entityName, serviceElementsFactory);
    this.dataAdapter = entityDataService.getService(entityName) as EntityCollectionDataService<T>;
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
  getWithQueryFromMemoryFirst(queryParams: QueryParams): Observable<T[]> {
    //first check if elements are in memory storage
    return this.entities$
      .pipe(map(elements => {
        const currentElements = elements.filter((element: any) => {
          let isEqual = true;
          Object.keys(queryParams).forEach((key: any) => {
            if (isEqual && (element[key] === undefined || element[key] === null || element[key] !== queryParams[key] || !element[key].toString().toLowerCase().includes(queryParams[key].toString().toLowerCase()))) {
              isEqual = false;
            }
          });
          return isEqual;
        });
        if (!!currentElements && currentElements.length > 0) {
          return currentElements;
        }
        return [];
      }))
      .pipe(mergeMap((elements) => {

        //if elements are in memory storage, return them, if not, fetch them from remote storae
        if (!!elements && elements.length > 0) {
          return of(elements);
        } else {
          return this.getWithQuery(queryParams).pipe(map(result=>result));
        }
      }));
  }

}
