import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@community/api';

@Component({
  selector: 'community-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() user: User;
  @Input() isLoggedIn: boolean;
}