import { HttpClientAdapter } from '@/app/adapters/http-client.adapter';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { BaseActions } from '../../actions/base/base.actions';

@Injectable()
export class BaseEffects<T> {
  private baseActions = new BaseActions<T>();

  getEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.baseActions.getEntities),
      switchMap(() =>
        this.entityDataService.getAll().pipe(
          map((entities : T[] | any) => this.baseActions.getEntitiesSuccess( entities )),
          catchError(error => of(this.baseActions.getEntitiesError({ error })))
        )
      )
    )
  );

  addEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.baseActions.addEntity),
      concatMap(action =>
        this.entityDataService.add(action.entity).pipe(
          map(entity => this.baseActions.addEntitySuccess({ entity })),
          catchError(error => of(this.baseActions.addEntityError({ error })))
        )
      )
    )
  );

  deleteEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.baseActions.deleteEntity),
      concatMap(action => {
        const entity = action.entity;
        return this.entityDataService.delete(entity).pipe(
          map(() => this.baseActions.deleteEntitySuccess({ entity })),
          catchError(error => of(this.baseActions.deleteEntityError({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.baseActions.updateEntity),
      concatMap(action =>
        this.entityDataService.update(action.entity).pipe(
          map(entity => this.baseActions.updateEntitySuccess({ entity })),
          catchError(error => of(this.baseActions.updateEntityError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private entityDataService: HttpClientAdapter<T>
  ) {

  }
}
