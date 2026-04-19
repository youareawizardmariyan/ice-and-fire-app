import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of, tap } from 'rxjs';
import {
  login,
  loginFail,
  loginSuccess,
  register,
  registerFail,
  registerSuccess,
} from './auth.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private DURATION_SNACK = 3000; // 3 seconds

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((response) => loginSuccess({ response })),
          catchError((error) => of(loginFail({ error: error.error.message }))),
        ),
      ),
    ),
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap(({ username, password }) =>
        this.authService.register(username, password).pipe(
          map((response) => registerSuccess({ response })),
          catchError((error) => of(registerFail({ error: error.error.message }))),
        ),
      ),
    ),
  );

  authFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFail, registerFail),
        tap(({ error }) => {
          this.snackBar.open(error, 'Close', { duration: this.DURATION_SNACK });
        }),
      ),
    { dispatch: false },
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess, registerSuccess),
        tap((action) => {
          const message =
            action.type === loginSuccess.type
              ? 'Login successful 🎉'
              : 'Registration successful ✅';

          this.snackBar.open(message, 'Close', { duration: this.DURATION_SNACK });
        }),
      ),
    { dispatch: false },
  );

  loginSuccessNavigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate(['/books'])),
      ),
    { dispatch: false },
  );
}
