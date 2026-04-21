import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getBooks, getBooksSuccess } from './books.actions';
import { map, switchMap } from 'rxjs';
import { BooksService } from '../services/books/books.service';

@Injectable()
export class BooksEffects {
  private actions$ = inject(Actions);
  private booksService = inject(BooksService);

  $books = createEffect(() =>
    this.actions$.pipe(
      ofType(getBooks),
      switchMap(() =>
        this.booksService.getBooks().pipe(map((response) => getBooksSuccess({ response }))),
      ),
    ),
  );
}
