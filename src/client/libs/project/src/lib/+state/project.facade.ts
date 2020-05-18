import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { ProjectPartialState } from './project.reducer';
import { projectQuery } from './project.selectors';
import { LoadProject } from './project.actions';

@Injectable()
export class ProjectFacade {
  loaded$ = this.store.pipe(select(projectQuery.getLoaded));
  allProject$ = this.store.pipe(select(projectQuery.getAllProject));
  selectedProject$ = this.store.pipe(select(projectQuery.getSelectedProject));

  constructor(private store: Store<ProjectPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadProject());
  }
}
