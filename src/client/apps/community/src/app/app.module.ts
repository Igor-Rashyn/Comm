import { NgrxErrorModule } from '@community/ngrx-error';
import { NgrxRouterModule } from '@community/ngrx-router';
import { AuthModule } from '@community/auth';
import { ApiModule } from '@community/api';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { MaterialModule } from './modules/material.module';

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
    BrowserAnimationsModule,
    NgrxRouterModule,
    NgrxErrorModule,
    MaterialModule
  ],
  declarations: [AppComponent, FooterComponent, NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

//https://github.com/stefanoslig/angular-ngrx-nx-realworld-example-app/blob/master/apps/conduit/src/app/app.module.ts
//https://conduit-af252.firebaseapp.com/#/
//https://www.talaka.org/
//https://www.indiegogo.com/
// https://www.newzealandinvestmentnetwork.co.nz/
// https://www.kickstarter.com/
// https://www.patreon.com/
//https://slack.com/intl/en-nz/
//https://evernote.com/

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



//project or people list 
//https://tympanus.net/Development/PricingTablesInspiration/
//https://tympanus.net/codrops/2018/02/23/freebie-dropcast-website-template-html-sketch/
//https://tympanus.net/codrops/2018/05/23/grid-layout-with-motion-hover/
//https://tympanus.net/Tutorials/ShapeHoverEffectSVG/index3.html
//https://tympanus.net/Development/NavigationIndicators/
//https://tympanus.net/Development/DotNavigationStyles/
//https://tympanus.net/Development/ArrowNavigationStyles/
//mayby for button
//https://tympanus.net/codrops/2018/04/25/particle-effects-for-buttons/
//https://tympanus.net/Tutorials/AnimatedMenuIcon/

//some small effects for like or search https://tympanus.net/codrops/2018/05/02/ideas-for-proximity-feedback-with-progressive-hover-effects/

// slide https://tympanus.net/codrops/2018/08/01/slide-box-menu/

//https://tympanus.net/codrops/2018/01/10/decorative-letter-animations/

// menu animation https://tympanus.net/codrops/2017/10/17/dynamic-shape-overlays-with-svg/
//https://tympanus.net/codrops/2017/08/01/inspiration-for-menu-hover-effects/
//https://tympanus.net/Development/LineMenuStyles/
//https://tympanus.net/Development/TextInputEffects/
//https://tympanus.net/Development/ButtonStylesInspiration/
//https://tympanus.net/Development/CreativeButtons/
//https://tympanus.net/Development/ProgressButtonStyles/
//https://tympanus.net/Development/CreativeLinkEffects/
//https://tympanus.net/Development/DistortedButtonEffects/
//https://tympanus.net/Development/Animocons/
//https://tympanus.net/Development/AnimatedSVGIcons/
// /https://tympanus.net/Development/AnimatedCheckboxes/
//https://tympanus.net/Tutorials/AnimatedBorderMenus/index.html


//https://tympanus.net/Development/TooltipAnimations/

//https://tympanus.net/codrops/2017/06/07/some-letter-effects-and-interaction-ideas/

// notification
//https://tympanus.net/Development/NotificationStyles/bar-slidetop.html

//https://tympanus.net/Development/RainEffect/#slide-4
//https://tympanus.net/Tutorials/CircularProgressButton/
//https://tympanus.net/Development/ResponsiveMultiLevelMenu/index5.html
//https://tympanus.net/Development/SimpleDropDownEffects/index3.html
// /https://tympanus.net/Tutorials/SVGRipples/index.html

//web examples
//https://dribbble.com/shots/7193352/attachments/192093?mode=media
//https://dribbble.com/shots/7193574-Dribbble-Shot-HD/attachments/192347?mode=media
//https://dribbble.com/shots/7199067--Promotion-of-social-media
//https://dribbble.com/shots/7195135-Shecluded-A-Female-Inclusive-Loan-Company