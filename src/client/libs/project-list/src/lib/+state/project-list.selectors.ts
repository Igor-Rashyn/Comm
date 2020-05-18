import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectList, PROJECTLIST_FEATURE_KEY } from './project-list.reducer';

const getProjectList = createFeatureSelector<ProjectList>(PROJECTLIST_FEATURE_KEY);
export const getProjects = createSelector(getProjectList, (state: ProjectList) => state.projects);
export const isLoading = createSelector(getProjectList, (state: ProjectList) => state.loading);

export const projectListQuery = {
  getProjects,
  isLoading
};