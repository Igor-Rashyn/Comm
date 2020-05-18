import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import * as RouterActions from './router.actions';

@Injectable()
export class RouterEffects {
  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.go),
      map(action => action.to),
      tap(({ path, query: queryParams, extras }) =>
        this.router.navigate(path, { queryParams, ...extras })
      )
    ),
    { dispatch: false }
  );

  navigateBack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.back),
      tap(() => this.location.back())
    ),
    { dispatch: false }
  );

  navigateForward$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.forward),
      tap(() => this.location.forward())
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) { }
}
