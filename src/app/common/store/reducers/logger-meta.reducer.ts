import { ActionReducer } from "@ngrx/store";
import { AppState } from "../states/app.state";

/**
 * Logger reducer used for debugging to log state changes in console.
 */
 export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState | undefined, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}
