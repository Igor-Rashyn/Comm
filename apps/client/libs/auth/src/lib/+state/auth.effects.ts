import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { AuthService } from './../auth.service';
import { LocalStorageJwtService } from './../local-storage-jwt.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(action => {
          this.localStorageJwtService.remove();
          this.router.navigateByUrl(''); //TODO: redirect to home
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private localStorageJwtService: LocalStorageJwtService,
    private authService: AuthService,
    private router: Router,
    private ngrxFormsFacade: NgrxFormsFacade //TODO:
  ) {}
}
