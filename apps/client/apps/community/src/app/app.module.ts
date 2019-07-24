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
  declarations: [AppComponent], //FooterComponent, NavbarComponent
  imports: [
    ApiModule, //TODO:
    AuthModule, //TODO:
    BrowserModule,
    NxModule.forRoot(), //TODO: read what it is
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('community/home/src/home.module').then(m => m.HomeModule)
        }
        // Project
        //
        // Settings
      ],
      {
        initialNavigation: 'enabled', //TODO: read what it is
        useHash: true //TODO: read what it is
      }
    ),
    StoreModule.forRoot(
      {},
      { metaReducers: !environment.production ? [storeFreeze] : [] } //TODO: read what it is
    ), //TODO: read what it is
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgrxRouterModule, //TODO: read what it is
    NgrxErrorModule //TODO: read what it is
  ],
  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

//https://github.com/stefanoslig/angular-ngrx-nx-realworld-example-app/blob/master/apps/conduit/src/app/app.module.ts
