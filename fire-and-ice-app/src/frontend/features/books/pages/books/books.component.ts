import { Component, computed, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchService } from '../../services/search/search.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { getBooks, selectBooks, SingleBook } from '../../store';
import { addFavorite, removeFavorite, selectFavoriteBooks } from '../../../favorites/store';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.html',
  styleUrl: './books.styles.scss',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, RouterModule],
})
export class BooksComponent implements OnInit {
  private searchService = inject(SearchService);
  private store = inject(Store);

  favorites = this.store.selectSignal(selectFavoriteBooks);
  books = toSignal(this.store.select(selectBooks), { initialValue: [] });
  loading = computed(() => this.books().length === 0);

  filteredBooks = computed(() => {
    const books = this.books();
    const searchTerm = this.searchService.search().toLowerCase();

    if (!searchTerm) return books;

    return books.filter(
      (book) =>
        book.name.toLowerCase().includes(searchTerm) ||
        book.authors[0]?.toLowerCase().includes(searchTerm) ||
        book.country.toLowerCase().includes(searchTerm),
    );
  });

  ngOnInit(): void {
    this.store.dispatch(getBooks());
  }

  toggleFavorite(book: SingleBook) {
    if (this.favorites().find((v) => v.name === book.name)) {
      this.store.dispatch(removeFavorite({ book }));
      return;
    }

    this.store.dispatch(addFavorite({ book }));
  }

  isFavorite(book: SingleBook) {
    return this.favorites().some((b) => b.name === book.name);
  }
}
