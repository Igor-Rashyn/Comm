import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { NgrxFormsEffects } from './ngrx-forms.effects';
import { LoadNgrxForms, NgrxFormsLoaded } from './ngrx-forms.actions';

describe('NgrxFormsEffects', () => {
  let actions: Observable<any>;
  let effects: NgrxFormsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        NgrxFormsEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(NgrxFormsEffects);
  });

  describe('loadNgrxForms$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadNgrxForms() });
      expect(effects.loadNgrxForms$).toBeObservable(
        hot('-a-|', { a: new NgrxFormsLoaded([]) })
      );
    });
  });
});
