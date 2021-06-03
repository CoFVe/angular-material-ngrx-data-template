import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from '../states/app.state';

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer
};

