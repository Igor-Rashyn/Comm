import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
  switchMap,
  map,
  catchError,
  tap,
  withLatestFrom,
  exhaustMap
} from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthService } from './../auth.service';
import { LocalStorageJwtService } from './../local-storage-jwt.service';
import { NgrxFormsFacade } from '@community/ngrx-forms';
import * as fromNgrxForms from '@community/ngrx-forms';

@Injectable()
export class AuthEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() =>
        this.authService.user().pipe(
          map(data => AuthActions.getUserSuccess({ user: data.user })),
          catchError(error => of(AuthActions.getUserFail(error)))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      withLatestFrom(this.ngrxFormsFacade.data$),
      exhaustMap(([action, data]) =>
        this.authService.login(data).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(result =>
            of(fromNgrxForms.setErrors({ payload: result.error.errors }))
          )
        )
      )
    )
  );

  loginOrRegisterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
      tap(action => {
        this.localStorageJwtService.set(
          action.user.token
          // expiresIn: action.user.token //TODO: expires
        );
        this.router.navigateByUrl('/');
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      withLatestFrom(this.ngrxFormsFacade.data$),
      exhaustMap(([action, data]) =>
        this.authService.register(data).pipe(
          map(user => AuthActions.registerSuccess({ user })),
          catchError(result => of(fromNgrxForms.setErrors(result.error.errors)))
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(action => {
          this.localStorageJwtService.remove();
          this.router.navigateByUrl('/'); //TODO: redirect to home
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private localStorageJwtService: LocalStorageJwtService,
    private authService: AuthService,
    private router: Router,
    private ngrxFormsFacade: NgrxFormsFacade
  ) { }
}
