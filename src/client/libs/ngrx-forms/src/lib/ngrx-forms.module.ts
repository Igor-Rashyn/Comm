import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromNgrxForms from './+state/ngrx-forms.reducer';
import { NgrxFormsEffects } from './+state/ngrx-forms.effects';
import { NgrxFormsFacade } from './+state/ngrx-forms.facade';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-form/dynamic-field.directive';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { ListErrorsPipe } from './list-errors/list-errors.pipe';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, //TODO: read
    StoreModule.forFeature(
      fromNgrxForms.NGRXFORMS_FEATURE_KEY,
      fromNgrxForms.ngrxFormReducer,
      { initialState: fromNgrxForms.initialState }
    ),
    EffectsModule.forFeature([NgrxFormsEffects]),
    ReactiveComponentModule //TODO:
  ],
  providers: [NgrxFormsFacade, NgrxFormsEffects],
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    ListErrorsComponent,
    InputComponent,
    TextareaComponent,
    ListErrorsPipe
  ],
  entryComponents: [InputComponent, TextareaComponent], //TODO: read
  exports: [DynamicFormComponent, ListErrorsComponent] //TODO: read
})
export class NgrxFormsModule {}
