import { AuthFacade } from './../+state/auth.facade';
import { Field, NgrxFormsFacade } from '@community/ngrx-forms';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';

const structure: Field[] = [
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
  selector: 'community-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush //TODO: read
})
export class LoginComponent implements OnInit, OnDestroy {
  data$: Observable<any>;
  structure$: Observable<Field[]>;

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
    this.facade.login();
  }

  ngOnDestroy() {
    this.formsFacade.initializeForm();
  }
}
