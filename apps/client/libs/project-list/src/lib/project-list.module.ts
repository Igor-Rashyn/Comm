import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListItemComponent } from './project-list-item/project-list-item.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProjectList from './+state/project-list.reducer';
import { ProjectListEffects } from './+state/project-list.effects';
import { ProjectListFacade } from './+state/project-list.facade';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromProjectList.PROJECTLIST_FEATURE_KEY,
      fromProjectList.reducer
    ),
    EffectsModule.forFeature([ProjectListEffects])
  ],
  declarations: [ProjectListItemComponent, ProjectListComponent],
  providers: [ProjectListFacade]
})
export class ProjectListModule {}
