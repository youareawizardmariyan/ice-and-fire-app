import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(selectAuth, (state) => state.isLoggedIn);
export const selectUsername = createSelector(selectAuth, (state) => state.username);
