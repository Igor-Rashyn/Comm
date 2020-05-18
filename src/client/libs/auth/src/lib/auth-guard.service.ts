import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { LocalStorageJwtService } from './local-storage-jwt.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private storage: LocalStorageJwtService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.storage.get().pipe(
      map(token => {
        if (!token) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }),
      take(1) //TODO: read
    );
  }
}
