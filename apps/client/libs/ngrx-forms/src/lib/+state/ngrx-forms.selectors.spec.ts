import { Entity, NgrxFormsState } from './ngrx-forms.reducer';
import { ngrxFormsQuery } from './ngrx-forms.selectors';

describe('NgrxForms Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNgrxFormsId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createNgrxForms = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      ngrxForms: {
        list: [
          createNgrxForms('PRODUCT-AAA'),
          createNgrxForms('PRODUCT-BBB'),
          createNgrxForms('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('NgrxForms Selectors', () => {
    it('getAllNgrxForms() should return the list of NgrxForms', () => {
      const results = ngrxFormsQuery.getAllNgrxForms(storeState);
      const selId = getNgrxFormsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedNgrxForms() should return the selected Entity', () => {
      const result = ngrxFormsQuery.getSelectedNgrxForms(storeState);
      const selId = getNgrxFormsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = ngrxFormsQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = ngrxFormsQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
