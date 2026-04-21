import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SearchService {
  search = signal('');

  setSearch(value: string) {
    this.search.set(value);
  }
}
