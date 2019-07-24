import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'community-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush //TODO: read
})
export class LoginComponent implements OnInit {
  data$: Observable<any>;

  constructor() {}

  ngOnInit() {
    this.data$;
  }
}
