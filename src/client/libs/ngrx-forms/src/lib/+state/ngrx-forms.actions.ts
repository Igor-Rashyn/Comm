import { Errors } from './ngrx-forms.interfaces';
import { createAction, props } from '@ngrx/store';

export const setData = createAction(
  '[NgrxForms] SET_DATA',
  props<{ data: any }>()
);

export const updateData = createAction(
  '[NgrxForms] UPDATE_DATA',
  props<{ data: any }>()
);

export const setStructure = createAction(
  '[NgrxForms] SET_STRUCTURE',
  props<{ structure: any }>()
);

export const setErrors = createAction(
  '[NgrxForms] SET_ERRORS',
  props<{ errors: Errors }>()
);

export const initializeErrors = createAction(
 '[NgrxForms] INITIALIZE_ERRORS'
);

export const initializeForm = createAction(
  '[NgrxForms] INITIALIZE_FORM'
);

export const resetForm = createAction('[NgrxForms] RESET_FORM');
