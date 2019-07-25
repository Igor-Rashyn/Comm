import { NgrxFormsLoaded } from './ngrx-forms.actions';
import {
  NgrxFormsState,
  Entity,
  initialState,
  reducer
} from './ngrx-forms.reducer';

describe('NgrxForms Reducer', () => {
  const getNgrxFormsId = it => it['id'];
  let createNgrxForms;

  beforeEach(() => {
    createNgrxForms = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid NgrxForms actions ', () => {
    it('should return set the list of known NgrxForms', () => {
      const ngrxFormss = [
        createNgrxForms('PRODUCT-AAA'),
        createNgrxForms('PRODUCT-zzz')
      ];
      const action = new NgrxFormsLoaded(ngrxFormss);
      const result: NgrxFormsState = reducer(initialState, action);
      const selId: string = getNgrxFormsId(result.list[1]);

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
