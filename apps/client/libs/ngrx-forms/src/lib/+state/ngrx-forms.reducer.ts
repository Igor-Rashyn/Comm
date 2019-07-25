import * as FormsActions from './ngrx-forms.actions';
import { NgrxForms } from './ngrx-forms.interfaces';
import { createReducer, on, Action } from '@ngrx/store';

export const NGRXFORMS_FEATURE_KEY = 'ngrxForms';

export const initialState: NgrxForms = {
  data: {},
  structure: [],
  valid: true,
  errors: {},
  touched: false
};

const reducer = createReducer(
  initialState,
  on(FormsActions.setData, (state, action) => ({
    ...state,
    data: action.payload
  })),
  on(FormsActions.updateData, (state, action) => ({
    ...state,
    data: { ...state.data, ...action.payload },
    touched: true
  })),
  on(FormsActions.setStructure, (state, action) => ({
    ...state,
    structure: action.payload.slice(0)
  })),
  on(FormsActions.setErrors, (state, action) => ({
    ...state,
    errors: action.payload
  })),
  on(FormsActions.initializeErrors, (state, action) => ({
    ...state,
    errors: {}
  })),
  on(FormsActions.initializeForm, (state, action) => ({ ...initialState })),
  on(FormsActions.resetForm, (state, action) => ({ ...state, touched: false }))
);

export function ngrxFormReducer(
  state: NgrxForms | undefined,
  action: Action
): NgrxForms {
  return reducer(state, action);
}
