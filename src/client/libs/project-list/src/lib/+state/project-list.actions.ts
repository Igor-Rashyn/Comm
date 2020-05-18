import { createAction, props } from '@ngrx/store';
import { Project } from './project-list.reducer';

export const loadProjectList = createAction('[project-list] LOAD_PROJECT_LIST');
export const loadProjectListSuccess = createAction(
  '[project-list] LOAD_PROJECT_LIST_SUCCESS',
  props<{ projects: Project[]}>()
);
export const loadProjectListFail = createAction(
  '[project-list] LOAD_PROJECT_LIST_FAIL',
  props<{ error: Error}>()
);


//add actions for follow/unfollow

