import { AuthFacade } from './../+state/auth.facade';
import { Field, NgrxFormsFacade } from '@community/ngrx-forms';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'username',
    placeholder: 'User name',
    validator: [Validators.required]
  },
  {
    type: 'INPUT',
    name: 'email',
    placeholder: 'Email',
    validator: [Validators.required]
  },
  {
    type: 'INPUT',
    name: 'password',
    placeholder: 'Password',
    validator: [Validators.required],
    attrs: {
      type: 'password'
    }
  }
];

@Component({
  selector: 'community-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  structure$: Observable<Field[]>;
  data$: Observable<any>;

  constructor(
    private formsFacade: NgrxFormsFacade,
    private facade: AuthFacade
  ) {}

  ngOnInit() {
    this.formsFacade.setStructure(structure);
    this.data$ = this.formsFacade.data$;
    this.structure$ = this.formsFacade.structure$;
  }

  updateForm(changes: any) {
    this.formsFacade.updateData(changes);
  }

  submit() {
    this.facade.register();
  }

  ngOnDestroy() {
    this.formsFacade.initializeForm();
  }
}
