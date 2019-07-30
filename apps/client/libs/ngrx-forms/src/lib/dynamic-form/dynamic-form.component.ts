import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Field } from './../+state/ngrx-forms.interfaces';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  tap,
  takeUntil,
  debounceTime,
  combineLatest,
  map,
  filter
} from 'rxjs/operators';

@Component({
  selector: 'community-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() structure$: Observable<Field[]>;
  @Input() data$: Observable<any>;
  @Input() touchedForm$: Observable<boolean>;
  @Output() updateForm: EventEmitter<any> = new EventEmitter(); //TODO:
  unsubscribe$: Subject<void> = new Subject(); //TODO:
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.structure$
      .pipe(
        map(this.formBuilder),
        tap(f => (this.form = f)),
        tap(f => this.listenFormChanges(f)),
        combineLatest(this.data$), //TODO:
        takeUntil(this.unsubscribe$) //TODO:
      )
      .subscribe(this.patchValue);

    if (this.touchedForm$) {
      this.touchedForm$
        .pipe(
          filter(f => !f && !!this.form),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(_ => this.form.reset());
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private formBuilder = (structure: Field[]): FormGroup => {
    const group = this.fb.group({});
    structure.forEach(field =>
      group.addControl(field.name, this.control(field))
    );
    return group;
  };

  private control = (field: Field): FormControl => {
    return this.fb.control('', field.validator);
  };

  private patchValue = ([form, data]) => {
    !!data
      ? form.patchValue(data, { emitEvent: false })
      : form.patchValue({}, { emitEvent: false });
  };

  private listenFormChanges(form: FormGroup) {
    form.valueChanges
      .pipe(
        debounceTime(100),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((changes: any) => this.updateForm.emit(changes));
  }
}
