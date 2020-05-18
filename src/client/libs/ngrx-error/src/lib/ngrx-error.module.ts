import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import * as fromNgrxError from './+state/ngrx-error.reducer';
import { NgrxErrorEffects } from './+state/ngrx-error.effects';
import { NgrxErrorFacade } from './+state/ngrx-error.facade';
import { NgrxErrorInterceptorService } from './ngrx-error-interceptor.service';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromNgrxError.NGRXERROR_FEATURE_KEY,
      fromNgrxError.ngrxErrorReducer,
      { initialState: fromNgrxError.initialState }
    ),
    EffectsModule.forFeature([NgrxErrorEffects])
  ],
  providers: [
    NgrxErrorFacade,
    NgrxErrorEffects,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgrxErrorInterceptorService,
      multi: true
    }
  ]
})
export class NgrxErrorModule {}
