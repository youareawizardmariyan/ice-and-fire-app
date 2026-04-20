import { createReducer, on } from '@ngrx/store';
import { initialFavoritesState } from './favorites.state';
import { addFavorite, removeFavorite } from './favorites.actions';

export const favoritesReducer = createReducer(
  initialFavoritesState,

  on(addFavorite, (state, { book }) => ({
    ...state,
    favorites: [...state.favorites, book],
  })),

  on(removeFavorite, (state, { book }) => ({
    ...state,
    favorites: state.favorites.filter((b) => b.name !== book.name),
  })),
);
