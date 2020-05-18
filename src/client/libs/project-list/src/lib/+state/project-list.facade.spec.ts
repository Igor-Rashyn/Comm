import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ProjectListEffects } from './project-list.effects';
import { ProjectListFacade } from './project-list.facade';

import { projectListQuery } from './project-list.selectors';
import { LoadProjectList, ProjectListLoaded } from './project-list.actions';
import {
  ProjectListState,
  Entity,
  initialState,
  reducer
} from './project-list.reducer';

interface TestSchema {
  projectList: ProjectListState;
}

describe('ProjectListFacade', () => {
  let facade: ProjectListFacade;
  let store: Store<TestSchema>;
  let createProjectList;

  beforeEach(() => {
    createProjectList = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('projectList', reducer, { initialState }),
          EffectsModule.forFeature([ProjectListEffects])
        ],
        providers: [ProjectListFacade]
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
      facade = TestBed.get(ProjectListFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allProjectList$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allProjectList$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `ProjectListLoaded` to manually submit list for state management
     */
    it('allProjectList$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allProjectList$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new ProjectListLoaded([
            createProjectList('AAA'),
            createProjectList('BBB')
          ])
        );

        list = await readFirst(facade.allProjectList$);
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
