import { CustomSerializer } from './+state/custom-serializer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './+state/router.effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
  routerReducer
} from '@ngrx/router-store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('router', routerReducer),
    EffectsModule.forFeature([RouterEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }) //TODO: read
  ],
  providers: [
    RouterEffects,
    [{ provide: RouterStateSerializer, useClass: CustomSerializer }] //TODO: read
  ]
})
export class NgrxRouterModule {}
