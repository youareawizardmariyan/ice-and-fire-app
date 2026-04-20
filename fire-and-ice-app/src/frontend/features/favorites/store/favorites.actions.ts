import { createAction, props } from '@ngrx/store';
import { SingleBook } from '../../books/store';

export const addFavorite = createAction('[Books] Add Favorite', props<{ book: SingleBook }>());

export const removeFavorite = createAction(
  '[Books] Remove Favorite',
  props<{ book: SingleBook }>(),
);
