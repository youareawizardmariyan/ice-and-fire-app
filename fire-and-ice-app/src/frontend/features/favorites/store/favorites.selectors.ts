import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.state';

const selectFavorites = createFeatureSelector<FavoritesState>('favorites');

export const selectFavoriteBooks = createSelector(selectFavorites, (state) => state.favorites);
