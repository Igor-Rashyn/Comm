import { NgrxErrorModule } from '@community/ngrx-error';
import { NgrxRouterModule } from '@community/ngrx-router';
import { AuthModule } from '@community/auth';
import { ApiModule } from '@community/api';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    ApiModule,
    AuthModule,
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@community/home/src/lib/home.module').then(
              m => m.HomeModule
            )
        }
        // Project
        //
        // Settings
      ],
      {
        initialNavigation: 'enabled', //TODO: read what it is
        useHash: true
      }
    ),
    StoreModule.forRoot(
      {},
      { metaReducers: !environment.production ? [storeFreeze] : [] } //TODO: read what it is
    ), //TODO: read what it is
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgrxRouterModule,
    NgrxErrorModule
  ],
  declarations: [AppComponent], //FooterComponent, NavbarComponent
  bootstrap: [AppComponent]
})
export class AppModule {}

//https://github.com/stefanoslig/angular-ngrx-nx-realworld-example-app/blob/master/apps/conduit/src/app/app.module.ts
