import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormErrorComponent } from '../../shared/form-error/form-error';
import { Store } from '@ngrx/store';
import { clearAuthMessages, login, selectAuthError } from '../../../../store/auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    FormErrorComponent,
    AsyncPipe,
  ],
  templateUrl: './login.html',
})
export class Login {
  loginForm: FormGroup;
  store = inject(Store);
  $loginError = this.store.select(selectAuthError);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(clearAuthMessages());
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.getRawValue();

      this.store.dispatch(login({ username, password }));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}
