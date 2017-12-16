import { Directive, Input } from "@angular/core";
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from "@angular/forms";
import { validator } from "./validate";

@Directive({
    selector: '[appValidate]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: ValidateDirective, multi: true }
    ]
})
export class ValidateDirective implements Validator {
    @Input('appValidate')
    nameRe: string;

    validate(c: AbstractControl): ValidationErrors | null {
        return this.nameRe ? validator(new RegExp(this.nameRe, 'i'))(c) : null;
    }
}