import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: EqualValidator, multi: true }
    ]
})
export class EqualValidator implements Validator {
  @Input()
  public validateEqual: string

  validate(c: AbstractControl): ValidationErrors | null {
    let v = c.value;
    let e = c.root.get(this.validateEqual);
    return (e && v !== e.value) ? { 'validateEqual': c.value } : null;
  }
}
