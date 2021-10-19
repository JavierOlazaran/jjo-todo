import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const customValidators = {
  matchValidator: (firstControlName: string, secondControlName: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const firstControl = control.get(firstControlName);
      const secondControl = control.get(secondControlName);

      return firstControl?.value !== secondControl?.value ? {fieldsDoesNotMatch: true} : null;
    }
  }
}
