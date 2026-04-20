import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../utils';
import { FormErrorComponent } from '../../shared/form-error/form-error';
import { Store } from '@ngrx/store';
import { clearAuthMessages, register } from '../../store';

@Component({
  selector: 'app-register',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    FormErrorComponent,
  ],
  templateUrl: './register.html',
})
export class RegisterComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  registerForm: FormGroup = this.fb.group(
    {
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator,
    },
  );

  ngOnInit(): void {
    this.store.dispatch(clearAuthMessages());
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.getRawValue();

      this.store.dispatch(register({ username, password }));
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get f() {
    return this.registerForm.controls;
  }
}
