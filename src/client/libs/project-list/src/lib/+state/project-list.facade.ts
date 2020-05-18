import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProjectListState } from './project-list.reducer';
import { projectListQuery } from './project-list.selectors';
import * as ProjectListActions from './project-list.actions';

@Injectable()
export class ProjectListFacade {
  projects$ = this.store.select(projectListQuery.getProjects);
  isLoading$ = this.store.select(projectListQuery.isLoading);

  constructor(private store: Store<ProjectListState>) {}

  // favorite(slug: string) {
  //   this.store.dispatch(ProjectListActions.favorite({ id }));
  // }

  // unFavorite(slug: string) {
  //   this.store.dispatch(ProjectListActions.unFavorite({ id }));
  // }

  navigateToProject(id: string) {
    this.store.dispatch({
      type: '[router] Go',
      payload: { path: ['/project', id] }
    });
  }
}