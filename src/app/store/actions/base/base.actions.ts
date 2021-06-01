import { createAction, props } from '@ngrx/store';
import { DataServiceError } from '../../services/data-error.service';

export class BaseActions<T> {
  private t!: new() => T;

  createEntityAction = (actionType: string) => createAction(actionType, props<{ entity: T }>());

  createEntityErrorAction = (actionType: string) => createAction(actionType, props<{ error: DataServiceError<T> }>());


  getEntities = createAction(`[${this.t}] GET_${this.t}`);

  // static getEntities<T>() {
  //   const base = new BaseActions<T>();
  //   return createAction(`[${base.t.constructor.name}] GET_${base.t.constructor.name}`);
  // }

  getEntitiesSuccess = createAction(
    `[${this.t.constructor.name}] GET_${this.t.constructor.name}_SUCCESS`,
    props<{ entities: T[] }>()
  );

  getEntitiesError = createAction(
    `[${this.t.constructor.name}] GET_${this.t.constructor.name}_ERROR`,
    props<{ error: any }>()
  );

  // public static getEntitiesSuccess<T>(entities: T[]) {
  //   entities = entities;
  //   const base = new BaseActions<T>();
  //   return createAction(`[${base.t.constructor.name}] GET_${base.t.constructor.name}_SUCCESS`, props<{ entities: T[]; }>()) as unknown as T[];
  // }

  // public static getEntitiesError<T extends BaseActions<T>>(c: new() => T, error: any) {
  //   error = error;
  //   return createAction(
  //     `[${c.constructor.name}] GET_${c.constructor.name}_ERROR`,
  //     props<{ error: any }>()
  //   );
  // }



  // static addEntityError<T extends BaseActions<T>>(c: new() => T): TypedAction<string> {
  //   return BaseActions.createEntityErrorAction(c,`[${c.constructor.name}] ADD_${c.constructor.name}_ERROR`);
  // }

  // static getEntity<T extends BaseActions<T>>(c: new() => T): TypedAction<string> {
  //   return createAction(`[${c.constructor.name}] GET_${c.constructor.name}`, props<{ id: string }>());
  // }

  // static getEntitySuccess<T extends BaseActions<T>>(c: new() => T): TypedAction<string> {
  //   return BaseActions.createEntityAction(c,`[${c.constructor.name}] GET_${c.constructor.name}_SUCCESS`);
  // }

  // static getEntityError<T extends BaseActions<T>>(c: new() => T): TypedAction<string> {
  //   return BaseActions.createEntityErrorAction(c,`[${c.constructor.name}] GET_${c.constructor.name}_ERROR`);
  // }

  // static updateEntity<T extends BaseActions<T>>(c: new() => T): TypedAction<string> {
  //   return BaseActions.createEntityAction(c,`[${c.constructor.name}] UPDATE_${c.constructor.name}`);
  // }
  // static updateEntitySuccess<T extends BaseActions<T>>(c: new() => T): TypedAction<string> {
  //   return BaseActions.createEntityAction(c,`[${c.constructor.name}] UPDATE_${c.constructor.name}_SUCCESS`);
  // }
  // static updateEntityError<T extends BaseActions<T>>(c: new() => T): TypedAction<string> {
  //   return BaseActions.createEntityErrorAction(c,
  //     `[${c.constructor.name}] UPDATE_${c.constructor.name}_ERROR`
  //   );
  // }
  // static deleteEntity<T extends BaseActions<T>>(c: new() => T): TypedAction<string> {
  //   return BaseActions.createEntityAction(c,`[${c.constructor.name}] DELETE_${c.constructor.name}`);
  // }
  // static deleteEntitySuccess<T extends BaseActions<T>>(c: new() => T): TypedAction<string> {
  //   return BaseActions.createEntityAction(c,`[${c.constructor.name}] DELETE_${c.constructor.name}_SUCCESS`);
  // }
  // static deleteEntityError<T extends BaseActions<T>>(c: new() => T): TypedAction<string> {
  //   return BaseActions.createEntityErrorAction(c,
  //     `[${c.constructor.name}] DELETE_${c.constructor.name}_ERROR`
  //   );
  // }
  // static setEntityLoading<T extends BaseActions<T>>(c: new() => T): TypedAction<string> {
  //   return createAction(
  //     `[${c.constructor.name}] SET_${c.constructor.name}_LOADING`,
  //     props<{ loading: boolean }>()
  //   );
  // }

  addEntity = this.createEntityAction(`[${this.t.constructor.name}] ADD_${this.t.constructor.name}`);

  addEntitySuccess = this.createEntityAction(`[${this.t.constructor.name}] ADD_${this.t.constructor.name}_SUCCESS`);

  addEntityError = this.createEntityErrorAction(`[${this.t.constructor.name}] ADD_${this.t.constructor.name}_ERROR`);

  getEntity = createAction(`[${this.t.constructor.name}] GET_${this.t.constructor.name}`, props<{ id: string }>());

  getEntitySuccess = this.createEntityAction(`[${this.t.constructor.name}] GET_${this.t.constructor.name}_SUCCESS`);

  getEntityError = this.createEntityErrorAction(`[${this.t.constructor.name}] GET_${this.t.constructor.name}_ERROR`);

  updateEntity = this.createEntityAction(`[${this.t.constructor.name}] UPDATE_${this.t.constructor.name}`);

  updateEntitySuccess = this.createEntityAction(`[${this.t.constructor.name}] UPDATE_${this.t.constructor.name}_SUCCESS`);

  updateEntityError = this.createEntityErrorAction(
    `[${this.t.constructor.name}] UPDATE_${this.t.constructor.name}_ERROR`
  );

  deleteEntity = this.createEntityAction(`[${this.t.constructor.name}] DELETE_${this.t.constructor.name}`);

  deleteEntitySuccess = this.createEntityAction(`[${this.t.constructor.name}] DELETE_${this.t.constructor.name}_SUCCESS`);

  deleteEntityError = this.createEntityErrorAction(
    `[${this.t.constructor.name}] DELETE_${this.t.constructor.name}_ERROR`
  );

  setEntityLoading = createAction(
    `[${this.t.constructor.name}] SET_${this.t.constructor.name}_LOADING`,
    props<{ loading: boolean }>()
  );

}


