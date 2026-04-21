import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { BooksService } from './books.service';
import { BooksBEResponse } from '../../store';

const mockBooksResponse: BooksBEResponse = [
  {
    url: 'https://anapioficeandfire.com/api/books/1',
    name: 'A Game of Thrones',
    isbn: '978-0553103540',
    authors: ['George R. R. Martin'],
    numberOfPages: 694,
    publisher: 'Bantam Books',
    country: 'United States',
    mediaType: 'Hardcover',
    released: '1996-08-01T00:00:00',
    characters: [
      'https://anapioficeandfire.com/api/characters/2',
      'https://anapioficeandfire.com/api/characters/3',
    ],
    povCharacters: ['https://anapioficeandfire.com/api/characters/148'],
  },
  {
    url: 'https://anapioficeandfire.com/api/books/2',
    name: 'A Clash of Kings',
    isbn: '978-0553108033',
    authors: ['George R. R. Martin'],
    numberOfPages: 768,
    publisher: 'Bantam Books',
    country: 'United States',
    mediaType: 'Hardcover',
    released: '1998-11-16T00:00:00',
    characters: [],
    povCharacters: [],
  },
];

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  const API_URL = 'https://anapioficeandfire.com/api/books';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooksService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBooks()', () => {
    it('should make a GET request to the correct URL', () => {
      service.getBooks().subscribe();

      const req = httpMock.expectOne(API_URL);
      expect(req.request.method).toBe('GET');
      req.flush(mockBooksResponse);
    });

    it('should return an observable of BooksBEResponse', () => {
      let result: BooksBEResponse | undefined;

      service.getBooks().subscribe((data) => {
        result = data;
      });

      const req = httpMock.expectOne(API_URL);
      req.flush(mockBooksResponse);

      expect(result).toEqual(mockBooksResponse);
    });

    it('should return the correct number of books', () => {
      let result: BooksBEResponse | undefined;

      service.getBooks().subscribe((data) => {
        result = data;
      });

      const req = httpMock.expectOne(API_URL);
      req.flush(mockBooksResponse);

      expect(result?.length).toBe(2);
    });
  });
});
