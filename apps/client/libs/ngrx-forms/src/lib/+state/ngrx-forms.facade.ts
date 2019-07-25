import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as FormActions from './ngrx-forms.actions';
import { NgrxFormsState } from './ngrx-forms.interfaces';
import { ngrxFormsQuery } from './ngrx-forms.selectors';

@Injectable()
export class NgrxFormsFacade {
  data$ = this.store.select(ngrxFormsQuery.getData);
  structure$ = this.store.select(ngrxFormsQuery.getStructure);
  errors$ = this.store.select(ngrxFormsQuery.getErrors);
  touched$ = this.store.select(ngrxFormsQuery.isTouched);

  constructor(private store: Store<NgrxFormsState>) {}

  setStructure(structure: any) {
    this.store.dispatch(FormActions.setStructure(structure));
  }

  setData(data: any) {
    this.store.dispatch(FormActions.setData(data));
  }

  updateData(data: any) {
    this.store.dispatch(FormActions.updateData(data));
  }

  initializeForm() {
    this.store.dispatch(FormActions.initializeForm());
  }

  initializeErrors() {
    this.store.dispatch(FormActions.initializeErrors());
  }

  resetForm() {
    this.store.dispatch(FormActions.resetForm());
  }
}
