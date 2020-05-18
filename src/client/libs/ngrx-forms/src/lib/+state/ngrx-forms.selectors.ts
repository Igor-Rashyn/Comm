import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NGRXFORMS_FEATURE_KEY } from './ngrx-forms.reducer';
import { NgrxForms } from './ngrx-forms.interfaces';

// Lookup the 'NgrxForms' feature state managed by NgRx
const getNgrxForms = createFeatureSelector<NgrxForms>(NGRXFORMS_FEATURE_KEY);
export const getStructure = createSelector(
  getNgrxForms,
  (state: NgrxForms) => state.structure
);
export const getData = createSelector(
  getNgrxForms,
  (state: NgrxForms) => state.data
);
export const isValid = createSelector(
  getNgrxForms,
  (state: NgrxForms) => state.valid
);
export const getErrors = createSelector(
  getNgrxForms,
  (state: NgrxForms) => state.errors
);
export const isTouched = createSelector(
  getNgrxForms,
  (state: NgrxForms) => state.touched
);

export const ngrxFormsQuery = {
  getStructure,
  getData,
  isValid,
  isTouched,
  getErrors
};
