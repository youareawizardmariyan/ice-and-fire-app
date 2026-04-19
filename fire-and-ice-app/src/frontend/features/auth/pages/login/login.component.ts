import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormErrorComponent } from '../../shared/form-error/form-error';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { clearAuthMessages, login, selectIsLoggedIn } from '../../store';

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
export class LoginComponent {
  private store = inject(Store);
  loginForm: FormGroup;
  $isLoggedIn = this.store.select(selectIsLoggedIn);

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
