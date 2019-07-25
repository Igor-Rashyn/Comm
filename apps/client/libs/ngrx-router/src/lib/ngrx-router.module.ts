import { CustomSerializer } from './+state/custom-serializer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgrxRouterEffects } from './+state/ngrx-router.effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
  routerReducer
} from '@ngrx/router-store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('router', routerReducer),
    EffectsModule.forFeature([NgrxRouterEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }) //TODO: read
  ],
  providers: [
    NgrxRouterEffects,
    [{ provide: RouterStateSerializer, useClass: CustomSerializer }] //TODO: read
  ]
})
export class NgrxRouterModule {}
