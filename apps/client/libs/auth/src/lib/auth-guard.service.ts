import { LocalStorageJwtService } from './local-storage-jwt.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
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
