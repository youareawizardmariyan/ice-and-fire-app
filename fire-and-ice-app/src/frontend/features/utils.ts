import { SingleBook } from './books/store';

export const mockBook = (overrides: Partial<SingleBook> = {}): SingleBook => ({
  name: 'A Game of Thrones',
  isbn: '978-0553103540',
  authors: ['George R. R. Martin'],
  numberOfPages: 694,
  publisher: 'Bantam Books',
  mediaType: 'Hardcover',
  released: '1996-08-01T00:00:00',
  country: 'United States',
  url: 'https://anapioficeandfire.com/api/books/1',
  characters: [],
  povCharacters: [],
  ...overrides,
});
