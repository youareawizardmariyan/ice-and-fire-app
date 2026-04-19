import { createReducer, on } from '@ngrx/store';
import { initialBookState } from './books.state';
import { getBooks, getBooksSuccess } from './books.actions';

export const booksReducer = createReducer(
  initialBookState,

  on(getBooks, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(getBooksSuccess, (state, { response }) => ({
    ...state,
    books: response,
    isLoading: false,
  })),
);
