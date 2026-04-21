import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BookDetailsComponent } from './book-details.component';
import { selectBooks } from '../../store';
import { SingleBook } from '../../store';

const mockBook: SingleBook = {
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
};

const anotherMockBook: SingleBook = {
  ...mockBook,
  name: 'A Clash of Kings',
  isbn: '978-0553108033',
};

const setupComponent = async (
  isbn: string | null,
  books: SingleBook[] = [mockBook, anotherMockBook],
) => {
  await TestBed.configureTestingModule({
    imports: [BookDetailsComponent],
    providers: [
      provideMockStore({
        selectors: [{ selector: selectBooks, value: books }],
      }),
      provideRouter([]),
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: { paramMap: { get: (_key: string) => isbn } },
        },
      },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(BookDetailsComponent);
  const component = fixture.componentInstance;

  vi.spyOn(TestBed.inject(MockStore), 'dispatch');
  fixture.detectChanges();

  return { fixture, component };
};

afterEach(() => TestBed.resetTestingModule());

describe('BookDetailsComponent', () => {
  it('should create', async () => {
    const { component } = await setupComponent(mockBook.isbn);
    expect(component).toBeTruthy();
  });

  describe('selectedBook', () => {
    it('should select the correct book based on the route param', async () => {
      const { component } = await setupComponent(mockBook.isbn);
      expect(component.selectedBook?.isbn).toBe(mockBook.isbn);
    });

    it('should select the second book when its isbn is in the route', async () => {
      const { component } = await setupComponent(anotherMockBook.isbn);
      expect(component.selectedBook?.isbn).toBe(anotherMockBook.isbn);
    });

    it('should be undefined when no book matches the route param', async () => {
      const { component } = await setupComponent('non-existent-isbn');
      expect(component.selectedBook).toBeUndefined();
    });

    it('should be undefined when the route param is null', async () => {
      const { component } = await setupComponent(null);
      expect(component.selectedBook).toBeUndefined();
    });
  });

  describe('template', () => {
    it('should render the book name', async () => {
      const { fixture } = await setupComponent(mockBook.isbn);
      const bookNameSelector = '.book-name';

      const h1: HTMLElement = fixture.nativeElement.querySelector(bookNameSelector);
      expect(h1.textContent).toContain(mockBook.name);
    });

    it('should render a go back link pointing to /books', async () => {
      const { fixture } = await setupComponent(mockBook.isbn);
      const linkSelector = '.go-back-link';

      const link = fixture.nativeElement.querySelector(linkSelector);

      expect(link).toBeTruthy();
      expect(link.textContent).toContain('← Go Back');
    });
  });
});
