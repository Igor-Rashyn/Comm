import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  PROJECT_FEATURE_KEY,
  initialState as projectInitialState,
  projectReducer
} from './+state/project.reducer';
import { ProjectEffects } from './+state/project.effects';
import { ProjectFacade } from './+state/project.facade';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),

    StoreModule.forFeature(PROJECT_FEATURE_KEY, projectReducer, {
      initialState: projectInitialState
    }),

    EffectsModule.forFeature([ProjectEffects])
  ],
  providers: [ProjectFacade]
})
export class ProjectModule {}
