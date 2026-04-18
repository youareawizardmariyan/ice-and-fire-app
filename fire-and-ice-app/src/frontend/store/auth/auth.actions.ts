import { createAction, props } from '@ngrx/store';
import { BEResponse } from './auth.models';

export const login = createAction('Login', props<{ username: string; password: string }>());

export const loginSuccess = createAction('Login Success', props<{ response: BEResponse }>());

export const loginFail = createAction('Login Fail', props<{ error: string }>());

export const logout = createAction('Logout');

export const clearAuthMessages = createAction('Clear Auth Messages');

export const register = createAction('Register', props<{ username: string; password: string }>());

export const registerSuccess = createAction('Register Success', props<{ response: BEResponse }>());

export const registerFail = createAction('Register Fail', props<{ error: string }>());
