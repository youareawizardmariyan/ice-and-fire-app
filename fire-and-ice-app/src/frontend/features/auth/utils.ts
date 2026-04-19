import { AbstractControl, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (form: AbstractControl) => {
  const password = form.get('password');
  const repeatPassword = form.get('repeatPassword');

  if (!password || !repeatPassword) return null;

  const errors = repeatPassword.errors || {};

  if (
    password.value !== repeatPassword.value &&
    repeatPassword.value !== '' &&
    password.value !== ''
  ) {
    repeatPassword.setErrors({
      ...errors,
      passwordMismatch: true,
    });
  } else {
    delete errors['passwordMismatch'];

    if (Object.keys(errors).length === 0) {
      repeatPassword.setErrors(null);
    } else {
      repeatPassword.setErrors(errors);
    }
  }

  return null;
};
