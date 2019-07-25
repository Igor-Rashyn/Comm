import { Errors } from './ngrx-forms.interfaces';
import { createAction, props } from '@ngrx/store';

export enum NgrxFormsActionTypes {
  SET_DATA = '[NgrxForms] SET_DATA',
  UPDATE_DATA = '[NgrxForms] UPDATE_DATA',
  SET_STRUCTURE = '[NgrxForms] SET_STRUCTURE',
  SET_ERRORS = '[NgrxForms] SET_ERRORS',
  INITIALIZE_ERRORS = '[NgrxForms] INITIALIZE_ERRORS',
  INITIALIZE_FORM = '[NgrxForms] INITIALIZE_FORM',
  RESET_FORM = '[NgrxForms] RESET_FORM'
}

export const setData = createAction(
  NgrxFormsActionTypes.SET_DATA,
  props<{ payload: any }>()
);

export const updateData = createAction(
  NgrxFormsActionTypes.UPDATE_DATA,
  props<{ payload: any }>()
);

export const setStructure = createAction(
  NgrxFormsActionTypes.SET_STRUCTURE,
  props<{ payload: any }>()
);

export const setErrors = createAction(
  NgrxFormsActionTypes.SET_ERRORS,
  props<{ payload: Errors }>()
);

export const initializeErrors = createAction(
  NgrxFormsActionTypes.INITIALIZE_ERRORS
);

export const initializeForm = createAction(
  NgrxFormsActionTypes.INITIALIZE_FORM
);

export const resetForm = createAction(NgrxFormsActionTypes.RESET_FORM);
