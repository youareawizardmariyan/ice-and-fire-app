import { BooksBEResponse } from './books.models';

export interface BookState {
  books: BooksBEResponse;
  isLoading: boolean;
}

export const initialBookState: BookState = {
  books: [],
  isLoading: false,
};
