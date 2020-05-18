import { ApiService } from '@community/api';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Project } from './+state/project-list.reducer';

@Injectable()
export class ProjectListService {
  constructor(private apiService: ApiService) {}

  query(): Observable<{ projects: Project[]}> {
    return this.apiService.get('/projects');

    /*+ (config.type === 'FEED' ? '/feed' : ''),*/
      //this.toHttpParams(config.filters)
  }

  private toHttpParams(params) {
    return Object.getOwnPropertyNames(params).reduce(
      (p, key) => p.set(key, params[key]),
      new HttpParams()
    );
  }
}