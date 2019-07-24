import { NgrxErrorLoaded } from './ngrx-error.actions';
import {
  NgrxErrorState,
  Entity,
  initialState,
  reducer
} from './ngrx-error.reducer';

describe('NgrxError Reducer', () => {
  const getNgrxErrorId = it => it['id'];
  let createNgrxError;

  beforeEach(() => {
    createNgrxError = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid NgrxError actions ', () => {
    it('should return set the list of known NgrxError', () => {
      const ngrxErrors = [
        createNgrxError('PRODUCT-AAA'),
        createNgrxError('PRODUCT-zzz')
      ];
      const action = new NgrxErrorLoaded(ngrxErrors);
      const result: NgrxErrorState = reducer(initialState, action);
      const selId: string = getNgrxErrorId(result.list[1]);

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
