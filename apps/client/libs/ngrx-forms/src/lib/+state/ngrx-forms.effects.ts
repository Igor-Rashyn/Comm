import { Action } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { NgrxFormsActionTypes } from './ngrx-forms.actions';

@Injectable()
export class NgrxFormsEffects {
  setData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxFormsActionTypes.SET_DATA, NgrxFormsActionTypes.UPDATE_DATA),
      map(action => ({ type: NgrxFormsActionTypes.INITIALIZE_ERRORS }))
    )
  );

  constructor(private actions$: Actions) {}
}
