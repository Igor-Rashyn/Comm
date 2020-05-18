import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '@community/api';

export const AUTH_FEATURE_KEY = 'auth';

export interface Auth {
  user: User;
  status: Status;
  loggedIn: boolean;
}

export interface AuthState {
  readonly auth: Auth;
}

export enum Status {
  INIT = 'INIT',
  IN_PROGRESS = 'IN_PROGRESS'
}

export const initialState: Auth = {
  loggedIn: false,
  status: Status.INIT,
  user: {
    email: '',
    token: '',
    username: '',
    image: ''
  }
};

const reducer = createReducer(
  initialState,
  on(AuthActions.getUserSuccess, (state, action) => ({
    ...state,
    loggedIn: true,
    user: action.user
  })),
  on(AuthActions.getUserFail, (state, action) => ({
    ...initialState
  })),
  on(
    AuthActions.registerSuccess,
    AuthActions.loginSuccess,
    (state, action) => ({
      ...state,
      loggedIn: true,
      status: Status.INIT,
      user: action.user
    })
  ),
  on(AuthActions.registerFail, AuthActions.loginFail, (state, action) => ({
    ...state,
    status: Status.INIT
  })),
  on(AuthActions.logout, (state, action) => ({
    ...initialState
  }))
);

export function authReducer(state: Auth | undefined, action: Action): Auth {
  return reducer(state, action);
}
