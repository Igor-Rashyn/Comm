import * as NgrxErrorActions from './ngrx-error.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const NGRXERROR_FEATURE_KEY = 'ngrxError';

export interface Entity {
  code: number;
  message?: string;
}

export interface NgrxErrorState {
  readonly ngrxError: Entity;
}

export const initialState: Entity = {
  code: -1
};

const reducer = createReducer(
  initialState,
  on(
    NgrxErrorActions.throw401Error,
    NgrxErrorActions.throw404Error,
    (state, action) => ({ code: action.error.status, message: action.error.message })
  )
);

export function ngrxErrorReducer(state: Entity | undefined, action: Action): Entity {
  return reducer(state, action);
}
