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
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  imports: [
    ApiModule,
    AuthModule,
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        // {
        //   path: '',
        //   loadChildren: () =>
        //     import('@community/home/src/lib/home.module').then(
        //       m => m.HomeModule
        //     )
        // }
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
  declarations: [AppComponent, FooterComponent, NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

//https://github.com/stefanoslig/angular-ngrx-nx-realworld-example-app/blob/master/apps/conduit/src/app/app.module.ts
//https://www.talaka.org/
//https://www.indiegogo.com/
// https://www.newzealandinvestmentnetwork.co.nz/
// https://www.kickstarter.com/
// https://www.patreon.com/

// structure
//  home page
// 1. Login
// 2. Sign Up
// 3. Search ( индико и кикстартер) - поиск по категориям проекта по городу/стране/миру  по ресурсам
// 4. Popular projects by city/country/world (for not authorized person) (пример индиго лист проектов)
// 5. Speciali
// 6. How does it work
// 7. Start a project - lead to sign up (sign up with google and facebook, instagram)
// 8. Projects are looking for helpers = (можно разместить линк на проект на других сайтах, открытое апи для красивого линка)


//project page
//1.шапка проекта (кикстартер - индиго) (скопировать линк, запостить на фейсе, возможность добавить видео/фото в шапку)  менеджер проекта, команда, фоллоу, подключиться к команде , категория и локейшн
//2.меню -  стори, updates, tasks, project status (like roud map)
//3.tasks

//project creation
//search result
//task
//chat
//news from sub

