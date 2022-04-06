import { MetaReducer } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { logger } from './no-logger-meta.reducer';


export const metaReducers: MetaReducer<AppState>[] = [logger];
