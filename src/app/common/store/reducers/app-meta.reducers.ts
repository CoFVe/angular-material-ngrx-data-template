import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '@environment';
import { storeLogger } from 'ngrx-store-logger';
import { AppState } from '../states/app.state';

export function logger(reducer: ActionReducer<any>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = environment.production ? [] : [logger];
