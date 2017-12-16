import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function validator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let forbidden = !nameRe.test(control.value);
        return forbidden ? {
            'appValidate': { value: control.value }
        } : null;
    };
}