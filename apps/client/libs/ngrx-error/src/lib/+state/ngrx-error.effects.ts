import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as NgrxErrorActions from './ngrx-error.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class NgrxErrorEffects {
  error401$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxErrorActions.throw401Error),
      map(_ => ({ type: '[Router] GO', payload: { path: ['/login'] } }))
    )
  );

  error404$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxErrorActions.throw401Error),
      map(_ => ({ type: '[Router] GO', payload: { path: ['/'] } }))
    )
  );

  constructor(private actions$: Actions) { }
}
