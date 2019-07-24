import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NGRXERROR_FEATURE_KEY, Entity } from './ngrx-error.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getNgrxError = createFeatureSelector<Entity>(
  NGRXERROR_FEATURE_KEY
);
export const getCode = createSelector(
  getNgrxError,
  (ngrxError: Entity) => ngrxError.code
);

export const getMessage = createSelector(
  getNgrxError,
  (ngrxError: Entity) => ngrxError.message
);

export const ngrxErrorQuery = {
  getNgrxError,
  getCode,
  getMessage
};
