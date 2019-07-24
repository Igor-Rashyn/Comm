import { HttpErrorResponse } from '@angular/common/http';
import * as NgrxErrorActions from './ngrx-error.actions';
import { Store } from '@ngrx/store';
import { NgrxErrorState } from './ngrx-error.reducer';
import { Injectable } from '@angular/core';
import { ngrxErrorQuery } from './ngrx-error.selectors';

@Injectable()
export class NgrxErrorFacade {
  ngrxError$ = this.store.select(ngrxErrorQuery.getNgrxError);
  code$ = this.store.select(ngrxErrorQuery.getCode);
  message$ = this.store.select(ngrxErrorQuery.getMessage);

  constructor(private store: Store<NgrxErrorState>) {}

  throw401Error(error: HttpErrorResponse) {
    this.store.dispatch(NgrxErrorActions.throw401Error({ payload: error }));
  }

  throw404Error(error: HttpErrorResponse) {
    this.store.dispatch(NgrxErrorActions.throw404Error({ payload: error }));
  }
}
