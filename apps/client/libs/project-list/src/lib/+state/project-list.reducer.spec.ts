import { ProjectListLoaded } from './project-list.actions';
import {
  ProjectListState,
  Entity,
  initialState,
  reducer
} from './project-list.reducer';

describe('ProjectList Reducer', () => {
  const getProjectListId = it => it['id'];
  let createProjectList;

  beforeEach(() => {
    createProjectList = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid ProjectList actions ', () => {
    it('should return set the list of known ProjectList', () => {
      const projectLists = [
        createProjectList('PRODUCT-AAA'),
        createProjectList('PRODUCT-zzz')
      ];
      const action = new ProjectListLoaded(projectLists);
      const result: ProjectListState = reducer(initialState, action);
      const selId: string = getProjectListId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
