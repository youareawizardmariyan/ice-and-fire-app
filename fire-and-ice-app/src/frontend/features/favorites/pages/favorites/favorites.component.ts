import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addFavorite, removeFavorite, selectFavoriteBooks } from '../../store';
import { SingleBook } from '../../../books/store';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-favorites',
  imports: [MatCardModule],
  templateUrl: './favorites.html',
})
export class FavoriteComponent {
  private store = inject(Store);

  favorites = this.store.selectSignal(selectFavoriteBooks);

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
