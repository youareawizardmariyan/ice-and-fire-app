import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BooksBEResponse } from '../store';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);
  private readonly URL = `https://anapioficeandfire.com/api/books`;

  getBooks() {
    return this.http.get<BooksBEResponse>(this.URL);
  }
}
