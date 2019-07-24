import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState, Auth } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuth = createFeatureSelector<Auth>(AUTH_FEATURE_KEY);
export const getLoggedIn = createSelector(
  getAuth,
  (auth: Auth) => auth.loggedIn
);

export const getUser = createSelector(
  getAuth,
  (auth: Auth) => auth.user
);

export const authQuery = {
  getAuth,
  getLoggedIn,
  getUser
};
