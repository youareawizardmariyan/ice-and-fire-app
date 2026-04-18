import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(selectAuth, (state) => state.isLoggedIn);

export const selectAuthError = createSelector(selectAuth, (state) => state.error);

export const selectAuthSuccessMsg = createSelector(selectAuth, (state) => state.successMessage);
