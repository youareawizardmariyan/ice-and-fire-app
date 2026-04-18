import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth';
import {
  login,
  loginFail,
  loginSuccess,
  register,
  registerFail,
  registerSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

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
}
