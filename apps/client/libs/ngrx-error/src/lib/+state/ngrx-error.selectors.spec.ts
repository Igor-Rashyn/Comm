import { Entity, NgrxErrorState } from './ngrx-error.reducer';
import { ngrxErrorQuery } from './ngrx-error.selectors';

describe('NgrxError Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNgrxErrorId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createNgrxError = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      ngrxError: {
        list: [
          createNgrxError('PRODUCT-AAA'),
          createNgrxError('PRODUCT-BBB'),
          createNgrxError('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('NgrxError Selectors', () => {
    it('getAllNgrxError() should return the list of NgrxError', () => {
      const results = ngrxErrorQuery.getAllNgrxError(storeState);
      const selId = getNgrxErrorId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedNgrxError() should return the selected Entity', () => {
      const result = ngrxErrorQuery.getSelectedNgrxError(storeState);
      const selId = getNgrxErrorId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = ngrxErrorQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = ngrxErrorQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
