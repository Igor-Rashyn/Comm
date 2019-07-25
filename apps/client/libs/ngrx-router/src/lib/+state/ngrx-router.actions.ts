import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const go = createAction(
  '[Router] GO',
  props<{ path: any[]; query?: object; extras?: NavigationExtras }>()
);

export const back = createAction('[Router] BACK');

export const forward = createAction('[Router] FORWARD');
