import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class LocalStorageJwtService {
  private storage: any;

  constructor() {
    this.storage = localStorage; // sessionStorage
  }

  public get(): Observable<string | null> {
    const idToken = this.storage.getItem('id_token');
    // const expiresAt = this.storage.getItem('expires_at');
    if (idToken) {
      return of(idToken);
    }
    return of(null);
  }

  // public set(data: { expiresIn: string; idToken: string }): Observable<Object> {
  public set(idToken: string): Observable<string> {
    //TODO: change to interface
    // const expiresAt = moment().add(data.expiresIn, 'second');

    this.storage.setItem('id_token', idToken);
    // this.storage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    return of(idToken);
  }

  public remove(): Observable<boolean> {
    this.storage.removeItem('id_token');
    // this.storage.removeItem('expires_at');
    return of(true);
  }
}
