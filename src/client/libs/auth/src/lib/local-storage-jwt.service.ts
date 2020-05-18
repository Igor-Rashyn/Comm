import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class LocalStorageJwtService {
  private storage: any;

  constructor() {
    this.storage = localStorage; // sessionStorage
  }

  public get(): Observable<string | null> {
    const data = this.storage.getItem('jwtToken');
    // const expiresAt = this.storage.getItem('expires_at');
    if (data) {
      return of(data);
    }
    return of(null);
  }

  // public set(data: { expiresIn: string; idToken: string }): Observable<Object> {
  public set(data: string): Observable<string> {
    //TODO: change to interface
    // const expiresAt = moment().add(data.expiresIn, 'second');

    this.storage.setItem('jwtToken', data);
    // this.storage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    return of(data);
  }

  public remove(): Observable<boolean> {
    this.storage.removeItem('jwtToken');
    // this.storage.removeItem('expires_at');
    return of(true);
  }
}
