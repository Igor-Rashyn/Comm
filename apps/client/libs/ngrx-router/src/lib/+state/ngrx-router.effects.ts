import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import * as NgrxRouterActions from './ngrx-router.actions';

@Injectable()
export class NgrxRouterEffects {
  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxRouterActions.go),
      tap(({ path, query: queryParams, extras }) =>
        this.router.navigate(path, { queryParams, ...extras })
      )
    )
  );

  navigateBack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxRouterActions.back),
      tap(() => this.location.back())
    )
  );

  navigateForward$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxRouterActions.forward),
      tap(() => this.location.forward())
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
