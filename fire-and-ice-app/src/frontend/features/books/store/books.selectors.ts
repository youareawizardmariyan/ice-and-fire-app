import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './books.state';

const selectorBooks = createFeatureSelector<BookState>('books');

export const selectBooks = createSelector(selectorBooks, (state) => state.books);

export const selectBooksIsLoading = createSelector(selectorBooks, (state) => state.isLoading);
