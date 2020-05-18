import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HomeComponent } from './home.component';


@NgModule({
  imports: [
    CommonModule,
    // MatSidenavModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomeComponent /*, resolve: { HomeResolverService } */}
    ]),
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
