import { NgrxFormsFacade } from './../+state/ngrx-forms.facade';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { Errors } from '../+state/ngrx-forms.interfaces';

@Component({
  selector: 'community-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListErrorsComponent implements OnInit, OnDestroy {
  errors$: Observable<Errors>;

  constructor(
    private formsFacade: NgrxFormsFacade
  ) {} //TODO: read

  ngOnInit() {
     this.errors$ = this.formsFacade.errors$;
  }

  ngOnDestroy() {
    this.formsFacade.initializeErrors();
  }
}
