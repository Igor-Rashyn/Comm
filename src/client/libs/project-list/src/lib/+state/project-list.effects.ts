import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

import { ProjectListService } from '../project-list.service';
import * as ProjectListActions from './project-list.actions';

@Injectable()
export class ProjectListEffects {
  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectListActions.loadProjectList),
      switchMap(() =>
        this.projectListService.query().pipe(
          map(data => ProjectListActions.loadProjectListSuccess({ projects: data.projects})),
          catchError(error => of(ProjectListActions.loadProjectListFail({error})))
        )
      )
    )
  );

  // favorite = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ArticleListActions.favorite),
  //     map(action => action.slug),
  //     concatMap(slug =>
  //       this.actionsService.favorite(slug).pipe(
  //         map(article => ArticleListActions.favoriteSuccess({ article })),
  //         catchError(error => of(ArticleListActions.favoriteFail(error)))
  //       )
  //     )
  //   )
  // );

  // unFavorite = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ArticleListActions.unFavorite),
  //     map(action => action.slug),
  //     concatMap(slug =>
  //       this.actionsService.unfavorite(slug).pipe(
  //         map(article => ArticleListActions.unFavoriteSuccess({ article })),
  //         catchError(error => of(ArticleListActions.unFavoriteFail(error)))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private projectListService: ProjectListService
  ) {}
}