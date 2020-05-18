import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const throw401Error = createAction(
  '[NgrxError] THROW_401_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const throw404Error = createAction(
  '[NgrxError] THROW_404_ERROR',
  props<{ error: HttpErrorResponse }>()
);
