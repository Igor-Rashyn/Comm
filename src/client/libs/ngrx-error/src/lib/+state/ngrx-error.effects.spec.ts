import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { NgrxErrorEffects } from './ngrx-error.effects';
import { LoadNgrxError, NgrxErrorLoaded } from './ngrx-error.actions';

describe('NgrxErrorEffects', () => {
  let actions: Observable<any>;
  let effects: NgrxErrorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        NgrxErrorEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(NgrxErrorEffects);
  });

  describe('loadNgrxError$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadNgrxError() });
      expect(effects.loadNgrxError$).toBeObservable(
        hot('-a-|', { a: new NgrxErrorLoaded([]) })
      );
    });
  });
});
