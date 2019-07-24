import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

import * as fromAuth from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { LoginComponent } from './login/login.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent //TODO:
  },
  {
    path: 'register',
    component: RegisterComponent //TODO:
  }
]);

@NgModule({
  imports: [
    CommonModule,
    NgrxFormsModule, //TODO:
    authRouting,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer, {
      initialState: fromAuth.initialState
    }),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    AuthEffects,
    AuthGuardService,
    AuthService,
    AuthFacade, //TODO:
    TokenInterceptorService,
    LocalStorageJwtService
  ],
  declarations: [LoginComponent]
})
export class AuthModule {}
