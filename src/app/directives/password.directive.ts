import { Directive, Attribute, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPassword]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: PasswordDirective, multi: true }
    ]
})
export class PasswordDirective implements Validator {
  @Input('appPassword')
  password: string;

  validate(c: AbstractControl): ValidationErrors | null {
    return (this.password && c.value && c.value !== this.password) ? { 'appPassword': { value: c.value } } : null;
  }
}
