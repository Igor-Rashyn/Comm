import { Action } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as NgrxFormsActions from './ngrx-forms.actions';

@Injectable()
export class NgrxFormsEffects {
  setData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxFormsActions.setData, NgrxFormsActions.updateData),
      map(action => NgrxFormsActions.initializeErrors())
    )
  );

  constructor(private actions$: Actions) {}
}
