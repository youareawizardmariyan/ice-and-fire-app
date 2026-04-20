import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBooks } from '../../store';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.html',
  imports: [RouterLink, DatePipe],
})
export class BookDetailsComponent {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private books$ = this.store.select(selectBooks);
  private bookId = this.route.snapshot.paramMap.get('id');
  private books = toSignal(this.books$);

  selectedBook = this.books()?.find((b) => b.isbn === this.bookId);
}
