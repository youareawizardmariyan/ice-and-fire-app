import { createAction, props } from '@ngrx/store';
import { BooksBEResponse } from './books.models';

export const getBooks = createAction('getBooks', props<{ response: BooksBEResponse }>);

export const getBooksSuccess = createAction(
  'getBooks Success',
  props<{ response: BooksBEResponse }>(),
);
