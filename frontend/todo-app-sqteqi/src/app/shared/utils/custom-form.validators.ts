import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const customValidators = {
  /**
   * @description Validates if two given controls from the form have equal values,
   *
   * @param firstControlName: string - The given name of the first control to be compared
   * @param secondControlName: string - The given name of the first control to be compared
   *
   * @returns {fieldsDoesNotMatch: true} | null
   *
   * @example
   *  myForm = new FormGroup({
   *    firstControl: new FormControl('', []),
   *    secondControl: new FormControl('', []),
   *    thirdControl: new FormControl('', [])
   *  }, customValidators.matchValidator('firstControl', 'secondControl'));
   */
  matchValidator: (firstControlName: string, secondControlName: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const firstControl = control.get(firstControlName);
      const secondControl = control.get(secondControlName);

      return firstControl?.value !== secondControl?.value ? {fieldsDoesNotMatch: true} : null;
    }
  }
}
