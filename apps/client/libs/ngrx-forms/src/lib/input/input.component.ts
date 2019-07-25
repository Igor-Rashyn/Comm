import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from './../+state/ngrx-forms.interfaces';

@Component({
  selector: 'community-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  @Input() field: Field;
  @Input() group: FormGroup;
}
