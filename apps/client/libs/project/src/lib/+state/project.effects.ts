import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { ProjectPartialState } from './project.reducer';
import {
  LoadProject,
  ProjectLoaded,
  ProjectLoadError,
  ProjectActionTypes
} from './project.actions';

@Injectable()
export class ProjectEffects {
  @Effect() loadProject$ = this.dataPersistence.fetch(
    ProjectActionTypes.LoadProject,
    {
      run: (action: LoadProject, state: ProjectPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new ProjectLoaded([]);
      },

      onError: (action: LoadProject, error) => {
        console.error('Error', error);
        return new ProjectLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectPartialState>
  ) {}
}
