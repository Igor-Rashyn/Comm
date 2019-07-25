import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { NgrxFormsEffects } from './ngrx-forms.effects';
import { NgrxFormsFacade } from './ngrx-forms.facade';

import { ngrxFormsQuery } from './ngrx-forms.selectors';
import { LoadNgrxForms, NgrxFormsLoaded } from './ngrx-forms.actions';
import {
  NgrxFormsState,
  Entity,
  initialState,
  reducer
} from './ngrx-forms.reducer';

interface TestSchema {
  ngrxForms: NgrxFormsState;
}

describe('NgrxFormsFacade', () => {
  let facade: NgrxFormsFacade;
  let store: Store<TestSchema>;
  let createNgrxForms;

  beforeEach(() => {
    createNgrxForms = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('ngrxForms', reducer, { initialState }),
          EffectsModule.forFeature([NgrxFormsEffects])
        ],
        providers: [NgrxFormsFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(NgrxFormsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allNgrxForms$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allNgrxForms$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `NgrxFormsLoaded` to manually submit list for state management
     */
    it('allNgrxForms$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allNgrxForms$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new NgrxFormsLoaded([createNgrxForms('AAA'), createNgrxForms('BBB')])
        );

        list = await readFirst(facade.allNgrxForms$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
