import { createReducer, on, Action } from '@ngrx/store';
import * as ProjectListActions from './project-list.actions';


export const PROJECTLIST_FEATURE_KEY = 'projectList';

export interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface ProjectList {
  projects: Project[];
  loading: boolean; // has the ProjectList list been loaded
  error?: any; 
}

export interface ProjectListState {
  readonly [PROJECTLIST_FEATURE_KEY]: ProjectList;
}

export const initialState: ProjectList = {
  projects: [],
  loading: false
};

const reducer = createReducer(
  initialState,
  on(ProjectListActions.loadProjectList, (state, _) => {
    const projects = { ...state.projects, loading: true}
    return {...state, projects}
  }),
  on(ProjectListActions.loadProjectListSuccess, (state, action) => {
    const projects = {
      ...state.projects,
      entities: action.projects,
      loading: false
    };
    return { ...state, projects };
  }),
  on(ProjectListActions.loadProjectListFail, (state, _) => {
    const projects = {
      ...state.projects,
      projects: [],
      loading: false
    };
    return { ...state, projects };
  })
  // ,
  // on(
  //   ProjectListActions.unFavoriteSuccess,
  //   ProjectListActions.favoriteSuccess,
  //   (state, action) => ({
  //     ...state,
  //     articles: replaceProject(state.projects, action.project)
  //   })
  // )
);


// function replaceProject(projects: Articles, payload: Project): Articles {
//   const idx = projects.entities.findIndex(
//     a => a.titel === payload.titel
//   );
//   const entities = [
//     ...projects.entities.slice(0, idx),
//     Object.assign({}, projects.entities[idx], payload),
//     ...projects.entities.slice(idx + 1)
//   ];
//   return { ...projects, entities, loading: false, loaded: true };
// }

export function projectListReducer(
  state: ProjectList | undefined,
  action: Action
) : ProjectList {
  return reducer(state, action)
}