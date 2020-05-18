import { createAction, props } from '@ngrx/store';
import { NgrxRoute } from './router.interfaces';

export const go = createAction(
  '[Router] GO',
  props<{to: NgrxRoute }>()
);

export const back = createAction('[Router] BACK');

export const forward = createAction('[Router] FORWARD');
