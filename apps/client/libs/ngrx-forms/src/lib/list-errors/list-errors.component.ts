import { NgrxFormsFacade } from './../+state/ngrx-forms.facade';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'community-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListErrorsComponent implements OnInit, OnDestroy {
  errors: string[];
  unsubscribe$: Subject<void> = new Subject(); //TODO: read

  constructor(
    private formsFacade: NgrxFormsFacade,
    private changeDetectorRef: ChangeDetectorRef
  ) {} //TODO: read

  ngOnInit() {
    this.formsFacade.errors$.subscribe(err => {
      this.errors = Object.keys(err || {}).map(key => `${key} ${err[key]}`);
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete(); //TODO: read
    this.formsFacade.initializeErrors();
  }
}
