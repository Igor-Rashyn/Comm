import { FormGroup } from '@angular/forms';
import {
  Directive,
  OnInit,
  OnChanges,
  Input,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  Type
} from '@angular/core';

import { InputComponent } from '../input/input.component';
import { TextareaComponent } from './../textarea/textarea.component';
import { Field } from './../+state/ngrx-forms.interfaces';

const componentsMapper: { [key: string]: Type<any> } = {
  INPUT: InputComponent,
  TEXTAREA: TextareaComponent
};

@Directive({
  selector: '[communityDynamicField]' //TODO: read
})
export class DynamicFieldDirective implements OnInit, OnChanges {
  @Input() field: Field;
  @Input() group: FormGroup;
  component: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver, //TODO: read
    private container: ViewContainerRef //TODO: read
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.field = this.field;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    const component = this.resolver.resolveComponentFactory<any>(
      componentsMapper[this.field.type]
    );
    this.component = this.container.createComponent(component);
    this.component.instance.field = this.field;
    this.component.instance.group = this.group;
  }
}
