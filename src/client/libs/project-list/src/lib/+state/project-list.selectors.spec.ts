import { Entity, ProjectListState } from './project-list.reducer';
import { projectListQuery } from './project-list.selectors';

describe('ProjectList Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getProjectListId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createProjectList = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      projectList: {
        list: [
          createProjectList('PRODUCT-AAA'),
          createProjectList('PRODUCT-BBB'),
          createProjectList('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('ProjectList Selectors', () => {
    it('getAllProjectList() should return the list of ProjectList', () => {
      const results = projectListQuery.getAllProjectList(storeState);
      const selId = getProjectListId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedProjectList() should return the selected Entity', () => {
      const result = projectListQuery.getSelectedProjectList(storeState);
      const selId = getProjectListId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = projectListQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = projectListQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
