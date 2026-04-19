import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state) => ({
    ...state,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    isLoggedIn: true,
    error: null,
  })),

  on(AuthActions.loginFail, (state, { error }) => ({
    ...state,
    error,
    isLoggedIn: false,
  })),

  on(AuthActions.logout, () => initialAuthState),

  on(AuthActions.registerFail, (state, { error }) => ({
    ...state,
    error,
    successMessage: null,
  })),

  on(AuthActions.registerSuccess, (state, { response }) => ({
    ...state,
    error: null,
    successMessage: response.message,
  })),

  on(AuthActions.clearAuthMessages, (state) => ({
    ...state,
    error: null,
    successMessage: null,
  })),
);
