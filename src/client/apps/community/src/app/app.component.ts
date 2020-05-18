import { User } from '@community/api';
import { AuthFacade } from '@community/auth';
import { ChangeDetectionStrategy, Component, OnInit, ApplicationRef } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { LocalStorageJwtService } from '@community/auth';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'community-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;
constructor(
    private authFacade: AuthFacade,
    private localStorageJwtService: LocalStorageJwtService,
    private router: Router,
    private appRef: ApplicationRef,
  ) {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        tap(e => this.appRef.tick()),
      )
      .subscribe();
  }

  ngOnInit() {
    this.user$ = this.authFacade.user$;
    this.isLoggedIn$ = this.authFacade.isLoggedIn$;
    this.localStorageJwtService
      .get()
      .pipe(
        take(1),
        filter(token => !!token),
      )
      .subscribe(token => this.authFacade.user());
  }

}
