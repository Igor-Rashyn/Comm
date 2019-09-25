import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ProjectListEffects } from './project-list.effects';
import { LoadProjectList, ProjectListLoaded } from './project-list.actions';

describe('ProjectListEffects', () => {
  let actions: Observable<any>;
  let effects: ProjectListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        ProjectListEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(ProjectListEffects);
  });

  describe('loadProjectList$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadProjectList() });
      expect(effects.loadProjectList$).toBeObservable(
        hot('-a-|', { a: new ProjectListLoaded([]) })
      );
    });
  });
});
