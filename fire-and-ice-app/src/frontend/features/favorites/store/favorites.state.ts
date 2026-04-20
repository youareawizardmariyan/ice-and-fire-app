import { BooksBEResponse } from '../../books/store';

export interface FavoritesState {
  favorites: BooksBEResponse;
}

export const initialFavoritesState: FavoritesState = {
  favorites: [],
};
