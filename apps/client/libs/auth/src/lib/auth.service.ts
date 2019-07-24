import { Injectable } from '@angular/core';
import { ApiService, User } from '@community/api';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' //TODO: maybe to delete
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  user(): Observable<{ user: User }> {
    return this.apiService.get('/user');
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.apiService.post('/users/login', { user: credentials }).pipe(
      shareReplay(), //TODO: check
      map(r => r.user)
    );
  }

  register(credentials: {
    username: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.apiService
      .post('/users', { user: credentials })
      .pipe(map(r => r.user));
  }
}
