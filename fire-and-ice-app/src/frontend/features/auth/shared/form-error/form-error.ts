import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  templateUrl: './form-error.html',
})
export class FormErrorComponent {
  @Input() control!: AbstractControl | null;

  get errorMessage(): string | null {
    if (!this.control || !this.control.errors || !this.control.touched) {
      return null;
    }

    if (this.control.errors['required']) {
      return 'Field is required';
    }

    if (this.control.errors['passwordMismatch']) {
      return 'Passwords do not match';
    }

    return 'Invalid field';
  }
}
