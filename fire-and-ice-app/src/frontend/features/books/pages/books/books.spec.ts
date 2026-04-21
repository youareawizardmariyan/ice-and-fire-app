import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { BooksComponent } from './books.component';
import { getBooks, selectBooks, SingleBook } from '../../store';
import { addFavorite, removeFavorite, selectFavoriteBooks } from '../../../favorites/store';
import { SearchService } from '../../services/search/search.service';
import { signal } from '@angular/core';

const mockBook = (overrides: Partial<SingleBook> = {}): SingleBook => ({
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

const bookA = mockBook();
const bookB = mockBook({ name: 'A Clash of Kings', isbn: '978-0553108033', country: 'Canada' });

const setupComponent = async ({
  books = [] as SingleBook[],
  favorites = [] as SingleBook[],
  searchTerm = '',
} = {}) => {
  const mockSearchSignal = signal(searchTerm);

  await TestBed.configureTestingModule({
    imports: [BooksComponent],
    providers: [
      provideMockStore({
        selectors: [
          { selector: selectBooks, value: books },
          { selector: selectFavoriteBooks, value: favorites },
        ],
      }),
      provideRouter([]),
      {
        provide: SearchService,
        useValue: { search: mockSearchSignal },
      },
    ],
  }).compileComponents();

  const store = TestBed.inject(MockStore);
  vi.spyOn(store, 'dispatch');

  const fixture = TestBed.createComponent(BooksComponent);
  const component = fixture.componentInstance;
  fixture.detectChanges();

  return { fixture, component, store };
};

afterEach(() => TestBed.resetTestingModule());

describe('BooksComponent', () => {
  it('should create', async () => {
    const { component } = await setupComponent();
    expect(component).toBeTruthy();
  });

  it('should dispatch getBooks on init', async () => {
    const { store } = await setupComponent();
    expect(store.dispatch).toHaveBeenCalledWith(getBooks());
  });

  describe('loading state', () => {
    const spinnerSelector = '.spinner';

    it('should show the spinner when books is empty', async () => {
      const { fixture } = await setupComponent({ books: [] });
      const spinner = fixture.nativeElement.querySelector(spinnerSelector);
      expect(spinner).toBeTruthy();
    });

    it('should hide the spinner when books are loaded', async () => {
      const { fixture } = await setupComponent({ books: [bookA] });
      const spinner = fixture.nativeElement.querySelector(spinnerSelector);
      expect(spinner).toBeFalsy();
    });

    it('loading() should be true when books array is empty', async () => {
      const { component } = await setupComponent({ books: [] });
      expect(component.loading()).toBe(true);
    });

    it('loading() should be false when books are present', async () => {
      const { component } = await setupComponent({ books: [bookA] });
      expect(component.loading()).toBe(false);
    });
  });

  describe('empty search results state', () => {
    it('should show "No books found" when search yields no results', async () => {
      const { fixture } = await setupComponent({ books: [bookA], searchTerm: 'nomatch' });
      expect(fixture.nativeElement.textContent).toContain('No books found');
    });
  });

  describe('filteredBooks()', () => {
    it('should return all books when search term is empty', async () => {
      const { component } = await setupComponent({ books: [bookA, bookB], searchTerm: '' });
      expect(component.filteredBooks().length).toBe(2);
    });

    it('should filter books by name', async () => {
      const { component } = await setupComponent({ books: [bookA, bookB], searchTerm: 'thrones' });
      expect(component.filteredBooks()).toEqual([bookA]);
    });

    it('should filter books by author', async () => {
      const { component } = await setupComponent({ books: [bookA, bookB], searchTerm: 'george' });
      expect(component.filteredBooks().length).toBe(2);
    });

    it('should filter books by country', async () => {
      const { component } = await setupComponent({ books: [bookA, bookB], searchTerm: 'canada' });
      expect(component.filteredBooks()).toEqual([bookB]);
    });

    it('should be case-insensitive', async () => {
      const { component } = await setupComponent({ books: [bookA, bookB], searchTerm: 'THRONES' });
      expect(component.filteredBooks()).toEqual([bookA]);
    });

    it('should return an empty array when no books match', async () => {
      const { component } = await setupComponent({
        books: [bookA, bookB],
        searchTerm: 'zzznomatch',
      });
      expect(component.filteredBooks().length).toBe(0);
    });
  });

  describe('template rendering', () => {
    it('should render a card for each filtered book', async () => {
      const { fixture } = await setupComponent({ books: [bookA, bookB] });
      const cards = fixture.debugElement.queryAll(By.css('mat-card'));
      expect(cards.length).toBe(2);
    });

    it('should display the book name on the card', async () => {
      const { fixture } = await setupComponent({ books: [bookA] });
      expect(fixture.nativeElement.textContent).toContain(bookA.name);
    });

    it('should display the book author on the card', async () => {
      const { fixture } = await setupComponent({ books: [bookA] });
      expect(fixture.nativeElement.textContent).toContain(bookA.authors[0]);
    });

    it('should display the book country on the card', async () => {
      const { fixture } = await setupComponent({ books: [bookA] });
      expect(fixture.nativeElement.textContent).toContain(bookA.country);
    });

    it('should render a details link per book', async () => {
      const { fixture } = await setupComponent({ books: [bookA, bookB] });
      const links = fixture.debugElement.queryAll(By.css('a[mat-button]'));
      expect(links.length).toBe(2);
    });
  });

  describe('isFavorite()', () => {
    it('should return true when book is in favorites', async () => {
      const { component } = await setupComponent({ books: [bookA], favorites: [bookA] });
      expect(component.isFavorite(bookA)).toBe(true);
    });

    it('should return false when book is not in favorites', async () => {
      const { component } = await setupComponent({ books: [bookA], favorites: [] });
      expect(component.isFavorite(bookA)).toBe(false);
    });

    it('should show ❤️ for favorited books', async () => {
      const { fixture } = await setupComponent({ books: [bookA], favorites: [bookA] });
      const button: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
      expect(button.textContent?.trim()).toBe('❤️');
    });

    it('should show 🤍 for non-favorited books', async () => {
      const { fixture } = await setupComponent({ books: [bookA], favorites: [] });
      const button: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
      expect(button.textContent?.trim()).toBe('🤍');
    });
  });

  describe('toggleFavorite()', () => {
    it('should dispatch addFavorite when book is not in favorites', async () => {
      const { component, store } = await setupComponent({ books: [bookA], favorites: [] });
      component.toggleFavorite(bookA);
      expect(store.dispatch).toHaveBeenCalledWith(addFavorite({ book: bookA }));
    });

    it('should dispatch removeFavorite when book is already in favorites', async () => {
      const { component, store } = await setupComponent({ books: [bookA], favorites: [bookA] });
      component.toggleFavorite(bookA);
      expect(store.dispatch).toHaveBeenCalledWith(removeFavorite({ book: bookA }));
    });

    it('should dispatch addFavorite when the 🤍 button is clicked', async () => {
      const { fixture, store } = await setupComponent({ books: [bookA], favorites: [] });
      fixture.debugElement.query(By.css('button')).nativeElement.click();
      expect(store.dispatch).toHaveBeenCalledWith(addFavorite({ book: bookA }));
    });
  });
});
