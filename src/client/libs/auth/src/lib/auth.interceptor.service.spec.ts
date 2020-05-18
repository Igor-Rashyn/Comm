import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { LocalStorageJwtService } from './local-storage-jwt.service';
import { AuthInterceptorService } from './auth.interceptor.service';

describe('AuthInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [AuthInterceptorService, LocalStorageJwtService],
    });
  });

  it('should be created', inject([AuthInterceptorService], (service: AuthInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});