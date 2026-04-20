import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BooksBEResponse } from '../../store';
import { SearchService } from '../../services/search.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.html',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
})
export class BooksComponent implements OnInit {
  private searchService = inject(SearchService);
  private booksService = inject(BooksService);
  books = signal<BooksBEResponse>([]);
  loading = signal(true);

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
    // TODO avoid manual subscription
    this.booksService.getBooks().subscribe((data) => {
      this.books.set(data);
      this.loading.set(false);
    });
  }
}
