import { Injectable } from '@angular/core';
import { ApiService, UserResponse } from '@community/api';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginUser, LoginUserRequest, NewUserRequest, NewUser } from './auth.interfaces';

@Injectable({
  providedIn: 'root' //TODO: maybe to delete
})
export class AuthService {
  constructor(private apiService: ApiService) { }

  user(): Observable<UserResponse> {
    return this.apiService.get<UserResponse>('/user');
  }

  login(credentials: LoginUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, LoginUserRequest>('/users/login', { user: credentials });
  }

  register(credentials: NewUser): Observable<UserResponse> {
    return this.apiService
      .post<UserResponse, NewUserRequest>('/users', { user: credentials });
  }
}
