import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { BooksBEResponse, getBooks, selectBooks, selectBooksIsLoading } from '../../store';

@Component({
  selector: 'app-books',
  templateUrl: './books.html',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, AsyncPipe],
})
export class BooksComponent implements OnInit {
  private store = inject(Store);

  books$: Observable<BooksBEResponse> = this.store.select(selectBooks);
  loading$: Observable<boolean> = this.store.select(selectBooksIsLoading);

  ngOnInit(): void {
    this.store.dispatch(getBooks());
  }
}
