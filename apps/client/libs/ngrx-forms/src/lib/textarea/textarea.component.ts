import { Field } from './../+state/ngrx-forms.interfaces';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'community-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent {
  @Input() field: Field;
  @Input() group: FormGroup;
}
