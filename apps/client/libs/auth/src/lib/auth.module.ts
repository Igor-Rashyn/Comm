import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgrxFormsModule } from '@community/ngrx-forms';

import * as fromAuth from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthInterceptorService } from './auth.interceptor.service';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthFacade } from './+state/auth.facade';
import { LocalStorageJwtService } from './local-storage-jwt.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgrxFormsModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer, {
      initialState: fromAuth.initialState
    }),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    AuthEffects,
    AuthGuardService,
    AuthService,
    AuthFacade,
    AuthInterceptorService,
    LocalStorageJwtService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
