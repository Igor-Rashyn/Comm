import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as NgrxErrorActions from './ngrx-error.actions';
import { map } from 'rxjs/operators';
import { go } from '@community/ngrx-router';

@Injectable()
export class NgrxErrorEffects {
  error401$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxErrorActions.throw401Error),
      map(_ => go({ to: { path: ['/login'] } }))
    )
  );

  error404$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxErrorActions.throw401Error),
      map(_ => go({ to: { path: ['/'] } }))
    )
  );

  constructor(private actions$: Actions) { }
}
